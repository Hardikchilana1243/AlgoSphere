/**
 * AlgoSphere - Searching Visualizer Page Controller
 * Horizontal cell visualizer with pointer tracking (Low, Mid, High, Current), sorted validation, and result banner.
 */

import { ALGORITHM_METADATA } from '../data/algorithmMetadata.js';
import { generateLinearSearchSteps } from '../algorithms/searching/linearSearch.js';
import { generateBinarySearchSteps } from '../algorithms/searching/binarySearch.js';
import { StepEngine } from '../visualizer/stepEngine.js';
import { VisualizerRenderer } from '../visualizer/renderer.js';
import { AnimationController } from '../visualizer/animationController.js';
import { VisualizerControls } from '../visualizer/controls.js';
import { Validation } from '../utils/validation.js';
import { generateRandomArray, isSorted } from '../utils/arrayUtils.js';
import { Storage } from '../utils/storage.js';

export class SearchingPage {
  constructor() {
    this.currentAlgoKey = 'linearSearch';
    this.currentArray = [14, 25, 33, 42, 51, 67, 72, 85, 94];
    this.currentTarget = 42;
    this.stepEngine = new StepEngine();
    this.renderer = null;
    this.animController = null;
    this.controls = null;
  }

  render(container, params = {}) {
    if (params.algo === 'binarySearch' || params.algo === 'linearSearch') {
      this.currentAlgoKey = params.algo;
    }

    const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
    const userPrefs = Storage.getPreferences();
    const isBinary = this.currentAlgoKey === 'binarySearch';
    const sorted = isSorted(this.currentArray);

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        <!-- Page Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text);">Searching Visualizer</h1>
              <span class="badge badge-secondary">Pointer Studio</span>
            </div>
            <p style="font-size: var(--text-sm); color: var(--muted); margin-top: 4px;">
              Trace sequential scans or logarithmic divide-and-conquer boundaries with live pointer indicators.
            </p>
          </div>

          <!-- Algorithm Selector -->
          <div style="min-width: 220px;">
            <label for="search-algo-select" class="form-label">Algorithm</label>
            <select id="search-algo-select" class="form-select">
              <option value="linearSearch" ${this.currentAlgoKey === 'linearSearch' ? 'selected' : ''}>Linear Search (O(n))</option>
              <option value="binarySearch" ${this.currentAlgoKey === 'binarySearch' ? 'selected' : ''}>Binary Search (O(log n))</option>
            </select>
          </div>
        </div>

        <!-- Binary Search Sorted Requirement Banner (conditionally displayed) -->
        <div id="sorted-warning-banner" class="alert alert-warning" style="display: ${isBinary && !sorted ? 'flex' : 'none'}; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <span>⚠</span>
            <span><strong>Binary Search requires a sorted array.</strong> Current elements are not monotonically ordered.</span>
          </div>
          <button class="btn btn-sm btn-primary" id="btn-sort-array-now">
            <span>Sort Array Now</span>
          </button>
        </div>

        <!-- Input & Target Toolbar -->
        <div class="panel" style="padding: var(--space-4);">
          <div style="display: grid; grid-template-columns: 1fr 140px auto; gap: var(--space-3); align-items: flex-end;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="search-array-input" class="form-label">
                <span>Array (Comma-separated numbers 1–100, 5–16 items)</span>
                <span id="search-array-count" style="font-family: var(--font-mono); color: var(--secondary);">${this.currentArray.length} items</span>
              </label>
              <input 
                type="text" 
                id="search-array-input" 
                class="form-input" 
                value="${this.currentArray.join(', ')}" 
              />
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label for="search-target-input" class="form-label">
                <span>Target Value</span>
              </label>
              <input 
                type="number" 
                id="search-target-input" 
                class="form-input" 
                min="1" 
                max="100" 
                value="${this.currentTarget}" 
              />
            </div>

            <button class="btn btn-secondary" id="search-generate-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Random Dataset</span>
            </button>
          </div>

          <div id="search-validation-error" class="alert alert-danger" style="display: none; margin-top: var(--space-3);"></div>
        </div>

        <!-- Searching Stage & Work Area -->
        <div class="visualizer-workspace">
          <!-- Main Visualization Column -->
          <div class="visualizer-main-column">
            <div class="stage-container" style="justify-content: center;">
              <!-- Searching Result Banner -->
              <div id="search-result-banner" class="alert" style="display: none; margin-bottom: var(--space-4); width: 100%;"></div>

              <!-- Horizontal Array Stage with Pointers -->
              <div class="searching-stage-wrapper" id="searching-stage">
                <!-- Injected by renderer -->
              </div>

              <!-- Step Explanation Box -->
              <div class="step-explanation-box" id="search-step-explanation" style="width: 100%;">
                <span class="step-explanation-icon">ℹ</span>
                <span>Ready to start searching.</span>
              </div>
            </div>

