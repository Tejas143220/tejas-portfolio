// Silent SoundSynthesizer (Audio Disabled)
class SoundSynthesizer {
  constructor() {
    this.enabled = false;
  }
  init() {}
  toggle() { return false; }
  playClick() {}
  playBeep() {}
  playSynthPulse() {}
}

export const soundFx = new SoundSynthesizer();
