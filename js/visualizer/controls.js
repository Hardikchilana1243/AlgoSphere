/**
 * AlgoSphere - Visualizer Controls Handler
 * Connects buttons, range inputs, and keyboard shortcuts to the StepEngine and AnimationController.
 */

export class VisualizerControls {
  /**
   * @param {Object} elements
   * @param {import('./stepEngine.js').StepEngine} stepEngine
   * @param {import('./animationController.js').AnimationController} animationController
   */
  constructor(elements, stepEngine, animationController) {
    this.elements = elements;
    this.stepEngine = stepEngine;
    this.animationController = animationController;
    this.keyHandler = null;

    this.initEventListeners();
  }

  initEventListeners() {
    const { playBtn, prevBtn, nextBtn, resetBtn, scrubber, speedSlider } = this.elements;

    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.animationController.toggle();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.animationController.pause();
        this.stepEngine.prev();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.animationController.pause();
        this.stepEngine.next();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.animationController.stopAndReset();
      });
    }

    if (scrubber) {
      scrubber.addEventListener('input', (e) => {
        this.animationController.pause();
        const index = parseInt(e.target.value, 10);
        this.stepEngine.jumpTo(index);
      });
    }

    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.animationController.setSpeed(val);
      });
    }

    // Keyboard shortcuts (Space = Play/Pause, ArrowLeft = Prev, ArrowRight = Next, R = Reset)
    this.keyHandler = (e) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space') {
        e.preventDefault();
        this.animationController.toggle();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.animationController.pause();
        this.stepEngine.next();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.animationController.pause();
        this.stepEngine.prev();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        this.animationController.stopAndReset();
      }
    };

    window.addEventListener('keydown', this.keyHandler);
  }

  updatePlayButton(isPlaying) {
    if (!this.elements.playBtn) return;
    if (isPlaying) {
      this.elements.playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        </svg>
        <span>Pause</span>
      `;
      this.elements.playBtn.className = 'btn btn-secondary';
    } else {
      this.elements.playBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
        <span>Play</span>
      `;
      this.elements.playBtn.className = 'btn btn-primary';
    }
  }

  updateStepButtons(meta) {
    if (this.elements.prevBtn) {
      this.elements.prevBtn.disabled = !meta.hasPrev;
    }
    if (this.elements.nextBtn) {
      this.elements.nextBtn.disabled = !meta.hasNext;
    }
  }

  destroy() {
    if (this.keyHandler) {
      window.removeEventListener('keydown', this.keyHandler);
    }
  }
}
