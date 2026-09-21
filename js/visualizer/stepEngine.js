/**
 * AlgoSphere - Step Engine
 * Manages playback cursor and provides instant, glitch-free O(1) time-travel stepping.
 */

export class StepEngine {
  constructor() {
    this.steps = [];
    this.initialArray = [];
    this.currentIndex = 0;
    this.listeners = new Set();
  }

  /**
   * Loads a new sequence of steps
   * @param {Array} steps
   * @param {Array} initialArray
   */
  load(steps, initialArray) {
    this.steps = Array.isArray(steps) ? steps : [];
    this.initialArray = Array.isArray(initialArray) ? [...initialArray] : [];
    this.currentIndex = 0;
    this.notify();
  }

  /**
   * Subscribes a listener to step cursor changes
   * @param {Function} callback
   * @returns {Function} unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    const current = this.getCurrentStep();
    const meta = {
      index: this.currentIndex,
      total: this.steps.length,
      hasNext: this.hasNext(),
      hasPrev: this.hasPrev(),
      isComplete: this.isComplete()
    };
    this.listeners.forEach(fn => fn(current, meta));
  }

  getCurrentStep() {
    if (this.steps.length === 0) return null;
    return this.steps[this.currentIndex];
  }

  getStepIndex() {
    return this.currentIndex;
  }

  getTotalSteps() {
    return this.steps.length;
  }

  hasNext() {
    return this.currentIndex < this.steps.length - 1;
  }

  hasPrev() {
    return this.currentIndex > 0;
  }

  isComplete() {
    return this.steps.length > 0 && this.currentIndex === this.steps.length - 1;
  }

  next() {
    if (this.hasNext()) {
      this.currentIndex++;
      this.notify();
      return this.getCurrentStep();
    }
    return null;
  }

  prev() {
    if (this.hasPrev()) {
      this.currentIndex--;
      this.notify();
      return this.getCurrentStep();
    }
    return null;
  }

  reset() {
    this.currentIndex = 0;
    this.notify();
    return this.getCurrentStep();
  }

  jumpTo(index) {
    if (this.steps.length === 0) return null;
    this.currentIndex = Math.max(0, Math.min(index, this.steps.length - 1));
    this.notify();
    return this.getCurrentStep();
  }
}
