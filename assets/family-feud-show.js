(() => {
  if (window.__snugFeudShow) return;
  const audio = () => window.__snugGameShowAudio;

  /* ================= Show data ================= */

  // Starter survey pack — Cyclical City canon only. Points per question sum to 100
  // (100 neighbors surveyed). Exposed as window.__snugFeudSurveys for a future editor.
  const SURVEYS = [
    { q: "What's the first thing you do at the Starlight Jamboree?", answers: [
      { t: "Dance", p: 32, aka: ["dancing", "dances"] },
      { t: "Grab snacks", p: 24, aka: ["snacks", "eat", "food", "eat snacks"] },
      { t: "Meet friends", p: 18, aka: ["friends", "see friends", "hang out"] },
      { t: "Watch the fireworks", p: 14, aka: ["fireworks", "firework show"] },
      { t: "Take photos", p: 8, aka: ["photos", "pictures", "selfies", "photography"] },
      { t: "Buy souvenirs", p: 4, aka: ["souvenirs", "souvenir", "shopping"] },
    ]},
    { q: "Name something you'd find in Barnaby Bargain's shop", answers: [
      { t: "Dice", p: 28, aka: ["die", "dice sets"] },
      { t: "Furniture", p: 22, aka: ["chairs", "tables", "couch", "sofa"] },
      { t: "Hats", p: 18, aka: ["hat", "headwear", "caps"] },
      { t: "Snacks", p: 14, aka: ["snack", "treats", "food"] },
      { t: "Tools", p: 10, aka: ["tool", "gadgets"] },
      { t: "Mystery boxes", p: 8, aka: ["mystery box", "blind boxes", "loot boxes"] },
    ]},
    { q: "Where would you take a first-time visitor in Cyclical City?", answers: [
      { t: "Moonlight Footbridge", p: 30, aka: ["footbridge", "the bridge", "bridge"] },
      { t: "Town Hall", p: 22, aka: ["the hall", "city hall", "mayor's office"] },
      { t: "The pond", p: 18, aka: ["pond", "fishing pond", "the lake"] },
      { t: "Strolling Stretch", p: 14, aka: ["the stretch", "strolling"] },
      { t: "Starlight stage", p: 10, aka: ["stage", "jamboree stage", "the stage"] },
      { t: "Fern's garden", p: 6, aka: ["garden", "community garden", "the garden"] },
    ]},
    { q: "What is Mayor Mayor most famous for?", answers: [
      { t: "Tipping his hat", p: 34, aka: ["hat tip", "tipping hat"] },
      { t: "His guitar-playing past", p: 24, aka: ["guitar", "music career", "touring", "singing"] },
      { t: "The landslide victory", p: 20, aka: ["landslide", "election", "winning"] },
      { t: "His hopping hello", p: 12, aka: ["hop", "hopping", "jumping", "hop hello"] },
      { t: "Long speeches", p: 6, aka: ["speeches", "talking", "speech"] },
      { t: "His dad Gideon", p: 4, aka: ["gideon", "father", "his dad"] },
    ]},
    { q: "Finish Gideon's signature line: \"He's ___ now!\"", answers: [
      { t: "Mr. Mayor Mayor", p: 46, aka: ["mister mayor mayor"] },
      { t: "The mayor", p: 22, aka: ["mayor"] },
      { t: "In charge", p: 14, aka: ["boss", "the boss", "running things"] },
      { t: "All grown up", p: 10, aka: ["grown up", "grown"] },
      { t: "Famous", p: 8, aka: ["a star", "a celebrity"] },
    ]},
    { q: "What's the best thing about the Strolling Stretch?", answers: [
      { t: "Window shopping", p: 28, aka: ["shopping", "shops", "stores"] },
      { t: "Street snacks", p: 24, aka: ["snacks", "food carts", "street food"] },
      { t: "People watching", p: 18, aka: ["people", "watching people"] },
      { t: "Quiet benches", p: 14, aka: ["benches", "bench", "sitting"] },
      { t: "Buskers", p: 10, aka: ["music", "performers", "street music"] },
      { t: "Flower boxes", p: 6, aka: ["flowers", "flower box"] },
    ]},
    { q: "Name a game the town can't stop playing", answers: [
      { t: "Market Basket Mayhem", p: 30, aka: ["market basket", "baskets", "market mayhem"] },
      { t: "Lantern Dash", p: 24, aka: ["lantern", "dash"] },
      { t: "Go Fish", p: 18, aka: ["fish card game"] },
      { t: "Snug Board", p: 14, aka: ["board game", "the board", "snugboard"] },
      { t: "Whirl of Resources", p: 10, aka: ["whirl", "wheel"] },
      { t: "Nosy Neighbors", p: 4, aka: ["nosy", "neighbors"] },
    ]},
    { q: "What would you plant in Fern Bramble's community garden?", answers: [
      { t: "Tomatoes", p: 32, aka: ["tomato"] },
      { t: "Sunflowers", p: 22, aka: ["sunflower"] },
      { t: "Pumpkins", p: 18, aka: ["pumpkin"] },
      { t: "Carrots", p: 12, aka: ["carrot"] },
      { t: "Moonflowers", p: 10, aka: ["moonflower"] },
      { t: "Mystery seeds", p: 6, aka: ["mystery seed", "surprises", "surprise seeds"] },
    ]},
    { q: "Name something you'd mail from the post office", answers: [
      { t: "Letters", p: 36, aka: ["letter", "mail"] },
      { t: "Gift boxes", p: 24, aka: ["gifts", "gift", "presents", "present"] },
      { t: "Postcards", p: 16, aka: ["postcard", "cards", "card"] },
      { t: "Seed packets", p: 12, aka: ["seeds", "seed packet"] },
      { t: "Paintings", p: 8, aka: ["painting", "art", "artwork"] },
      { t: "Cookies", p: 4, aka: ["cookie"] },
    ]},
    { q: "How would you describe Chip Chance's hosting style?", answers: [
      { t: "Cheesy puns", p: 38, aka: ["puns", "pun", "jokes", "cheesy"] },
      { t: "Big radio voice", p: 26, aka: ["radio voice", "announcer voice", "radio"] },
      { t: "Hype shouts", p: 18, aka: ["shouting", "hype", "yelling"] },
      { t: "Drumrolls", p: 10, aka: ["drumroll", "drums"] },
      { t: "Mic drops", p: 8, aka: ["mic drop", "dropping the mic"] },
    ]},
    { q: "Name the perfect picnic spot", answers: [
      { t: "By the pond", p: 34, aka: ["pond", "the pond"] },
      { t: "Moonlight Footbridge", p: 22, aka: ["footbridge", "bridge", "the bridge"] },
      { t: "Flower hill", p: 18, aka: ["hill", "flowers", "the hill"] },
      { t: "Town square", p: 14, aka: ["square", "plaza"] },
      { t: "Garden rows", p: 8, aka: ["garden", "the garden"] },
      { t: "A rooftop", p: 4, aka: ["roof", "rooftop"] },
    ]},
    { q: "What spooks players in Lantern Dash?", answers: [
      { t: "The dark", p: 30, aka: ["darkness", "dark"] },
      { t: "Bats", p: 24, aka: ["bat"] },
      { t: "Ghosts", p: 20, aka: ["ghost"] },
      { t: "Losing your light", p: 14, aka: ["lantern dying", "light going out"] },
      { t: "Dead ends", p: 8, aka: ["maze", "walls", "dead end"] },
      { t: "Spiders", p: 4, aka: ["spider"] },
    ]},
    { q: "Name something Agnes Alley's cats love", answers: [
      { t: "Naps", p: 36, aka: ["nap", "sleeping", "sleep"] },
      { t: "Yarn", p: 22, aka: ["string", "yarn balls"] },
      { t: "Treats", p: 18, aka: ["treat", "snacks"] },
      { t: "Head pats", p: 12, aka: ["pats", "petting", "pets"] },
      { t: "Boxes", p: 8, aka: ["box", "cardboard"] },
      { t: "Chasing moths", p: 4, aka: ["moths", "moth", "bugs"] },
    ]},
    { q: "What would you buy with 500 shells?", answers: [
      { t: "A new hat", p: 30, aka: ["hat", "hats", "headwear"] },
      { t: "Furniture", p: 24, aka: ["chair", "couch", "table", "sofa"] },
      { t: "A pet accessory", p: 18, aka: ["pet", "cat toy", "pet toy"] },
      { t: "Paint supplies", p: 12, aka: ["paint", "brushes", "canvas"] },
      { t: "Dice skins", p: 10, aka: ["dice", "skins", "die skins"] },
      { t: "Save it all", p: 6, aka: ["save", "nothing", "bank it", "savings"] },
    ]},
    { q: "Name a festival Pip Parade organizes", answers: [
      { t: "Starlight Jamboree", p: 40, aka: ["jamboree", "starlight"] },
      { t: "Fireworks Night", p: 24, aka: ["fireworks", "firework show"] },
      { t: "Costume Parade", p: 20, aka: ["costume", "parade", "costumes"] },
      { t: "Meteor Shower", p: 16, aka: ["meteors", "meteor watch", "shower"] },
    ]},
    { q: "What's the trickiest part of the Painting Studio?", answers: [
      { t: "Mixing colors", p: 30, aka: ["colors", "color mixing", "mixing"] },
      { t: "Steady lines", p: 24, aka: ["lines", "shaky hands", "line work"] },
      { t: "Drying time", p: 18, aka: ["drying", "waiting", "dry time"] },
      { t: "Choosing a subject", p: 12, aka: ["subject", "what to paint"] },
      { t: "Undo regret", p: 10, aka: ["mistakes", "undo", "regret"] },
      { t: "Canvas size", p: 6, aka: ["canvas", "too small", "too big"] },
    ]},
    { q: "Name something you'd find in a neighbor's mailbox", answers: [
      { t: "Letters", p: 36, aka: ["letter"] },
      { t: "Gift boxes", p: 24, aka: ["gifts", "gift", "presents"] },
      { t: "Seed packets", p: 16, aka: ["seeds", "seed packet"] },
      { t: "Shells", p: 12, aka: ["coins", "money", "coin"] },
      { t: "Party invites", p: 8, aka: ["invitations", "invites", "invite"] },
      { t: "A mysterious key", p: 4, aka: ["key", "keys", "mysterious keys"] },
    ]},
    { q: "What makes the Moonlight Footbridge special at night?", answers: [
      { t: "Glowing lanterns", p: 38, aka: ["lanterns", "lights", "lantern light"] },
      { t: "Fireflies", p: 22, aka: ["firefly", "lightning bugs"] },
      { t: "Moon reflections", p: 18, aka: ["reflection", "moonlight", "reflections"] },
      { t: "Quiet water", p: 12, aka: ["water", "ripples", "the water"] },
      { t: "Star views", p: 10, aka: ["stars", "sky", "stargazing"] },
    ]},
    { q: "What's Bobby Gill's best fishing advice?", answers: [
      { t: "Patience, friend", p: 36, aka: ["patience", "be patient"] },
      { t: "Dawn bites best", p: 24, aka: ["dawn", "morning", "early", "sunrise"] },
      { t: "Shiny lures", p: 16, aka: ["lures", "lure", "shiny"] },
      { t: "Quiet feet", p: 12, aka: ["quiet", "sneak", "be quiet"] },
      { t: "A lucky hat", p: 8, aka: ["lucky hat", "hat"] },
      { t: "Talk to the fish", p: 4, aka: ["talking", "sing", "singing"] },
    ]},
    { q: "What does Dottie Daly always remind you to do?", answers: [
      { t: "Daily quests", p: 40, aka: ["quests", "quest", "dailies"] },
      { t: "Log your streak", p: 24, aka: ["streak", "login", "log in"] },
      { t: "Visit friends", p: 16, aka: ["friends", "visiting"] },
      { t: "Feed the cat", p: 12, aka: ["cats", "feed cats", "cat"] },
      { t: "Water the plants", p: 8, aka: ["plants", "watering", "water"] },
    ]},
    { q: "Name something you'd land on in Snug Board", answers: [
      { t: "Coin space", p: 32, aka: ["coins", "money space", "coin"] },
      { t: "Star space", p: 26, aka: ["star", "stars"] },
      { t: "Shop", p: 18, aka: ["store", "barnaby", "shop space"] },
      { t: "Trap", p: 12, aka: ["traps", "trap space"] },
      { t: "Event space", p: 8, aka: ["event", "events"] },
      { t: "Minigame space", p: 4, aka: ["minigame", "game space"] },
    ]},
    { q: "What's the coziest room in a Cyclical City home?", answers: [
      { t: "Living room", p: 36, aka: ["lounge", "sitting room", "living"] },
      { t: "Kitchen", p: 24, aka: ["cooking room", "cook room"] },
      { t: "Bedroom", p: 18, aka: ["bed room", "bedchamber"] },
      { t: "Reading nook", p: 12, aka: ["nook", "library", "reading corner"] },
      { t: "The porch", p: 6, aka: ["porch", "veranda", "deck"] },
      { t: "Bathroom", p: 4, aka: ["bath", "tub", "washroom"] },
    ]},
    { q: "Name a classic Cyclical City weather mood", answers: [
      { t: "Sunny", p: 38, aka: ["sunshine", "clear", "sun"] },
      { t: "Gentle rain", p: 24, aka: ["rain", "drizzle", "raining"] },
      { t: "Snowy", p: 16, aka: ["snow", "snowing"] },
      { t: "Breezy", p: 12, aka: ["breeze", "windy", "wind"] },
      { t: "Foggy", p: 6, aka: ["fog", "mist", "misty"] },
      { t: "Stormy", p: 4, aka: ["storm", "thunder", "thunderstorm"] },
    ]},
    { q: "What would Lyla Lens photograph first?", answers: [
      { t: "Your smile", p: 34, aka: ["smile", "smiles", "smiling"] },
      { t: "The town gate", p: 22, aka: ["gate", "town gates"] },
      { t: "A festival", p: 18, aka: ["festivals", "jamboree"] },
      { t: "Pets", p: 14, aka: ["cats", "animals", "pet"] },
      { t: "Sunsets", p: 8, aka: ["sunset"] },
      { t: "Funny faces", p: 4, aka: ["silly faces", "funny face"] },
    ]},
    { q: "Name something Peggy Plank is building", answers: [
      { t: "Moonlight Footbridge", p: 48, aka: ["footbridge", "bridge", "the bridge"] },
      { t: "Benches", p: 20, aka: ["bench"] },
      { t: "Signposts", p: 14, aka: ["signs", "signpost", "sign"] },
      { t: "Fences", p: 10, aka: ["fence"] },
      { t: "A stage", p: 8, aka: ["stage"] },
    ]},
    { q: "What's inside Mr. Buck Coinsworth's bank vault?", answers: [
      { t: "Shells", p: 40, aka: ["coins", "money", "coin"] },
      { t: "Dice", p: 22, aka: ["die", "dice sets"] },
      { t: "Star deeds", p: 16, aka: ["deeds", "stars", "deed"] },
      { t: "Ledgers", p: 12, aka: ["books", "records", "ledger"] },
      { t: "Spare keys", p: 6, aka: ["keys", "key"] },
      { t: "Secrets", p: 4, aka: ["gossip", "secret"] },
    ]},
  ];

  const QUESTIONS_PER_SHOW = 3;
  const DOUBLE_ROUND_INDEX = 2; // third question pays double
  const FACEOFF_BUZZ_MS = 15000;
  const ANSWER_MS = 12000;
  const WIN_SHELLS = 200;
  const LOSE_SHELLS = 25;
  const PRIZE_ITEM = "keepsake-mayor-button";
  const PRIZE_NAME = "Mayor's Brass Button";
  const SHOW_TITLE = "Survey Showdown";

  // Difficulty-aware bot, mirroring the Snug Board easy/normal/hard convention.
  const DIFFICULTY = {
    easy:   { label: "Easy",   botBuzz: [8000, 12000], faceoffTop: [0.30, 0.30, 0.25], know: 0.55, strike: 0.34, steal: 0.28, think: [1500, 2600] },
    normal: { label: "Normal", botBuzz: [4500, 8000],  faceoffTop: [0.50, 0.30, 0.15], know: 0.75, strike: 0.20, steal: 0.45, think: [1000, 1900] },
    hard:   { label: "Hard",   botBuzz: [2200, 5200],  faceoffTop: [0.68, 0.24, 0.08],  know: 0.90, strike: 0.08, steal: 0.65, think: [700, 1300] },
  };

  const CHIP_INTRO = "Welcome to Survey Showdown! We asked one hundred of your neighbors, and the top answers are on the board. Buzz in fast, guess smart \u2014 let's play!";
  const TILLY_INTRO = "I'm Tilly Turner, Keeper of the Answers. Every response is locked in, double-checked, and sealed. Good luck, neighbor!";
  const CHIP_LINES = {
    faceoff: () => pick(["Top answers on the board \u2014 hands on your buzzers!", "Buzz in, neighbors! Fastest fingers control the board!"]),
    good: (points, top) => top
      ? pick([`Number one answer! ${points} points \u2014 the crowd goes wild!`, `Survey says... NUMBER ONE! ${points} big ones!`])
      : pick([`Survey says... yes! ${points} points on the board!`, `It's up there! ${points} points for you!`, `Good answer! ${points} points!`]),
    strike: (n) => pick([`Strike ${n}! Ooh, the board shows no mercy.`, `Not on the board \u2014 that's strike ${n}, friend!`, `Strike ${n}! The crowd groans as one.`]),
    stealPrompt: () => pick(["Steal time! One answer takes the whole bank!", "Three strikes! One steal attempt for all the marbles!"]),
    stealWin: (bank) => pick([`THE STEAL! ${bank} points change hands!`, `Stolen! ${bank} points walk out the door!`]),
    stealMiss: () => pick(["No steal! The bank stays put!", "The steal falls flat \u2014 bank holds!"]),
    win: () => pick(["And the winner is... YOU! Somebody cue the confetti cannon!", "YOU take the show! Take a bow, champion of the survey!"]),
    lose: () => pick(["The rival takes it! You'll get 'em next time, neighbor.", "So close! The survey crown slips away... this time."]),
    double: () => "It's the DOUBLE round \u2014 every answer is worth twice the points!",
  };
  const TILLY_LINES = {
    faceoffWin: () => "Control decided \u2014 the board is yours to run!",
    boardClear: () => "A clean sweep! Every answer found!",
  };

  /* ================= Helpers ================= */

  const esc = (value) => { const node = document.createElement("span"); node.textContent = String(value ?? ""); return node.innerHTML; };
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  const shuffleArr = (values) => {
    const copy = [...values];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };
  const range = (min, max) => min + Math.random() * (max - min);

  // Answer matching: normalize, then match the answer text or any alias.
  // Also tolerates a trailing plural "s" either way.
  const norm = (value) => String(value || "").toUpperCase().replace(/[^A-Z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
  const singular = (value) => value.endsWith("S") && value.length > 3 ? value.slice(0, -1) : value;
  function findAnswer(survey, raw) {
    const n = norm(raw);
    if (!n) return -1;
    const forms = [n, singular(n)];
    for (let i = 0; i < survey.answers.length; i++) {
      const answer = survey.answers[i];
      const accepted = [answer.t, ...(answer.aka || [])].map(norm).flatMap((f) => [f, singular(f)]);
      if (accepted.some((f) => forms.includes(f))) return i;
    }
    return -1;
  }

  /* ================= Pure round logic (unit-testable) ================= */

  function createRound(survey, multiplier) {
    return { survey, multiplier: multiplier || 1, revealed: survey.answers.map(() => false), bank: 0, strikes: 0 };
  }
  // Returns { hit, rank, points, complete } — mutates round on hit.
  function guessAnswer(round, raw) {
    const rank = findAnswer(round.survey, raw);
    if (rank < 0 || round.revealed[rank]) return { hit: false, rank: -1, points: 0, complete: false };
    round.revealed[rank] = true;
    const points = round.survey.answers[rank].p * round.multiplier;
    round.bank += points;
    return { hit: true, rank, points, complete: round.revealed.every(Boolean) };
  }
  // Bot picks an unrevealed answer index, or -1 to strike. Higher difficulty
  // knows top answers more often; `forSteal` biases to the single best pick.
  function botPickAnswer(survey, revealed, difficultyKey, forSteal) {
    const d = DIFFICULTY[difficultyKey] || DIFFICULTY.normal;
    const open = survey.answers.map((a, i) => i).filter((i) => !revealed[i]);
    if (!open.length) return -1;
    const knows = Math.random() < (forSteal ? Math.max(d.steal, d.know) : d.know);
    if (!knows) return -1;
    // Weighted toward top-ranked answers.
    const weights = open.map((i) => Math.pow(survey.answers.length - i, 2));
    if (forSteal) {
      // Steal: take the single best open answer most of the time.
      return Math.random() < 0.8 ? open[0] : weightedPick(open, weights);
    }
    return weightedPick(open, weights);
  }
  function weightedPick(items, weights) {
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      roll -= weights[i];
      if (roll <= 0) return items[i];
    }
    return items[items.length - 1];
  }
  // Face-off: lower rank wins; ties go to the player (crowd favorite).
  // A side that gave no valid answer (-1) always loses to a valid one.
  function faceoffWinner(playerRank, rivalRank) {
    if (playerRank >= 0 && rivalRank < 0) return "player";
    if (rivalRank >= 0 && playerRank < 0) return "rival";
    if (playerRank < 0) return "rival";
    return playerRank <= rivalRank ? "player" : "rival";
  }

  /* ================= Voices ================= */

  // Same per-character conventions as the other shows (Chip's rate/pitch match
  // his roster entry; English voice preferred).
  const VOICES = { chip: { rate: 1.28, pitch: 1.1 }, tilly: { rate: 1.06, pitch: 1.24 } };
  let englishVoice = null;
  function ensureVoices() {
    try {
      const voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      englishVoice = voices[0] || null;
    } catch (e) { englishVoice = null; }
  }
  function setSpeaking(host, on) {
    state.root?.querySelectorAll(`[data-host="${host}"]`).forEach((el) => el.classList.toggle("speaking", Boolean(on)));
  }
  function speak(host, text) {
    setSpeaking(host, true);
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") { setSpeaking(host, false); return; }
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = VOICES[host].rate;
      utterance.pitch = VOICES[host].pitch;
      utterance.volume = 0.95;
      if (englishVoice) utterance.voice = englishVoice;
      let done = false;
      const finish = () => { if (!done) { done = true; setSpeaking(host, false); } };
      utterance.onend = finish;
      utterance.onerror = finish;
      setTimeout(() => { try { speechSynthesis.speak(utterance); } catch (e) { finish(); } }, 60);
      setTimeout(finish, Math.max(4000, text.length * 110));
    } catch (e) { setSpeaking(host, false); }
  }

  /* ================= Economy ================= */

  // Same established patterns as the other live systems.
  function awardShells(amount, message) {
    if (!(amount > 0)) return;
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message } }));
  }
  function awardInventoryItem(itemId) {
    window.dispatchEvent(new CustomEvent("snug-player-patch", {
      detail: (player) => ({
        ...player,
        owned: [...new Set([...(player.owned || []), itemId])],
        inventory: [...new Set([...(player.inventory || player.owned || []), itemId])],
      }),
    }));
  }

  /* ================= Survey editor ================= */
  // In-show survey-pack editor, mirroring the Nosy Neighbors show editor:
  // session-only edits, JSON download/import, restore-starter. The showdown
  // plays from state.surveys, so edits take effect immediately in this session.

  let feudEditorSeq = 0;
  function starterSurveys() {
    return SURVEYS.map((s) => ({
      id: `survey-${++feudEditorSeq}`,
      q: s.q,
      answers: s.answers.map((a) => ({ t: a.t, p: a.p, aka: [...(a.aka || [])] })),
    }));
  }
  function blankSurvey() {
    return {
      id: `survey-new-${++feudEditorSeq}-${Date.now()}`,
      q: "",
      answers: [{ t: "", p: "", aka: [] }, { t: "", p: "", aka: [] }, { t: "", p: "", aka: [] }],
    };
  }
  function findSurvey(id) { return state.surveys.find((s) => s.id === id) || null; }
  // The form edits a draft until it validates; valid saves commit to state.surveys.
  function editingSurveySource() {
    if (state.surveyDraft && state.surveyDraft.id === state.editingSurvey) return state.surveyDraft;
    return findSurvey(state.editingSurvey) || blankSurvey();
  }
  // Duplicate detection uses the game's own matching: norm + singular.
  function surveyProblems(survey) {
    const problems = [];
    if (!String(survey.q || "").trim()) problems.push("Give the question some text.");
    const answers = (survey.answers || []).filter((a) => String(a.t || "").trim());
    if (answers.length < 3) problems.push("Add at least 3 answers.");
    const seen = new Map();
    answers.forEach((a) => {
      const label = String(a.t).trim();
      const forms = [a.t, ...(a.aka || [])].map(norm).filter(Boolean).flatMap((f) => [f, singular(f)]);
      forms.forEach((f) => {
        if (seen.has(f)) problems.push(`"${label}" collides with "${seen.get(f)}" — the game matches answers case- and plural-insensitively.`);
        else seen.set(f, label);
      });
    });
    let total = 0; let badPoints = false;
    answers.forEach((a) => {
      const p = Number(a.p);
      if (!Number.isInteger(p) || p < 1) badPoints = true; else total += p;
    });
    if (badPoints) problems.push("Every answer needs a whole-number point value of 1 or more.");
    else if (answers.length >= 3 && total !== 100) problems.push(`Points add up to ${total} — they must total exactly 100.`);
    return problems;
  }
  function harvestSurveyForm() {
    const form = state.root?.querySelector("[data-feud-ed-form]");
    if (!form) return null;
    const data = new FormData(form);
    const answers = [];
    for (let i = 0; i < 12; i++) {
      if (data.get(`at${i}`) === null) break;
      answers.push({
        t: String(data.get(`at${i}`) || "").trim().slice(0, 80),
        p: String(data.get(`ap${i}`) || "").trim(),
        aka: String(data.get(`aa${i}`) || "").split(/[,\n]/).map((v) => v.trim().slice(0, 40)).filter(Boolean).slice(0, 6),
      });
    }
    return { id: String(data.get("id") || ""), q: String(data.get("q") || "").trim().slice(0, 160), answers };
  }
  function saveSurveyForm() {
    const draft = harvestSurveyForm();
    if (!draft) return;
    const problems = surveyProblems(draft);
    if (problems.length) {
      state.surveyDraft = draft;
      state.surveyStatus = problems.join(" ");
      audio()?.wrong?.();
      render();
      return;
    }
    const clean = {
      id: draft.id, q: draft.q,
      answers: draft.answers.filter((a) => a.t).map((a) => ({ t: a.t, p: Number(a.p), aka: a.aka })),
    };
    const index = state.surveys.findIndex((s) => s.id === clean.id);
    if (index >= 0) state.surveys[index] = clean; else state.surveys.push(clean);
    state.editingSurvey = clean.id;
    state.surveyDraft = null;
    state.surveyStatus = clean.answers.length < 5
      ? "Question saved. Note: fewer than the usual 5+ answers — the board will feel sparse."
      : "Question saved for this session.";
    audio()?.ui?.();
    render();
  }
  function surveyEditorView() {
    const editing = editingSurveySource();
    const exists = !!findSurvey(editing.id);
    const rows = state.surveys.map((s) => {
      const total = s.answers.reduce((n, a) => n + (Number(a.p) || 0), 0);
      return `<button class="feud-ed-row${s.id === editing.id ? " active" : ""}" type="button" data-feud-ed-open="${esc(s.id)}"><span><b>${esc(s.q || "Untitled question")}</b><small>${s.answers.length} answers · ${total} pts</small></span><i aria-hidden="true">›</i></button>`;
    }).join("");
    const answerFields = editing.answers.map((a, i) => (
      `<div class="feud-ed-answer">` +
      `<label><span>Answer ${i + 1}</span><input name="at${i}" maxlength="80" value="${esc(a.t)}" placeholder="Top answer"></label>` +
      `<label class="feud-ed-points"><span>Points</span><input name="ap${i}" inputmode="numeric" value="${esc(a.p)}" placeholder="0"></label>` +
      `<label class="feud-ed-aliases"><span>Aliases (comma or line separated)</span><input name="aa${i}" maxlength="200" value="${esc((a.aka || []).join(", "))}" placeholder="other wordings players might type"></label>` +
      `<button type="button" class="feud-ed-x" data-feud-ed-del-answer="${i}" aria-label="Remove answer ${i + 1}">×</button></div>`
    )).join("");
    const ranked = [...editing.answers].filter((a) => String(a.t || "").trim())
      .sort((x, y) => (Number(y.p) || 0) - (Number(x.p) || 0));
    const preview = ranked.length
      ? `<div class="feud-ed-preview"><b>Board preview (ranked)</b><ol>${ranked.map((a, i) => `<li><span>${i + 1}</span><b>${esc(a.t)}</b><em>${esc(a.p)} pts</em></li>`).join("")}</ol></div>` : "";
    return `<section class="feud-ed" aria-label="Survey editor"><div class="feud-ed-head"><span><small>Companion tool</small><h2>Survey Showdown survey editor</h2><p>Add, revise, remove, import, and export every survey the showdown needs.</p></span><span class="feud-ed-count">${state.surveys.length} questions</span></div>` +
      `<div class="feud-ed-layout"><div class="feud-ed-list"><div class="feud-ed-toolbar"><button type="button" data-feud-ed-new>New question</button><button type="button" data-feud-ed-export>Download pack</button><label>Import pack<input type="file" accept="application/json" data-feud-ed-import></label><button type="button" data-feud-ed-reset>Restore starter</button></div>` +
      `<div class="feud-ed-rows">${rows || `<div class="feud-ed-empty">No questions yet. Create one to begin.</div>`}</div>` +
      `<p class="feud-ed-note">Edits stay in this session until you download the survey pack. Import that JSON next time to keep working—nothing is stored in this browser.</p></div>` +
      `<form class="feud-ed-form" data-feud-ed-form><input type="hidden" name="id" value="${esc(editing.id)}">` +
      `<label class="feud-ed-field"><span>Survey question</span><input name="q" maxlength="160" value="${esc(editing.q)}" placeholder="We asked 100 neighbors…"></label>` +
      `<div class="feud-ed-answers">${answerFields}</div>` +
      (editing.answers.length < 12 ? `<button type="button" class="secondary" data-feud-ed-add-answer>Add answer</button>` : "") +
      preview +
      `<div class="feud-ed-actions"><button class="feud-ed-danger" type="button" data-feud-ed-delete${exists ? "" : " disabled"}>Delete</button><button class="feud-primary" type="submit">Save question</button></div>` +
      `<p class="feud-ed-status" role="status">${esc(state.surveyStatus)}</p></form></div>` +
      `<div class="feud-ed-actions"><button type="button" class="secondary" data-feud-home>Done editing</button></div></section>`;
  }
  function surveyExport() {
    const pack = { format: "survey-showdown-survey-pack", version: 1, title: "Survey Showdown",
      surveys: state.surveys.map((s) => ({ q: s.q, answers: s.answers.map((a) => ({ t: a.t, p: Number(a.p), aka: [...a.aka] })) })) };
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "survey-showdown-survey-pack.json"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    state.surveyStatus = "Survey pack downloaded."; state.surveyDraft = null; render();
  }
  async function surveyImport(file) {
    try {
      const payload = JSON.parse(await file.text());
      const list = Array.isArray(payload) ? payload : payload.surveys;
      if (!Array.isArray(list) || !list.length) throw Error("That file has no surveys.");
      let added = 0, skipped = 0;
      list.slice(0, 300).forEach((raw) => {
        const q = String(raw.q || "").trim().slice(0, 160);
        const answers = (Array.isArray(raw.answers) ? raw.answers : []).map((a) => ({
          t: String(a.t || "").trim().slice(0, 80),
          p: Number(a.p),
          aka: (Array.isArray(a.aka) ? a.aka : []).map((v) => String(v).trim().slice(0, 40)).filter(Boolean).slice(0, 6),
        })).filter((a) => a.t);
        const candidate = { id: `survey-imp-${++feudEditorSeq}-${added}`, q, answers };
        if (surveyProblems(candidate).length) { skipped++; return; }
        state.surveys.push(candidate); added++;
      });
      if (!added) throw Error("That file has no usable surveys (each needs 3+ answers totaling exactly 100 points).");
      state.editingSurvey = state.surveys[state.surveys.length - 1].id;
      state.surveyDraft = null;
      state.surveyStatus = `Imported ${added} question${added === 1 ? "" : "s"}${skipped ? ` (${skipped} skipped).` : "."}`;
      render();
    } catch (error) {
      state.surveyStatus = error instanceof Error ? error.message : "That survey pack could not be imported.";
      render();
    }
  }

  /* ================= State ================= */

  const state = {
    root: null, view: "home", difficulty: "normal",
    game: null,           // { qIndex, questions:[{survey, revealed...}], playerTotal, rivalTotal }
    round: null,          // createRound() for the active question
    phase: "idle",        // faceoff-buzz | faceoff-answer | board | steal | done
    controller: null,     // "player" | "rival"
    buzzedBy: null,       // who buzzed first in the face-off
    rivalAnswered: false,  // rival gave its face-off answer; player counters next
    faceoffRanks: { player: -1, rival: -1 },
    timerToken: 0, timerEndsAt: 0, timerId: 0,
    muted: false, callout: "", banner: "", bannerPhase: "",
    lastResult: null,
    surveys: starterSurveys(),
    editingSurvey: null,
    surveyDraft: null,
    surveyStatus: "",
  };
  state.editingSurvey = state.surveys[0] ? state.surveys[0].id : null;
  const reducedMotion = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const thinkMs = () => {
    if (reducedMotion()) return 260;
    const d = DIFFICULTY[state.difficulty];
    return range(d.think[0], d.think[1]);
  };
  // Cancellable delayed callback (bumped on close / view change).
  function later(ms, fn) {
    const token = state.timerToken;
    const id = setTimeout(() => { if (token === state.timerToken) fn(); }, reducedMotion() ? Math.min(ms, 320) : ms);
    return id;
  }
  function clearTimers() {
    state.timerToken += 1;
    if (state.timerId) { clearInterval(state.timerId); state.timerId = 0; }
  }

  /* ================= DOM ================= */

  function hostsHTML() {
    return `<div class="feud-hosts">` +
      `<div class="feud-host" data-host="chip"><span class="feud-host-face chip" aria-hidden="true"></span><span><b>Chip Chance</b><small>Your host</small></span></div>` +
      `<div class="feud-host" data-host="tilly"><span class="feud-host-face tilly" aria-hidden="true"></span><span><b>Tilly Turner</b><small>Keeper of the Answers</small></span></div>` +
      `</div>`;
  }

  function scoreboardHTML() {
    const g = state.game;
    const you = g ? g.playerTotal : 0;
    const rival = g ? g.rivalTotal : 0;
    return `<div class="feud-scoreboard" role="status" aria-label="Score"><span class="${state.controller === "player" ? "is-up" : ""}">You <b>${you}</b></span><span class="feud-vs">vs</span><span class="${state.controller === "rival" ? "is-up" : ""}">Rival <b>${rival}</b></span></div>`;
  }

  function boardHTML() {
    const round = state.round;
    if (!round) return "";
    const rows = round.survey.answers.map((answer, i) => {
      const shown = round.revealed[i];
      return `<div class="feud-row${shown ? " revealed" : ""}">` +
        `<span class="feud-row-num">${i + 1}</span>` +
        `<span class="feud-row-text">${shown ? esc(answer.t) : "················"}</span>` +
        `<span class="feud-row-pts">${shown ? answer.p * round.multiplier : ""}</span>` +
        `</div>`;
    }).join("");
    const strikes = [0, 1, 2].map((i) =>
      `<span class="feud-x${i < round.strikes ? " lit" : ""}" aria-hidden="true">✕</span>`).join("");
    return `<div class="feud-board-wrap">` +
      `<div class="feud-board" aria-label="Survey board">${rows}</div>` +
      `<div class="feud-strikes" aria-label="${round.strikes} strikes">${strikes}</div>` +
      `<div class="feud-bankline"><span>Question ${state.game.qIndex + 1} of ${QUESTIONS_PER_SHOW}${state.game.qIndex === DOUBLE_ROUND_INDEX ? " · DOUBLE!" : ""}</span><span>Bank <b>${round.bank}</b> pts</span></div>` +
      `</div>`;
  }

  function answerFormHTML(kind) {
    // kind: "faceoff" | "board" | "steal"
    const labels = {
      faceoff: "Your answer (top answers win control)",
      board: "Name an answer on the board",
      steal: "Steal! Name one unrevealed answer",
    };
    return `<form class="feud-answer-form" data-feud-form="${kind}">` +
      `<input data-feud-input autocomplete="off" maxlength="60" placeholder="Type your answer…" aria-label="${esc(labels[kind])}">` +
      `<button type="submit">Answer</button></form>` +
      `<div class="feud-timerbar" aria-hidden="true"><span data-feud-timerfill></span></div>`;
  }

  function homeView() {
    const diffs = Object.entries(DIFFICULTY).map(([key, d]) =>
      `<button type="button" data-feud-difficulty="${key}" class="${state.difficulty === key ? "selected" : ""}" aria-pressed="${state.difficulty === key}">${d.label}</button>`
    ).join("");
    return `<div class="feud-set"><div class="feud-main">` +
      `<div class="feud-logo"><span>SURVEY<br>SHOWDOWN</span></div>` +
      `<div class="feud-banner">ONE-ON-ONE SURVEY SHOW!</div>` +
      hostsHTML() +
      `<div class="feud-callout" role="status">We asked 100 neighbors \u2014 you and a rival take turns guessing their top answers. Three strikes and the bank is up for grabs. Most points after ${QUESTIONS_PER_SHOW} questions wins!</div>` +
      `<div class="feud-diff" role="group" aria-label="Rival difficulty">${diffs}</div>` +
      `<div class="feud-actions"><button type="button" data-feud-start>Start the show</button><button type="button" class="secondary" data-feud-editor>Survey editor</button><button type="button" class="secondary" data-feud-close>Not now</button></div>` +
      `</div></div>`;
  }

  function faceoffView() {
    const survey = state.round.survey;
    let middle = "";
    if (state.phase === "faceoff-buzz") {
      middle = `<div class="feud-buzzrow"><button type="button" class="feud-buzz" data-feud-buzz>BUZZ IN!</button></div>` +
        `<div class="feud-timerbar" aria-hidden="true"><span data-feud-timerfill></span></div>` +
        `<div class="feud-callout" role="status">${esc(state.callout) || "Buzz in first, then name an answer. Higher answer takes control!"}</div>`;
    } else if (state.phase === "faceoff-answer" && state.buzzedBy === "player") {
      middle = answerFormHTML("faceoff") +
        `<div class="feud-callout" role="status">You buzzed first \u2014 name an answer!</div>`;
    } else if (state.phase === "faceoff-answer" && state.buzzedBy === "rival" && !state.rivalAnswered) {
      middle = `<div class="feud-thinking">Rival is answering…</div>` +
        `<div class="feud-callout" role="status">Rival buzzed first \u2014 get ready to beat their answer!</div>`;
    } else if (state.phase === "faceoff-answer" && state.buzzedBy === "rival") {
      const rivalAnswer = state.faceoffRanks.rival >= 0 ? state.round.survey.answers[state.faceoffRanks.rival].t : "";
      middle = answerFormHTML("faceoff") +
        `<div class="feud-callout" role="status">Rival said <b>${esc(rivalAnswer)}</b> \u2014 beat it if you can!</div>`;
    }
    return `<div class="feud-set"><div class="feud-main">` +
      `<div class="feud-logo small"><span>SURVEY<br>SHOWDOWN</span></div>` +
      `<div class="feud-question">“${esc(survey.q)}”</div>` +
      scoreboardHTML() + middle +
      `</div></div>`;
  }

  function boardView() {
    const survey = state.round.survey;
    let middle = "";
    if (state.phase === "board") {
      middle = state.controller === "player"
        ? answerFormHTML("board")
        : `<div class="feud-thinking">Rival is thinking…</div>`;
    } else if (state.phase === "steal") {
      const stealer = state.controller === "player" ? "rival" : "player";
      middle = stealer === "player"
        ? answerFormHTML("steal")
        : `<div class="feud-thinking">Rival plots the steal…</div>`;
    }
    const up = state.controller === "player" ? "Your board \u2014 run it!" : "Rival's board \u2014 hold your breath!";
    return `<div class="feud-set"><div class="feud-main">` +
      `<div class="feud-logo small"><span>SURVEY<br>SHOWDOWN</span></div>` +
      `<div class="feud-question">“${esc(survey.q)}”</div>` +
      scoreboardHTML() +
      `<div class="feud-banner" data-phase="${esc(state.bannerPhase || "")}">${esc(state.banner || up)}</div>` +
      boardHTML() + middle +
      `<div class="feud-callout" role="status" aria-live="polite">${state.callout}</div>` +
      `</div></div>`;
  }

  function finalView() {
    const g = state.game;
    const won = g.playerTotal >= g.rivalTotal;
    return `<div class="feud-set"><div class="feud-main">` +
      `<div class="feud-logo"><span>SURVEY<br>SHOWDOWN</span></div>` +
      `<div class="feud-banner" data-phase="${won ? "win" : ""}">${won ? "YOU WIN THE SHOW!" : "RIVAL TAKES IT!"}</div>` +
      hostsHTML() +
      `<div class="feud-finalscore"><span>You <b>${g.playerTotal}</b></span><span>Rival <b>${g.rivalTotal}</b></span></div>` +
      `<div class="feud-callout" role="status">${won
        ? `Champion! You banked <b>${WIN_SHELLS} shells</b> and the <b>${esc(PRIZE_NAME)}</b>!`
        : `Good game! You take home <b>${LOSE_SHELLS} shells</b> for playing.`}</div>` +
      `<div class="feud-actions"><button type="button" data-feud-again>Play again</button><button type="button" class="secondary" data-feud-home>Back to marquee</button></div>` +
      `</div></div>`;
  }

  function render() {
    if (!state.root) return;
    const panel = state.root.querySelector(".feud-panel");
    if (!panel) return;
    panel.innerHTML =
      state.view === "home" ? homeView() :
      state.view === "editor" ? surveyEditorView() :
      state.view === "faceoff" ? faceoffView() :
      state.view === "board" ? boardView() : finalView();
    const audioButton = state.root.querySelector("[data-feud-audio]");
    if (audioButton) {
      audioButton.textContent = state.muted ? "Sound off" : "Sound on";
      audioButton.setAttribute("aria-pressed", String(state.muted));
    }
  }

  function setCallout(html) {
    state.callout = html;
    const node = state.root?.querySelector(".feud-callout");
    if (node) node.innerHTML = html;
  }
  function setBanner(text, phase) {
    state.banner = text;
    state.bannerPhase = phase || "";
    const node = state.root?.querySelector(".feud-banner");
    if (node) { node.textContent = text; node.setAttribute("data-phase", state.bannerPhase); }
  }

  function build() {
    if (state.root) return;
    const root = document.createElement("section");
    root.className = "feud-game";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", `${SHOW_TITLE} game show`);
    root.innerHTML =
      `<header class="feud-topbar"><span><small>Cyclical City game show</small><b>${SHOW_TITLE}</b></span>` +
      `<div class="feud-top-tools"><button type="button" data-feud-audio aria-pressed="false">Sound on</button><button type="button" data-feud-close>Leave</button></div></header>` +
      `<div class="feud-stage"><div class="feud-panel"></div></div>`;
    root.addEventListener("click", onClick);
    root.addEventListener("submit", (event) => {
      const form = event.target.closest?.("[data-feud-form]");
      if (!form || !state.root?.contains(form)) return;
      event.preventDefault();
      const input = form.querySelector("[data-feud-input]");
      submitAnswer(form.getAttribute("data-feud-form"), input ? input.value : "");
      if (input) input.value = "";
    });
    root.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.matches?.("[data-feud-buzz]")) {
        event.preventDefault();
        playerBuzz();
      }
    });
    document.body.appendChild(root);
    state.root = root;
    try {
      if ("speechSynthesis" in window && speechSynthesis.addEventListener) {
        speechSynthesis.addEventListener("voiceschanged", ensureVoices);
      }
    } catch (e) { /* voice list stays best-effort */ }
  }

  /* ================= Flow ================= */

  function open() {
    build();
    ensureVoices();
    try { if ("speechSynthesis" in window) speechSynthesis.getVoices(); } catch (e) { /* voices load async */ }
    clearTimers();
    state.view = "home";
    state.phase = "idle";
    state.game = null;
    state.round = null;
    state.controller = null;
    render();
    state.root.hidden = false;
    requestAnimationFrame(() => state.root.classList.add("is-open"));
    audio()?.resume?.();
    audio()?.startTheme?.();
    setTimeout(() => audio()?.stopTheme?.(), 2400);
    speak("chip", CHIP_INTRO);
    later(5200, () => { if (state.view === "home") speak("tilly", TILLY_INTRO); });
  }

  function close() {
    clearTimers();
    const midShow = state.view === "faceoff" || state.view === "board";
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
    setSpeaking("chip", false);
    setSpeaking("tilly", false);
    audio()?.stopTheme?.();
    if (midShow) {
      window.dispatchEvent(new CustomEvent("snug-feud-result", {
        detail: { won: false, playerPoints: state.game?.playerTotal || 0, rivalPoints: state.game?.rivalTotal || 0, difficulty: state.difficulty, finished: false },
      }));
    }
    if (!state.root) return;
    state.root.classList.remove("is-open");
    setTimeout(() => { if (state.root) state.root.hidden = true; }, 240);
  }

  function startShow() {
    const valid = state.surveys.filter((s) => !surveyProblems(s).length);
    if (valid.length < QUESTIONS_PER_SHOW) {
      state.banner = "NOT ENOUGH QUESTIONS";
      state.callout = `Need at least ${QUESTIONS_PER_SHOW} valid questions — open the survey editor to add more.`;
      render();
      return;
    }
    const questions = shuffleArr(valid).slice(0, QUESTIONS_PER_SHOW);
    state.game = { qIndex: 0, questions, playerTotal: 0, rivalTotal: 0 };
    startQuestion();
  }

  function startQuestion() {
    const survey = state.game.questions[state.game.qIndex];
    const multiplier = state.game.qIndex === DOUBLE_ROUND_INDEX ? 2 : 1;
    state.round = createRound(survey, multiplier);
    state.controller = null;
    state.buzzedBy = null;
    state.rivalAnswered = false;
    state.faceoffRanks = { player: -1, rival: -1 };
    state.view = "faceoff";
    state.phase = "faceoff-buzz";
    state.callout = "";
    render();
    audio()?.turn?.();
    speak("chip", CHIP_LINES.faceoff());
    if (state.game.qIndex === DOUBLE_ROUND_INDEX) {
      setCallout("Double round \u2014 every answer is worth twice the points!");
      later(1200, () => speak("chip", CHIP_LINES.double()));
    }
    startBuzzRace();
  }

  function paintTimerFill(frac) {
    const fill = state.root?.querySelector("[data-feud-timerfill]");
    if (fill) fill.style.transform = `scaleX(${Math.max(0, Math.min(1, frac))})`;
  }

  function runCountdown(ms, onDone) {
    clearInterval(state.timerId);
    state.timerEndsAt = Date.now() + ms;
    state.timerId = setInterval(() => {
      const left = state.timerEndsAt - Date.now();
      paintTimerFill(left / ms);
      if (left <= 0) {
        clearInterval(state.timerId);
        state.timerId = 0;
        onDone();
      }
    }, 100);
    paintTimerFill(1);
  }

  function startBuzzRace() {
    const d = DIFFICULTY[state.difficulty];
    // Rival buzzes after a difficulty-based delay; the player races it.
    later(range(d.botBuzz[0], d.botBuzz[1]), () => {
      if (state.phase === "faceoff-buzz") rivalBuzz();
    });
    runCountdown(FACEOFF_BUZZ_MS, () => {
      if (state.phase === "faceoff-buzz") rivalBuzz(); // player slept on the buzzer
    });
  }

  function playerBuzz() {
    if (state.phase !== "faceoff-buzz") return;
    clearTimers();
    state.buzzedBy = "player";
    state.phase = "faceoff-answer";
    audio()?.ui?.();
    render();
    runCountdown(ANSWER_MS, () => {
      if (state.phase === "faceoff-answer" && state.buzzedBy === "player") {
        // Player froze — counts as no answer.
        resolveFaceoff();
      }
    });
    const input = state.root?.querySelector("[data-feud-input]");
    if (input) setTimeout(() => input.focus(), 60);
  }

  function rivalBuzz() {
    if (state.phase !== "faceoff-buzz") return;
    clearTimers();
    state.buzzedBy = "rival";
    state.phase = "faceoff-answer";
    audio()?.turn?.();
    // Rival answers after a beat.
    later(thinkMs(), () => {
      if (state.phase !== "faceoff-answer" || state.buzzedBy !== "rival") return;
      const d = DIFFICULTY[state.difficulty];
      const roll = Math.random();
      let idx = 0;
      const cum = [d.faceoffTop[0], d.faceoffTop[0] + d.faceoffTop[1], d.faceoffTop[0] + d.faceoffTop[1] + d.faceoffTop[2]];
      idx = roll < cum[0] ? 0 : roll < cum[1] ? 1 : roll < cum[2] ? 2 : Math.floor(Math.random() * state.round.survey.answers.length);
      idx = Math.min(idx, state.round.survey.answers.length - 1);
      state.faceoffRanks.rival = idx;
      revealFaceoffAnswer("rival", idx);
      // Player gets one chance to beat it.
      state.rivalAnswered = true;
      state.phase = "faceoff-answer";
      render();
      setCallout(`Rival says <b>${esc(state.round.survey.answers[idx].t)}</b> \u2014 beat it if you can!`);
      runCountdown(ANSWER_MS, () => {
        if (state.phase === "faceoff-answer" && state.buzzedBy === "rival") resolveFaceoff();
      });
      const input = state.root?.querySelector("[data-feud-input]");
      if (input) setTimeout(() => input.focus(), 60);
    });
    render();
  }

  function revealFaceoffAnswer(who, rank) {
    if (rank < 0) return;
    state.round.revealed[rank] = true;
    const answer = state.round.survey.answers[rank];
    audio()?.reveal?.(rank);
    setBanner(`${who === "player" ? "YOU" : "RIVAL"}: ${answer.t.toUpperCase()} \u2014 ${answer.p}`, "reveal");
  }

  function submitAnswer(kind, raw) {
    const text = String(raw || "").trim();
    if (kind === "faceoff" && state.view === "faceoff" && state.phase === "faceoff-answer") {
      // Player's own buzzed answer, or the counter-answer after the rival buzzed first.
      if (state.buzzedBy === "player" || (state.buzzedBy === "rival" && state.rivalAnswered)) {
        if (!text) { setCallout("Type your answer first!"); return; }
        clearTimers();
        const rank = findAnswer(state.round.survey, text);
        state.faceoffRanks.player = rank;
        if (rank >= 0) revealFaceoffAnswer("player", rank);
        else { audio()?.wrong?.(); setCallout(`“${esc(text.slice(0, 40))}” isn't on the board!`); }
        later(1100, resolveFaceoff);
      }
      return;
    }
    if (state.view === "board" && state.phase === "board" && kind === "board" && state.controller === "player") {
      if (!text) { setCallout("Type your guess first!"); return; }
      playerBoardGuess(text);
      return;
    }
    if (state.view === "board" && state.phase === "steal" && kind === "steal") {
      const stealer = state.controller === "player" ? "rival" : "player";
      if (stealer !== "player") return;
      if (!text) { setCallout("Type your steal first!"); return; }
      playerSteal(text);
    }
  }

  function resolveFaceoff() {
    if (state.view !== "faceoff") return;
    clearTimers();
    const winner = faceoffWinner(state.faceoffRanks.player, state.faceoffRanks.rival);
    state.controller = winner;
    state.view = "board";
    state.phase = "board";
    state.round.strikes = 0;
    // Reset face-off reveals — the board round starts fresh (classic rules).
    state.round.revealed = state.round.survey.answers.map(() => false);
    const who = winner === "player" ? "You" : "Rival";
    setBanner(`${who.toUpperCase()} CONTROL${winner === "player" ? "S" : "S"} THE BOARD!`, "control");
    setCallout(`${who} won the face-off \u2014 name answers to run the board. Three strikes and it's steal time!`);
    audio()?.solve?.();
    render();
    speak("tilly", TILLY_LINES.faceoffWin());
    later(900, () => { if (state.view === "board") boardTurn(); });
  }

  function boardTurn() {
    if (state.view !== "board" || state.phase !== "board") return;
    if (state.controller === "player") {
      render();
      const input = state.root?.querySelector("[data-feud-input]");
      if (input) setTimeout(() => input.focus(), 60);
      return;
    }
    // Rival's turn — think, then guess.
    render();
    later(thinkMs(), () => {
      if (state.view !== "board" || state.phase !== "board" || state.controller !== "rival") return;
      const idx = botPickAnswer(state.round.survey, state.round.revealed, state.difficulty, false);
      if (idx < 0) rivalMiss();
      else rivalGuess(idx);
    });
  }

  function playerBoardGuess(text) {
    const result = guessAnswer(state.round, text);
    if (result.hit) {
      const answer = state.round.survey.answers[result.rank];
      audio()?.reveal?.(result.rank);
      setCallout(`<b>${esc(answer.t)}</b> \u2014 +${result.points} points! Bank: <b>${state.round.bank}</b>.`);
      speak("chip", CHIP_LINES.good(result.points, result.rank === 0));
      render();
      if (result.complete) {
        later(1200, () => endQuestion("player"));
      }
    } else {
      state.round.strikes += 1;
      audio()?.wrong?.();
      speak("chip", CHIP_LINES.strike(state.round.strikes));
      if (state.round.strikes >= 3) {
        render();
        later(1400, startSteal);
      } else {
        setCallout(`Strike ${state.round.strikes}! ${3 - state.round.strikes} ${3 - state.round.strikes === 1 ? "guess" : "guesses"} left before the steal.`);
        render();
      }
    }
  }

  function rivalGuess(idx) {
    const answer = state.round.survey.answers[idx];
    const result = guessAnswer(state.round, answer.t);
    if (result.hit) {
      audio()?.reveal?.(result.rank);
      setCallout(`Rival says <b>${esc(answer.t)}</b> \u2014 +${result.points}! Bank: <b>${state.round.bank}</b>.`);
      speak("chip", CHIP_LINES.good(result.points, result.rank === 0));
      render();
      if (result.complete) later(1200, () => endQuestion("rival"));
      else later(thinkMs(), () => { if (state.view === "board" && state.phase === "board") boardTurn(); });
    } else {
      rivalMiss();
    }
  }

  function rivalMiss() {
    state.round.strikes += 1;
    audio()?.wrong?.();
    speak("chip", CHIP_LINES.strike(state.round.strikes));
    render();
    if (state.round.strikes >= 3) later(1400, startSteal);
    else later(thinkMs(), () => { if (state.view === "board" && state.phase === "board") boardTurn(); });
  }

  function startSteal() {
    if (state.view !== "board") return;
    state.phase = "steal";
    const stealer = state.controller === "player" ? "rival" : "player";
    setBanner("STEAL TIME!", "steal");
    setCallout(stealer === "player"
      ? "Three strikes! One answer steals the whole bank \u2014 make it count!"
      : "Three strikes! The rival gets one steal attempt...");
    audio()?.turn?.();
    speak("chip", CHIP_LINES.stealPrompt());
    render();
    if (stealer === "rival") {
      later(thinkMs() * 1.4, () => {
        if (state.view !== "board" || state.phase !== "steal") return;
        const idx = botPickAnswer(state.round.survey, state.round.revealed, state.difficulty, true);
        resolveSteal("rival", idx);
      });
    } else {
      const input = state.root?.querySelector("[data-feud-input]");
      if (input) setTimeout(() => input.focus(), 60);
    }
  }

  function playerSteal(text) {
    const rank = findAnswer(state.round.survey, text);
    const valid = rank >= 0 && !state.round.revealed[rank];
    resolveSteal("player", valid ? rank : -1);
  }

  function resolveSteal(stealer, rank) {
    const bank = state.round.bank;
    const stolen = rank >= 0 && !state.round.revealed[rank];
    if (stolen) {
      state.round.revealed[rank] = true;
      const answer = state.round.survey.answers[rank];
      const pts = answer.p * state.round.multiplier;
      if (stealer === "player") state.game.playerTotal += bank;
      else state.game.rivalTotal += bank;
      audio()?.jackpot?.();
      setBanner(`STOLEN! +${bank} PTS`, "steal");
      setCallout(`<b>${esc(answer.t)}</b> was on the board! ${stealer === "player" ? "You steal" : "Rival steals"} <b>${bank}</b> points!`);
      speak("chip", CHIP_LINES.stealWin(bank));
    } else {
      if (state.controller === "player") state.game.playerTotal += bank;
      else state.game.rivalTotal += bank;
      audio()?.wrong?.();
      setCallout(`No good \u2014 the bank of <b>${bank}</b> stays with ${state.controller === "player" ? "you" : "the rival"}.`);
      speak("chip", CHIP_LINES.stealMiss());
    }
    render();
    state.round.bank = 0;
    later(2200, nextQuestion);
  }

  function endQuestion(winner) {
    // Board cleared — controller banks it all.
    const bank = state.round.bank;
    if (winner === "player") state.game.playerTotal += bank;
    else state.game.rivalTotal += bank;
    audio()?.solve?.();
    setCallout(`${winner === "player" ? "Clean sweep! You bank" : "Rival clears the board and banks"} <b>${bank}</b> points!`);
    speak("tilly", TILLY_LINES.boardClear());
    render();
    state.round.bank = 0;
    later(2200, nextQuestion);
  }

  function nextQuestion() {
    state.game.qIndex += 1;
    if (state.game.qIndex >= QUESTIONS_PER_SHOW) { endShow(); return; }
    startQuestion();
  }

  function endShow() {
    clearTimers();
    const g = state.game;
    const won = g.playerTotal >= g.rivalTotal;
    state.view = "final";
    state.phase = "done";
    if (won) {
      const shells = WIN_SHELLS + g.playerTotal;
      awardShells(shells, `${SHOW_TITLE} \u00b7 +${shells} shells`);
      awardInventoryItem(PRIZE_ITEM);
      audio()?.fanfare?.(true);
      speak("chip", CHIP_LINES.win());
    } else {
      awardShells(LOSE_SHELLS, `${SHOW_TITLE} \u00b7 +${LOSE_SHELLS} shells`);
      audio()?.fanfare?.(false);
      speak("chip", CHIP_LINES.lose());
    }
    window.dispatchEvent(new CustomEvent("snug-feud-result", {
      detail: { won, playerPoints: g.playerTotal, rivalPoints: g.rivalTotal, difficulty: state.difficulty, finished: true },
    }));
    state.lastResult = { won, playerPoints: g.playerTotal, rivalPoints: g.rivalTotal };
    render();
  }

  /* ================= Events ================= */

  function onClick(event) {
    const target = event.target.closest("button, input");
    if (!target || !state.root?.contains(target)) return;
    if (target.matches("[data-feud-close]")) { close(); return; }
    if (target.matches("[data-feud-audio]")) {
      state.muted = !state.muted;
      audio()?.setMuted?.(state.muted);
      if (!state.muted) audio()?.ui?.();
      render();
      return;
    }
    if (target.matches("[data-feud-difficulty]")) {
      state.difficulty = target.getAttribute("data-feud-difficulty");
      audio()?.ui?.();
      render();
      return;
    }
    if (target.matches("[data-feud-editor]")) { state.view = "editor"; state.surveyStatus = ""; state.surveyDraft = null; audio()?.ui?.(); render(); return; }
    if (state.view === "editor") {
      if (target.matches("[data-feud-ed-new]")) { const b = blankSurvey(); state.editingSurvey = b.id; state.surveyDraft = b; state.surveyStatus = ""; render(); return; }
      if (target.dataset.feudEdOpen) { state.editingSurvey = target.dataset.feudEdOpen; state.surveyDraft = null; state.surveyStatus = ""; render(); return; }
      if (target.matches("[data-feud-ed-export]")) { surveyExport(); return; }
      if (target.matches("[data-feud-ed-reset]")) { state.surveys = starterSurveys(); state.editingSurvey = state.surveys[0].id; state.surveyDraft = null; state.surveyStatus = "Starter surveys restored for this session."; render(); return; }
      if (target.matches("[data-feud-ed-delete]")) {
        state.surveys = state.surveys.filter((s) => s.id !== state.editingSurvey);
        state.editingSurvey = state.surveys[0] ? state.surveys[0].id : null;
        state.surveyDraft = null; state.surveyStatus = "Question removed from this session."; audio()?.wrong?.(); render(); return;
      }
      if (target.matches("[data-feud-ed-add-answer]")) {
        const draft = harvestSurveyForm() || editingSurveySource();
        if (draft.answers.length < 12) draft.answers.push({ t: "", p: "", aka: [] });
        state.surveyDraft = draft; state.surveyStatus = ""; render(); return;
      }
      const delAnswer = target.closest("[data-feud-ed-del-answer]");
      if (delAnswer) {
        const draft = harvestSurveyForm() || editingSurveySource();
        draft.answers.splice(Number(delAnswer.dataset.feudEdDelAnswer), 1);
        if (!draft.answers.length) draft.answers.push({ t: "", p: "", aka: [] });
        state.surveyDraft = draft; state.surveyStatus = ""; render(); return;
      }
    }
    if (target.matches("[data-feud-start]")) { audio()?.ui?.(); startShow(); return; }
    if (target.matches("[data-feud-again]")) { audio()?.ui?.(); startShow(); return; }
    if (target.matches("[data-feud-home]")) {
      clearTimers();
      state.view = "home";
      state.phase = "idle";
      state.game = null;
      state.round = null;
      render();
      return;
    }
    if (target.matches("[data-feud-buzz]")) { playerBuzz(); }
  }

  /* ================= Launch integration ================= */

  function install(root = document) {
    root.querySelectorAll?.(".practice-grid").forEach((grid) => {
      if (grid.parentElement?.querySelector(".feud-practice")) return;
      const section = document.createElement("section");
      section.className = "feud-practice";
      section.innerHTML =
        `<small>Cyclical City game show</small>` +
        `<button class="feud-launch" type="button" data-feud-launch style="display:flex;align-items:center;gap:10px;width:100%;text-align:left">` +
        `<i aria-hidden="true">?</i><span><b>${SHOW_TITLE}</b><small>One-on-one survey showdown</small></span></button>`;
      grid.before(section);
    });
    root.querySelectorAll?.(".play-panel").forEach((panel) => {
      if (panel.querySelector("[data-feud-launch]")) return;
      const button = document.createElement("button");
      button.className = "feud-launch";
      button.type = "button";
      button.setAttribute("data-feud-launch", "");
      button.setAttribute("style", "display:flex;align-items:center;gap:10px;width:100%;text-align:left");
      button.innerHTML = `<i aria-hidden="true">?</i><span><b>${SHOW_TITLE}</b><small>Buzz in \u00b7 top answers win</small></span>`;
      panel.appendChild(button);
    });
  }

  document.addEventListener("click", (event) => {
    const launch = event.target.closest?.("[data-feud-launch]");
    if (launch) { event.preventDefault(); open(); }
  }, true);
  document.addEventListener("submit", (event) => {
    if (event.target.matches?.("[data-feud-ed-form]")) { event.preventDefault(); saveSurveyForm(); }
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches?.("[data-feud-ed-import]") && event.target.files?.[0]) surveyImport(event.target.files[0]);
  });

  const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === 1) install(node);
  })));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  install();
  build();

  window.__snugFeudShow = { open, close };
  window.__snugFeudSurveys = SURVEYS.map((s) => ({ q: s.q, answers: s.answers.map((a) => ({ t: a.t, p: a.p, aka: [...(a.aka || [])] })) }));
  // Test hooks: pure logic + data for the headless smoke test.
  window.__snugFeudTest = { norm, findAnswer, createRound, guessAnswer, botPickAnswer, faceoffWinner, DIFFICULTY, QUESTIONS_PER_SHOW };
})();