            <!-- Playback Controls -->
            <div class="visualizer-controls">
              <div class="controls-button-group">
                <button class="btn btn-secondary btn-icon" id="search-ctrl-reset" title="Reset (Key: R)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                </button>

                <button class="btn btn-secondary btn-icon" id="search-ctrl-prev" title="Previous Step (Key: Left Arrow)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </button>

                <button class="btn btn-primary" id="search-ctrl-play" title="Play / Pause (Key: Space)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Play</span>
                </button>

                <button class="btn btn-secondary btn-icon" id="search-ctrl-next" title="Next Step (Key: Right Arrow)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" y1="5" x2="19" y2="19"></line>
                  </svg>
                </button>
              </div>

              <!-- Scrubber -->
              <div class="controls-scrubber-group">
                <input type="range" id="search-ctrl-scrubber" class="range-slider" min="0" max="10" value="0" />
                <span class="step-counter-text" id="search-ctrl-step-text">Step 1 of 1</span>
              </div>

              <!-- Speed -->
              <div class="controls-speed-group">
                <span class="speed-label">Speed:</span>
                <input 
                  type="range" 
                  id="search-ctrl-speed" 
                  class="range-slider" 
                  min="50" 
                  max="1000" 
                  step="10" 
                  value="${userPrefs.animationSpeedMs || 450}" 
                  style="width: 100px;"
                />
              </div>
            </div>
          </div>

          <!-- Side Information Column -->
          <div class="visualizer-side-column">
            <!-- Comparisons Badge -->
            <div class="stat-card">
              <span class="stat-label">Comparisons Made</span>
              <span class="stat-value" id="search-comparisons" style="color: var(--secondary);">0</span>
            </div>

            <!-- Pseudocode Panel -->
            <div class="panel pseudocode-panel">
              <div class="panel-header">
                <span class="panel-title" style="font-size: var(--text-sm);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span>Searching Pseudocode</span>
                </span>
                <span class="badge badge-secondary badge-mono" id="search-active-line">Line 1</span>
              </div>
              <div class="pseudocode-content" id="search-pseudocode-container">
                <!-- Injected by renderer -->
              </div>
            </div>

            <!-- Theoretical Complexity Card -->
            <div class="panel" id="search-complexity-card">
              <div class="panel-header">
                <span class="panel-title" style="font-size: var(--text-sm);">
                  <span id="search-complexity-title">${algoMeta.name} Theory</span>
                </span>
              </div>
              <div class="panel-body" style="padding: var(--space-4);">
                <div class="complexity-grid">
                  <div class="complexity-item">
                    <span class="complexity-label">Best Time</span>
                    <span class="complexity-value" style="color: var(--success);">${algoMeta.complexities.best}</span>
                  </div>
                  <div class="complexity-item">
                    <span class="complexity-label">Average Time</span>
                    <span class="complexity-value" style="color: var(--warning);">${algoMeta.complexities.average}</span>
                  </div>
                  <div class="complexity-item">
                    <span class="complexity-label">Worst Time</span>
                    <span class="complexity-value" style="color: var(--danger);">${algoMeta.complexities.worst}</span>
                  </div>
                  <div class="complexity-item">
                    <span class="complexity-label">Space Complexity</span>
                    <span class="complexity-value" style="color: var(--secondary);">${algoMeta.complexities.space}</span>
                  </div>
                </div>

