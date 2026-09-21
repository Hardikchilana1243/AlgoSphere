/**
 * AlgoSphere - Sorting Visualizer Page Controller
 * Houses vertical bar visualizer, pseudocode highlighting, playback controls, and telemetry.
 */

import { ALGORITHM_METADATA } from '../data/algorithmMetadata.js';
import { generateBubbleSortSteps } from '../algorithms/sorting/bubbleSort.js';
import { generateSelectionSortSteps } from '../algorithms/sorting/selectionSort.js';
import { generateInsertionSortSteps } from '../algorithms/sorting/insertionSort.js';
import { generateMergeSortSteps } from '../algorithms/sorting/mergeSort.js';
import { generateQuickSortSteps } from '../algorithms/sorting/quickSort.js';
import { StepEngine } from '../visualizer/stepEngine.js';
import { VisualizerRenderer } from '../visualizer/renderer.js';
import { AnimationController } from '../visualizer/animationController.js';
import { VisualizerControls } from '../visualizer/controls.js';
import { Validation } from '../utils/validation.js';
import { 
  generateRandomArray, 
  generateNearlySortedArray, 
  generateReverseSortedArray, 
  generateFewUniqueArray 
} from '../utils/arrayUtils.js';
import { Storage } from '../utils/storage.js';

const SORTING_GENERATORS = {
  bubbleSort: generateBubbleSortSteps,
  selectionSort: generateSelectionSortSteps,
  insertionSort: generateInsertionSortSteps,
  mergeSort: generateMergeSortSteps,
  quickSort: generateQuickSortSteps
};

export class SortingPage {
  constructor() {
    this.currentAlgoKey = 'bubbleSort';
    this.currentArray = generateRandomArray(12);
    this.stepEngine = new StepEngine();
    this.renderer = null;
    this.animController = null;
    this.controls = null;
  }

  render(container, params = {}) {
    if (params.algo && SORTING_GENERATORS[params.algo]) {
      this.currentAlgoKey = params.algo;
    }

    const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
    const userPrefs = Storage.getPreferences();

    container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        <!-- Page Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text);">Sorting Visualizer</h1>
              <span class="badge badge-primary">Interactive Studio</span>
            </div>
            <p style="font-size: var(--text-sm); color: var(--muted); margin-top: 4px;">
              Observe comparison passes, data swaps, divide-and-conquer boundaries, and step-by-step code execution.
            </p>
          </div>

          <!-- Algorithm Selector Dropdown -->
          <div style="min-width: 220px;">
            <label for="algo-select" class="form-label">Algorithm</label>
            <select id="algo-select" class="form-select">
              <option value="bubbleSort" ${this.currentAlgoKey === 'bubbleSort' ? 'selected' : ''}>Bubble Sort</option>
              <option value="selectionSort" ${this.currentAlgoKey === 'selectionSort' ? 'selected' : ''}>Selection Sort</option>
              <option value="insertionSort" ${this.currentAlgoKey === 'insertionSort' ? 'selected' : ''}>Insertion Sort</option>
              <option value="mergeSort" ${this.currentAlgoKey === 'mergeSort' ? 'selected' : ''}>Merge Sort</option>
              <option value="quickSort" ${this.currentAlgoKey === 'quickSort' ? 'selected' : ''}>Quick Sort</option>
            </select>
          </div>
        </div>

        <!-- Input & Dataset Controls Toolbar -->
        <div class="panel" style="padding: var(--space-4);">
          <div style="display: grid; grid-template-columns: 1fr auto auto; gap: var(--space-3); align-items: flex-end;">
            <div class="form-group" style="margin-bottom: 0;">
              <label for="array-input" class="form-label">
                <span>Custom Array (Comma-separated numbers 1–100, 5–25 items)</span>
                <span id="array-count-badge" style="font-family: var(--font-mono); color: var(--secondary);">12 items</span>
              </label>
              <input 
                type="text" 
                id="array-input" 
                class="form-input" 
                value="${this.currentArray.join(', ')}" 
                placeholder="e.g. 45, 23, 78, 12, 56, 89, 34"
              />
            </div>

            <div class="form-group" style="margin-bottom: 0; min-width: 150px;">
              <label for="preset-select" class="form-label">Preset</label>
              <select id="preset-select" class="form-select">
                <option value="random">Random</option>
                <option value="nearlySorted">Nearly Sorted</option>
                <option value="reverse">Reverse Sorted</option>
                <option value="fewUnique">Few Unique</option>
              </select>
            </div>

            <button class="btn btn-secondary" id="generate-array-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
              </svg>
              <span>Generate Array</span>
            </button>
          </div>

          <!-- Error Alert Container -->
          <div id="validation-error-alert" class="alert alert-danger" style="display: none; margin-top: var(--space-3);"></div>
        </div>

