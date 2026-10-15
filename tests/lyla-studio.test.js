// Headless test for assets/lyla-studio.js interaction logic (no WebGL needed).
const fs = require("fs");
const vm = require("vm");
const path = require("path");

const src = fs.readFileSync(path.join(__dirname, "..", "assets", "lyla-studio.js"), "utf8");

function makeElement() {
  return {
    hidden: true,
    className: "",
    innerHTML: "",
    children: [],
    appendChild(c) { this.children.push(c); return c; },
    querySelector() { return null; },
    addEventListener() {},
    clickCount: 0,
    click() { this.clickCount += 1; },
    textContent: "",
  };
}

function loadSandbox(overrides = {}) {
  const listeners = {};
  const elements = [];
  const doc = {
    documentElement: { classList: { contains: () => false } },
    body: { appendChild(el) { elements.push(el); return el; } },
    createElement() { const el = makeElement(); elements.push(el); return el; },
    querySelector: () => null,
    querySelectorAll: () => [],
    ...overrides.doc,
  };
  const win = {
    addEventListener: (t, fn) => { (listeners[t] = listeners[t] || []).push(fn); },
    __snugWorld: { mode: "village", player: { position: { x: -8.0, z: -30.0 } } },
    ...overrides.win,
  };
  const sandbox = {
    window: win, document: doc, setInterval: () => 0, setTimeout: (fn) => { fn(); return 0; },
    console,
  };
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "lyla-studio.js" });
  return { win, doc, listeners, elements };
}

let pass = 0, fail = 0;
const ok = (name, cond) => { if (cond) { pass++; console.log("  ok:", name); } else { fail++; console.log("  FAIL:", name); } };

// 1. guard + hooks
{
  const { win } = loadSandbox();
  ok("exposes __lylaStudio hooks", !!win.__lylaStudio && typeof win.__lylaStudio.openReshoot === "function");
}

// 2. shouldShow: in range, village mode
{
  const { win } = loadSandbox();
  ok("shows prompt at studio center", win.__lylaStudio.shouldShow({ x: -8.0, z: -30.0 }) === true);
  ok("hides prompt far away", win.__lylaStudio.shouldShow({ x: 0, z: 0 }) === false);
  ok("hides prompt with no player", win.__lylaStudio.shouldShow(null) === false);
}

// 3. shouldShow: not in village mode
{
  const { win } = loadSandbox({ win: { __snugWorld: { mode: "home", player: { position: { x: -8.0, z: -30.0 } } } } });
  ok("hides prompt outside village", win.__lylaStudio.shouldShow({ x: -8.0, z: -30.0 }) === false);
}

// 4. shouldShow: overlay open (NPC card visible)
{
  const { win } = loadSandbox({
    doc: { querySelector: (sel) => (sel === ".city-npc-nearby:not([hidden])" ? {} : null) },
  });
  ok("hides prompt when NPC card visible", win.__lylaStudio.shouldShow({ x: -8.0, z: -30.0 }) === false);
}

// 5. shouldShow: dialogue open
{
  const { win } = loadSandbox({ doc: { querySelector: (sel) => (sel === ".city-npc-dialogue" ? {} : null) } });
  ok("hides prompt during dialogue", win.__lylaStudio.shouldShow({ x: -8.0, z: -30.0 }) === false);
}

// 6. openReshoot: clicks profile chip, then the Portrait appointment button
{
  const chip = makeElement();
  const portraitBtn = makeElement();
  portraitBtn.textContent = "Portrait appointment 3/9";
  const otherBtn = makeElement();
  otherBtn.textContent = "Hats";
  const { win } = loadSandbox({
    doc: {
      querySelector: (sel) => (sel === ".profile-chip" ? chip : null),
      querySelectorAll: (sel) => (sel === "button" ? [otherBtn, portraitBtn] : []),
    },
  });
  const started = win.__lylaStudio.openReshoot();
  ok("openReshoot starts when chip exists", started === true);
  ok("profile chip clicked", chip.clickCount === 1);
  ok("Portrait appointment button clicked", portraitBtn.clickCount === 1);
  ok("other buttons untouched", otherBtn.clickCount === 0);
}

// 7. openReshoot: no chip -> false, no crash
{
  const { win } = loadSandbox();
  ok("openReshoot returns false without chip", win.__lylaStudio.openReshoot() === false);
}

// 8. matches the bundle's NPC-route button regex behavior
{
  const re = /portrait|expression photos/i;
  ok("regex matches bundle button text", re.test("Portrait appointment 3/9"));
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