                <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); font-size: var(--text-xs); color: var(--muted);">
                  <span>Requirement: <strong style="color: var(--text);">${isBinary ? 'Sorted Array Required' : 'Works on Any Array'}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initVisualizerComponents(container);
    this.rebuildStepsAndRender(container);
  }

  initVisualizerComponents(container) {
    const stageEl = container.querySelector('#searching-stage');
    const stepExplanationEl = container.querySelector('#search-step-explanation');
    const pseudocodeEl = container.querySelector('#search-pseudocode-container');
    const comparisonsCounterEl = container.querySelector('#search-comparisons');
    const stepIndicatorEl = container.querySelector('#search-ctrl-step-text');
    const stepSliderEl = container.querySelector('#search-ctrl-scrubber');
    const searchResultBannerEl = container.querySelector('#search-result-banner');

    this.renderer = new VisualizerRenderer({
      stageEl,
      stepExplanationEl,
      pseudocodeEl,
      comparisonsCounterEl,
      stepIndicatorEl,
      stepSliderEl,
      searchResultBannerEl
    });

    const userPrefs = Storage.getPreferences();
    this.animController = new AnimationController(this.stepEngine, {
      speedMs: userPrefs.animationSpeedMs || 450
    });

    const playBtn = container.querySelector('#search-ctrl-play');
    const prevBtn = container.querySelector('#search-ctrl-prev');
    const nextBtn = container.querySelector('#search-ctrl-next');
    const resetBtn = container.querySelector('#search-ctrl-reset');
    const speedSlider = container.querySelector('#search-ctrl-speed');

    this.controls = new VisualizerControls(
      { playBtn, prevBtn, nextBtn, resetBtn, scrubber: stepSliderEl, speedSlider },
      this.stepEngine,
      this.animController
    );

    this.stepEngine.subscribe((step, meta) => {
      if (!step) return;
      this.renderer.renderSearchingCells(step.array, step.highlights, step.pointers || {});
      this.renderer.renderStepDescription(step.description);
      this.renderer.renderCounters(step.counters);
      this.renderer.renderStepProgress(meta.index, meta.total);
      this.renderer.renderSearchResult(step.result);

      const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
      this.renderer.renderPseudocode(algoMeta.pseudocode, step.codeLine);

      const activeBadge = container.querySelector('#search-active-line');
      if (activeBadge) activeBadge.textContent = `Line ${step.codeLine}`;

      this.controls.updateStepButtons(meta);

      if (meta.isComplete) {
        Storage.markAlgorithmCompleted(this.currentAlgoKey);
      }
    });

    this.animController.onStateChange((state) => {
      this.controls.updatePlayButton(state.isPlaying);
    });

    // Algorithm selector change
    const algoSelect = container.querySelector('#search-algo-select');
    algoSelect.addEventListener('change', (e) => {
      this.currentAlgoKey = e.target.value;
      this.animController.pause();
      this.checkSortedRequirement(container);
      this.updateMetadataUI(container);
      this.rebuildStepsAndRender(container);
    });

    // Sort Array Now action button
    const sortNowBtn = container.querySelector('#btn-sort-array-now');
    if (sortNowBtn) {
      sortNowBtn.addEventListener('click', () => {
        this.currentArray.sort((a, b) => a - b);
        const arrayInput = container.querySelector('#search-array-input');
        if (arrayInput) arrayInput.value = this.currentArray.join(', ');
        this.checkSortedRequirement(container);
        this.rebuildStepsAndRender(container);
      });
    }

    // Array input
    const arrayInput = container.querySelector('#search-array-input');
    const targetInput = container.querySelector('#search-target-input');
    const generateBtn = container.querySelector('#search-generate-btn');
    const countBadge = container.querySelector('#search-array-count');
    const errorAlert = container.querySelector('#search-validation-error');

    generateBtn.addEventListener('click', () => {
      const arr = generateRandomArray(10, 10, 95);
      if (this.currentAlgoKey === 'binarySearch') {
        arr.sort((a, b) => a - b);
      }
      this.currentArray = arr;
      arrayInput.value = arr.join(', ');
      countBadge.textContent = `${arr.length} items`;
      
      // Randomly pick a target from the array or a nearby number
      this.currentTarget = Math.random() > 0.3 
        ? arr[Math.floor(Math.random() * arr.length)] 
        : Math.floor(Math.random() * 90) + 10;
      targetInput.value = this.currentTarget;

      this.checkSortedRequirement(container);
      this.rebuildStepsAndRender(container);
    });

    arrayInput.addEventListener('change', () => {
      const res = Validation.parseArrayInput(arrayInput.value, 5, 16, 1, 100);
      if (!res.isValid) {
        errorAlert.textContent = res.error;
        errorAlert.style.display = 'block';
      } else {
        errorAlert.style.display = 'none';
        this.currentArray = res.data;
        countBadge.textContent = `${res.data.length} items`;
        this.checkSortedRequirement(container);
        this.rebuildStepsAndRender(container);
      }
    });

    targetInput.addEventListener('change', () => {
      const res = Validation.parseTargetInput(targetInput.value, 1, 100);
      if (!res.isValid) {
        errorAlert.textContent = res.error;
        errorAlert.style.display = 'block';
      } else {
        errorAlert.style.display = 'none';
        this.currentTarget = res.value;
        this.rebuildStepsAndRender(container);
      }
    });
  }

  checkSortedRequirement(container) {
    const isBinary = this.currentAlgoKey === 'binarySearch';
    const sorted = isSorted(this.currentArray);
    const banner = container.querySelector('#sorted-warning-banner');
    if (banner) {
      banner.style.display = isBinary && !sorted ? 'flex' : 'none';
    }
  }

  updateMetadataUI(container) {
    const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
    const compCard = container.querySelector('#search-complexity-card');
    if (compCard && algoMeta) {
      compCard.querySelector('#search-complexity-title').textContent = `${algoMeta.name} Theory`;
    }
  }

  rebuildStepsAndRender(container) {
    this.animController.pause();
    let steps;

    if (this.currentAlgoKey === 'binarySearch') {
      // If array is unsorted for binary search, ensure user is aware, but perform on current array or auto-prompt
      steps = generateBinarySearchSteps(this.currentArray, this.currentTarget);
    } else {
      steps = generateLinearSearchSteps(this.currentArray, this.currentTarget);
    }

    this.stepEngine.load(steps, this.currentArray);
  }

  destroy() {
    if (this.animController) this.animController.pause();
    if (this.controls) this.controls.destroy();
  }
}