        <!-- Main Workspace Split: Stage + Side Panel -->
        <div class="visualizer-workspace">
          <!-- Main Visualization Column -->
          <div class="visualizer-main-column">
            <!-- Stage Canvas -->
            <div class="stage-container">
              <!-- Visualizer Legend -->
              <div class="visualizer-legend">
                <div class="legend-item">
                  <span class="legend-chip default"></span>
                  <span>Default</span>
                </div>
                <div class="legend-item">
                  <span class="legend-chip comparing"></span>
                  <span>Active Comparison</span>
                </div>
                <div class="legend-item">
                  <span class="legend-chip current"></span>
                  <span>Current Index</span>
                </div>
                <div class="legend-item">
                  <span class="legend-chip moving"></span>
                  <span>Moving / Swapping</span>
                </div>
                <div class="legend-item">
                  <span class="legend-chip sorted"></span>
                  <span>Sorted</span>
                </div>
              </div>

              <!-- Vertical Bars Stage -->
              <div class="sorting-stage" id="sorting-stage">
                <!-- Injected by renderer -->
              </div>

              <!-- Step Explanation Box -->
              <div class="step-explanation-box" id="step-explanation-box">
                <span class="step-explanation-icon">ℹ</span>
                <span>Ready to start sorting visualization.</span>
              </div>
            </div>

            <!-- Playback Controls Bar -->
            <div class="visualizer-controls">
              <div class="controls-button-group">
                <button class="btn btn-secondary btn-icon" id="ctrl-reset" title="Reset to Initial State (Key: R)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                  </svg>
                </button>

                <button class="btn btn-secondary btn-icon" id="ctrl-prev" title="Previous Step (Key: Left Arrow)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20"></polygon>
                    <line x1="5" y1="19" x2="5" y2="5"></line>
                  </svg>
                </button>

                <button class="btn btn-primary" id="ctrl-play" title="Play / Pause (Key: Space)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <span>Play</span>
                </button>

                <button class="btn btn-secondary btn-icon" id="ctrl-next" title="Next Step (Key: Right Arrow)">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4"></polygon>
                    <line x1="19" y1="5" x2="19" y2="19"></line>
                  </svg>
                </button>
              </div>

              <!-- Step Progress Scrubber -->
              <div class="controls-scrubber-group">
                <input type="range" id="ctrl-scrubber" class="range-slider" min="0" max="10" value="0" />
                <span class="step-counter-text" id="ctrl-step-text">Step 1 of 1</span>
              </div>

              <!-- Speed Slider -->
              <div class="controls-speed-group">
                <span class="speed-label">Speed:</span>
                <input 
                  type="range" 
                  id="ctrl-speed" 
                  class="range-slider" 
                  min="30" 
                  max="1000" 
                  step="10" 
                  value="${userPrefs.animationSpeedMs || 350}" 
                  style="width: 100px;"
                  title="Playback delay in milliseconds"
                />
              </div>
            </div>
          </div>

          <!-- Side Information Column (Metrics, Pseudocode, Complexity) -->
          <div class="visualizer-side-column">
            <!-- Telemetry Cards -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
              <div class="stat-card">
                <span class="stat-label">Comparisons</span>
                <span class="stat-value" id="metric-comparisons" style="color: var(--secondary);">0</span>
              </div>
              <div class="stat-card">
                <span class="stat-label">Swaps / Writes</span>
                <span class="stat-value" id="metric-swaps" style="color: var(--danger);">0</span>
              </div>
            </div>

            <!-- Pseudocode Panel -->
            <div class="panel pseudocode-panel">
              <div class="panel-header">
                <span class="panel-title" style="font-size: var(--text-sm);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  <span>Synchronized Pseudocode</span>
                </span>
                <span class="badge badge-primary badge-mono" id="active-line-badge">Line 1</span>
              </div>
              <div class="pseudocode-content" id="pseudocode-container">
                <!-- Injected by renderer -->
              </div>
            </div>

            <!-- Algorithm Theoretical Complexity Card -->
            <div class="panel" id="complexity-card">
              <div class="panel-header">
                <span class="panel-title" style="font-size: var(--text-sm);">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 14 14"></polyline>
                  </svg>
                  <span id="complexity-title">${algoMeta.name} Theory</span>
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

