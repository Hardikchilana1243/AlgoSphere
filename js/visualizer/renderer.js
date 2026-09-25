/**
 * AlgoSphere - Visualizer Renderer
 * Renders vertical sorting bars, horizontal search cells, pointers, pseudocode highlighting, and telemetry.
 */

export class VisualizerRenderer {
  /**
   * @param {Object} elements
   */
  constructor(elements = {}) {
    this.stageEl = elements.stageEl;
    this.stepExplanationEl = elements.stepExplanationEl;
    this.pseudocodeEl = elements.pseudocodeEl;
    this.comparisonsCounterEl = elements.comparisonsCounterEl;
    this.swapsCounterEl = elements.swapsCounterEl;
    this.stepIndicatorEl = elements.stepIndicatorEl;
    this.stepSliderEl = elements.stepSliderEl;
    this.searchResultBannerEl = elements.searchResultBannerEl;
  }

  /**
   * Renders vertical sorting bars
   * @param {number[]} array
   * @param {Object} highlights
   */
  renderSortingBars(array, highlights = {}) {
    if (!this.stageEl) return;

    const maxVal = Math.max(...array, 1);
    const html = array.map((val, idx) => {
      const heightPercent = Math.max(12, Math.round((val / maxVal) * 88));
      const state = highlights[idx] || 'default';
      const stateClass = `state-${state}`;

      return `
        <div class="bar-wrapper" data-index="${idx}" title="arr[${idx}] = ${val}">
          <div class="bar-element ${stateClass}" style="height: ${heightPercent}%">
            <span class="bar-value">${val}</span>
          </div>
          <span class="bar-index">${idx}</span>
        </div>
      `;
    }).join('');

    this.stageEl.innerHTML = html;
  }

  /**
   * Renders horizontal search cells with pointers
   * @param {number[]} array
   * @param {Object} highlights
   * @param {Object} pointers
   */
  renderSearchingCells(array, highlights = {}, pointers = {}) {
    if (!this.stageEl) return;

    const html = `
      <div class="searching-cells-container">
        ${array.map((val, idx) => {
          const state = highlights[idx] || 'default';
          const stateClass = `state-${state}`;

          // Assemble pointer badges for this column
          const pointerBadges = [];
          if (pointers.low === idx) pointerBadges.push('<span class="pointer-badge pointer-low">Low</span>');
          if (pointers.mid === idx) pointerBadges.push('<span class="pointer-badge pointer-mid">Mid</span>');
          if (pointers.high === idx) pointerBadges.push('<span class="pointer-badge pointer-high">High</span>');
          if (pointers.current === idx) pointerBadges.push('<span class="pointer-badge pointer-current">Current</span>');

          return `
            <div class="search-cell-column" data-index="${idx}">
              <div class="pointer-slot-top">
                ${pointerBadges.join('')}
              </div>
              <div class="search-cell ${stateClass}">
                ${val}
              </div>
              <div class="search-cell-index">${idx}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.stageEl.innerHTML = html;
  }

  /**
   * Updates pseudocode lines and active highlight
   * @param {string[]} lines
   * @param {number} activeLineNumber (1-indexed)
   */
  renderPseudocode(lines, activeLineNumber = 1) {
    if (!this.pseudocodeEl) return;

    const html = lines.map((code, idx) => {
      const lineNum = idx + 1;
      const isActive = lineNum === activeLineNumber;
      return `
        <div class="code-line ${isActive ? 'active' : ''}" data-line="${lineNum}">
          <span class="code-line-num">${lineNum}</span>
          <span class="code-line-text">${escapeHtml(code)}</span>
        </div>
      `;
    }).join('');

    this.pseudocodeEl.innerHTML = html;

    // Smoothly scroll active line into view if panel is overflowing
    const activeEl = this.pseudocodeEl.querySelector('.code-line.active');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  /**
   * Updates step description banner
   * @param {string} text
   */
  renderStepDescription(text) {
    if (!this.stepExplanationEl) return;
    this.stepExplanationEl.innerHTML = `
      <span class="step-explanation-icon">ℹ</span>
      <span>${escapeHtml(text || 'Ready to step through algorithm execution.')}</span>
    `;
  }

  /**
   * Updates comparison and swap counters
   * @param {Object} counters
   */
  renderCounters(counters = { comparisons: 0, swaps: 0 }) {
    if (this.comparisonsCounterEl) {
      this.comparisonsCounterEl.textContent = counters.comparisons ?? 0;
    }
    if (this.swapsCounterEl) {
      this.swapsCounterEl.textContent = counters.swaps ?? 0;
    }
  }

  /**
   * Updates step progress text and slider
   * @param {number} currentStepIndex
   * @param {number} totalSteps
   */
  renderStepProgress(currentStepIndex, totalSteps) {
    const total = Math.max(1, totalSteps);
    if (this.stepIndicatorEl) {
      this.stepIndicatorEl.textContent = `Step ${currentStepIndex + 1} of ${total}`;
    }
    if (this.stepSliderEl) {
      this.stepSliderEl.max = total - 1;
      this.stepSliderEl.value = currentStepIndex;
    }
  }

  /**
   * Renders search result banner (found vs not found)
   * @param {Object|null} result
   */
  renderSearchResult(result) {
    if (!this.searchResultBannerEl) return;

    if (!result) {
      this.searchResultBannerEl.style.display = 'none';
      this.searchResultBannerEl.innerHTML = '';
      return;
    }

    this.searchResultBannerEl.style.display = 'block';
    if (result.found) {
      this.searchResultBannerEl.className = 'alert alert-success';
      this.searchResultBannerEl.innerHTML = `
        <strong>✓ Found!</strong> Target value <strong>${result.target}</strong> is located at index <strong>${result.index}</strong> (found in ${result.comparisons} comparison${result.comparisons > 1 ? 's' : ''}).
      `;
    } else {
      this.searchResultBannerEl.className = 'alert alert-danger';
      this.searchResultBannerEl.innerHTML = `
        <strong>✕ Target Not Found</strong> Target value <strong>${result.target}</strong> does not exist in this array (checked ${result.comparisons} elements).
      `;
    }
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
