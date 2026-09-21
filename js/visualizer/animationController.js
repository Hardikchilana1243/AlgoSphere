/**
 * AlgoSphere - Animation Controller
 * Handles play/pause loops, dynamic playback speeds, and prevents overlapping timers.
 */

export class AnimationController {
  /**
   * @param {import('./stepEngine.js').StepEngine} stepEngine
   * @param {Object} options
   */
  constructor(stepEngine, options = {}) {
    this.stepEngine = stepEngine;
    this.speedMs = options.speedMs || 350;
    this.isPlaying = false;
    this.timerId = null;
    this.generation = 0; // Incremented on reset/pause to invalidate in-flight ticks
    this.stateListeners = new Set();
  }

  onStateChange(callback) {
    this.stateListeners.add(callback);
    return () => this.stateListeners.delete(callback);
  }

  notifyState() {
    this.stateListeners.forEach(fn => fn({
      isPlaying: this.isPlaying,
      speedMs: this.speedMs
    }));
  }

  setSpeed(ms) {
    this.speedMs = Math.max(30, Math.min(1500, ms));
    this.notifyState();
  }

  play() {
    if (this.isPlaying) return;

    // If already at end, restart from beginning
    if (this.stepEngine.isComplete()) {
      this.stepEngine.reset();
    }

    this.isPlaying = true;
    this.generation++;
    this.notifyState();
    this.scheduleNextTick(this.generation);
  }

  pause() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    this.generation++;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notifyState();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  stopAndReset() {
    this.pause();
    this.stepEngine.reset();
  }

  scheduleNextTick(currentGeneration) {
    if (!this.isPlaying || currentGeneration !== this.generation) return;

    this.timerId = setTimeout(() => {
      // Guard against race conditions and cancelled generations
      if (!this.isPlaying || currentGeneration !== this.generation) return;

      if (this.stepEngine.hasNext()) {
        this.stepEngine.next();
        this.scheduleNextTick(currentGeneration);
      } else {
        // Reached the end of execution
        this.pause();
      }
    }, this.speedMs);
  }
}
