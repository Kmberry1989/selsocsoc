(() => {
  class SnugGameShowAudio {
    constructor() { this.ctx = null; this.master = null; this.muted = false; this.themeTimer = 0; this.themeStep = 0; }
    resume() {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return null;
      if (!this.ctx) {
        this.ctx = window.__snugSfxEngine?.ctx || new AudioContext();
        this.master = this.ctx.createGain(); this.master.gain.value = .34; this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return this.ctx;
    }
    setMuted(value) { this.muted = Boolean(value); if (this.master) this.master.gain.setTargetAtTime(this.muted ? 0 : .34, this.ctx.currentTime, .025); }
    tone(freq, start = 0, duration = .12, type = "square", volume = .12, endFreq = 0) {
      const ctx = this.resume(); if (!ctx || this.muted) return;
      const now = ctx.currentTime + start, osc = ctx.createOscillator(), gain = ctx.createGain(), filter = ctx.createBiquadFilter();
      osc.type = type; osc.frequency.setValueAtTime(Math.max(30, freq), now); if (endFreq) osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), now + duration);
      filter.type = "lowpass"; filter.frequency.value = 2500; gain.gain.setValueAtTime(.001, now); gain.gain.linearRampToValueAtTime(volume, now + .012); gain.gain.exponentialRampToValueAtTime(.001, now + duration);
      osc.connect(filter); filter.connect(gain); gain.connect(this.master); osc.start(now); osc.stop(now + duration + .02);
    }
    noise(duration = .16, volume = .09) {
      const ctx = this.resume(); if (!ctx || this.muted) return;
      const length = Math.max(1, Math.floor(ctx.sampleRate * duration)), buffer = ctx.createBuffer(1, length, ctx.sampleRate), data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
      const source = ctx.createBufferSource(), filter = ctx.createBiquadFilter(), gain = ctx.createGain(); source.buffer = buffer; filter.type = "bandpass"; filter.frequency.value = 1100; gain.gain.value = volume; source.connect(filter); filter.connect(gain); gain.connect(this.master); source.start();
    }
    ui() { this.tone(520, 0, .07, "triangle", .09, 690); }
    spinTick(speed = .5) { this.tone(420 + Math.min(1, speed) * 900, 0, .035, "square", .055); }
    reveal(index = 0) { this.tone(660 + (index % 5) * 70, index * .045, .16, "sine", .11); }
    wrong() { this.tone(185, 0, .32, "sawtooth", .1, 105); this.noise(.13, .04); }
    solve() { [523,659,784,1047].forEach((f,i)=>this.tone(f,i*.095,.48,"triangle",.12)); }
    jackpot() { [392,523,659,784,1047].forEach((f,i)=>this.tone(f,i*.075,.65,"sawtooth",.09)); setTimeout(()=>this.noise(.7,.055),220); }
    turn() { [330,440,554].forEach((f,i)=>this.tone(f,i*.055,.22,"square",.07)); }
    startTheme() {
      this.stopTheme(); this.resume();
      const notes = [392,523,659,523,440,587,698,587,392,494,659,784,698,587,523,494];
      const play = () => { if (document.hidden) return; const f = notes[this.themeStep++ % notes.length]; this.tone(f,0,.19,"triangle",.035); this.tone(f/2,0,.22,"sine",.025); };
      play(); this.themeTimer = window.setInterval(play, 230);
    }
    stopTheme() { if (this.themeTimer) clearInterval(this.themeTimer); this.themeTimer = 0; }
    fanfare(win = true) { win ? this.jackpot() : this.wrong(); }
  }
  window.SnugGameShowAudio = SnugGameShowAudio;
  window.__snugGameShowAudio = window.__snugGameShowAudio || new SnugGameShowAudio();
})();