                <div style="margin-top: var(--space-3); padding-top: var(--space-3); border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--muted);">
                  <span>Stability: <strong style="color: var(--text);">${algoMeta.complexities.stability}</strong></span>
                  <span>In-Place: <strong style="color: var(--text);">${algoMeta.complexities.inPlace}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.initVisualizerComponents(container);
    this.rebuildStepsAndRender();
  }

  initVisualizerComponents(container) {
    const stageEl = container.querySelector('#sorting-stage');
    const stepExplanationEl = container.querySelector('#step-explanation-box');
    const pseudocodeEl = container.querySelector('#pseudocode-container');
    const comparisonsCounterEl = container.querySelector('#metric-comparisons');
    const swapsCounterEl = container.querySelector('#metric-swaps');
    const stepIndicatorEl = container.querySelector('#ctrl-step-text');
    const stepSliderEl = container.querySelector('#ctrl-scrubber');

    this.renderer = new VisualizerRenderer({
      stageEl,
      stepExplanationEl,
      pseudocodeEl,
      comparisonsCounterEl,
      swapsCounterEl,
      stepIndicatorEl,
      stepSliderEl
    });

    const userPrefs = Storage.getPreferences();
    this.animController = new AnimationController(this.stepEngine, {
      speedMs: userPrefs.animationSpeedMs || 350
    });

    const playBtn = container.querySelector('#ctrl-play');
    const prevBtn = container.querySelector('#ctrl-prev');
    const nextBtn = container.querySelector('#ctrl-next');
    const resetBtn = container.querySelector('#ctrl-reset');
    const speedSlider = container.querySelector('#ctrl-speed');

    this.controls = new VisualizerControls(
      { playBtn, prevBtn, nextBtn, resetBtn, scrubber: stepSliderEl, speedSlider },
      this.stepEngine,
      this.animController
    );

    // Subscribe to engine changes
    this.stepEngine.subscribe((step, meta) => {
      if (!step) return;
      this.renderer.renderSortingBars(step.array, step.highlights);
      this.renderer.renderStepDescription(step.description);
      this.renderer.renderCounters(step.counters);
      this.renderer.renderStepProgress(meta.index, meta.total);

      const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
      this.renderer.renderPseudocode(algoMeta.pseudocode, step.codeLine);

      const activeBadge = container.querySelector('#active-line-badge');
      if (activeBadge) activeBadge.textContent = `Line ${step.codeLine}`;

      this.controls.updateStepButtons(meta);

      if (meta.isComplete) {
        Storage.markAlgorithmCompleted(this.currentAlgoKey);
      }
    });

    // Subscribe to animation state changes
    this.animController.onStateChange((state) => {
      this.controls.updatePlayButton(state.isPlaying);
    });

    // Bind algorithm dropdown
    const algoSelect = container.querySelector('#algo-select');
    algoSelect.addEventListener('change', (e) => {
      this.currentAlgoKey = e.target.value;
      this.animController.pause();
      this.updateAlgorithmMetaUI(container);
      this.rebuildStepsAndRender();
    });

    // Bind Array Input and presets
    const arrayInput = container.querySelector('#array-input');
    const presetSelect = container.querySelector('#preset-select');
    const generateBtn = container.querySelector('#generate-array-btn');
    const countBadge = container.querySelector('#array-count-badge');
    const errorAlert = container.querySelector('#validation-error-alert');

    const updateArrayFromData = (arr) => {
      this.currentArray = arr;
      arrayInput.value = arr.join(', ');
      countBadge.textContent = `${arr.length} items`;
      errorAlert.style.display = 'none';
      this.rebuildStepsAndRender();
    };

    generateBtn.addEventListener('click', () => {
      const preset = presetSelect.value;
      let newArr;
      if (preset === 'nearlySorted') newArr = generateNearlySortedArray(12);
      else if (preset === 'reverse') newArr = generateReverseSortedArray(12);
      else if (preset === 'fewUnique') newArr = generateFewUniqueArray(12);
      else newArr = generateRandomArray(12);
      updateArrayFromData(newArr);
    });

    arrayInput.addEventListener('change', () => {
      const val = arrayInput.value;
      const res = Validation.parseArrayInput(val, 5, 25, 1, 100);
      if (!res.isValid) {
        errorAlert.textContent = res.error;
        errorAlert.style.display = 'block';
      } else {
        errorAlert.style.display = 'none';
        this.currentArray = res.data;
        countBadge.textContent = `${res.data.length} items`;
        this.rebuildStepsAndRender();
      }
    });
  }

  updateAlgorithmMetaUI(container) {
    const algoMeta = ALGORITHM_METADATA[this.currentAlgoKey];
    const compCard = container.querySelector('#complexity-card');
    if (compCard && algoMeta) {
      compCard.querySelector('#complexity-title').textContent = `${algoMeta.name} Theory`;
      compCard.querySelector('.complexity-grid').innerHTML = `
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
      `;
    }
  }

  rebuildStepsAndRender() {
    this.animController.pause();
    const generator = SORTING_GENERATORS[this.currentAlgoKey];
    if (!generator) return;

    const steps = generator([...this.currentArray]);
    this.stepEngine.load(steps, this.currentArray);
  }

  destroy() {
    if (this.animController) this.animController.pause();
    if (this.controls) this.controls.destroy();
  }
}
