// Synthesizes pleasant ambient celebration chords and harp-like notes using Web Audio API
class MusicPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private gainNode: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.15;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;
    this.isPlaying = true;

    // Harmonic celebration melody notes (Pentatonic gentle celebratory progression)
    // Clara's waltz celebration chords: D maj, A maj, B min, G maj
    const chords = [
      [293.66, 369.99, 440.00, 587.33], // D4, F#4, A4, D5
      [220.00, 277.18, 329.63, 440.00], // A3, C#4, E4, A4
      [246.94, 293.66, 369.99, 493.88], // B3, D4, F#4, B4
      [196.00, 246.94, 293.66, 392.00], // G3, B3, D4, G4
    ];

    let chordIndex = 0;
    let step = 0;

    const playNextNote = () => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      
      const currentChord = chords[chordIndex % chords.length];
      const noteFreq = currentChord[step % currentChord.length];
      
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.2);

      step++;
      if (step % currentChord.length === 0) {
        chordIndex++;
      }
    };

    // Play every 420ms for gentle flowing rhythm
    this.intervalId = setInterval(playNextNote, 420);
    playNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public playCelebrationChime() {
    this.initContext();
    if (!this.ctx || !this.gainNode) return;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
      noteGain.gain.setValueAtTime(0.01, this.ctx.currentTime + idx * 0.09);
      noteGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + idx * 0.09 + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.8);
      osc.connect(noteGain);
      noteGain.connect(this.gainNode!);
      osc.start(this.ctx.currentTime + idx * 0.09);
      osc.stop(this.ctx.currentTime + idx * 0.09 + 0.8);
    });
  }
}

export const musicPlayer = new MusicPlayer();
