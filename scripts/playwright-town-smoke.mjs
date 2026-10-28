import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright";

const baseUrl = process.env.AUDIT_URL || "http://localhost:8080";
const outputDir = process.env.AUDIT_OUTPUT_DIR || os.tmpdir();
const macChrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const browser = await chromium.launch({
  headless: true,
  ...(fs.existsSync(macChrome) ? { executablePath: macChrome } : {}),
});
const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, liveTown: true },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, liveTown: false },
];

try {
  for (const profile of profiles) {
    const context = await browser.newContext({ ...profile, reducedMotion: "reduce" });
    const page = await context.newPage();
    const pageErrors = [];
    const consoleProblems = [];
    const badResponses = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    page.on("console", (message) => {
      if (!["warning", "error"].includes(message.type())) return;
      if (/glCopySubTextureCHROMIUM/.test(message.text())) return;
      consoleProblems.push(`${message.type()}: ${message.text()}`);
    });
    page.on("response", (response) => {
      if (response.status() >= 400) badResponses.push(`${response.status()} ${new URL(response.url()).pathname}`);
    });

    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.locator(".snug-start-screen").waitFor({ state: "visible", timeout: 15_000 });
    const townButton = page.getByRole("button", { name: "Enter Cyclical City" });
    await townButton.waitFor({ state: "visible", timeout: 15_000 });
    assert.equal(await townButton.isEnabled(), true, "town entry was not ready");
    assert.equal(await page.evaluate(() => typeof window.__snugEnsureCoreReady), "function");

    await townButton.click();
    await page.getByRole("button", { name: "Confirm" }).click();
    await page.locator(".snug-start-screen").waitFor({ state: "detached", timeout: 12_000 });
    assert.equal(await page.evaluate(() => typeof window.render_game_to_text), "function");
    await page.locator(".welcome-cinematic").waitFor({ state: "visible", timeout: 6_000 });
    if (!profile.liveTown) {
      const bounds = await page.locator(".welcome-cinematic").boundingBox();
      assert.ok(bounds && bounds.width <= profile.viewport.width && bounds.height <= profile.viewport.height, "mobile welcome overflowed the viewport");
      assert.ok(await page.locator(".welcome-help").isVisible(), "mobile welcome help was not reachable");
      assert.deepEqual(pageErrors, []);
      assert.deepEqual(consoleProblems, []);
      assert.deepEqual(badResponses, []);
      await page.screenshot({ path: path.join(outputDir, `selsocsoc-town-${profile.name}.png`) });
      console.log("mobile: menu and responsive welcome passed");
      await context.close();
      continue;
    }
    await page.locator(".welcome-help").click();
    await page.locator(".snug-help-skip").waitFor({ state: "visible", timeout: 5_000 });

    // Invoke the same staged cleanup used by the visible Skip control without
    // making Playwright wait for the first GPU town frame inside click().
    await page.evaluate(() => window.__snugFinishWelcome?.());
    await page.locator(".welcome-cinematic").waitFor({ state: "detached", timeout: 5_000 });
    await page.waitForFunction(() => window.__snugRendererStartupMetrics?.townPrepareMs !== null, null, { timeout: 15_000 });

    const before = JSON.parse(await page.evaluate(() => window.render_game_to_text()));
    let after = before;
    for (const key of ["ArrowRight", "d", "ArrowUp"]) {
      await page.keyboard.down(key);
      await page.waitForTimeout(650);
      await page.keyboard.up(key);
      await page.waitForTimeout(200);
      after = JSON.parse(await page.evaluate(() => window.render_game_to_text()));
      if (after.player && before.player && (after.player.x !== before.player.x || after.player.z !== before.player.z)) break;
    }

    assert.equal(after.mode, "village");
    assert.equal(after.welcomeActive, false);
    assert.ok(after.renderer.renderedFrames > before.renderer.renderedFrames, "town renderer did not advance");
    assert.ok(before.player && after.player, "player state was unavailable");
    assert.notDeepEqual({ x: after.player.x, z: after.player.z }, { x: before.player.x, z: before.player.z }, "player did not move");
    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleProblems, []);
    assert.deepEqual(badResponses, []);

    await page.screenshot({ path: path.join(outputDir, `selsocsoc-town-${profile.name}.png`) });
    console.log(`${profile.name}: menu, welcome, renderer, and movement passed`);
    await context.close();
  }
} finally {
  await browser.close();
}
