/**
 * AlgoSphere - Practice Sets Page Controller
 * Complete CRUD operations for custom algorithm datasets using browser localStorage.
 */

import { Storage } from '../utils/storage.js';
import { Validation } from '../utils/validation.js';
import { ALGORITHM_METADATA } from '../data/algorithmMetadata.js';
import { State } from '../state.js';

/**
 * Escapes HTML characters to prevent XSS vulnerabilities
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Formats ISO date string into friendly localized timestamp
 * @param {string} isoString
 * @returns {string}
 */
function formatDate(isoString) {
  if (!isoString) return 'Unknown';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Unknown';
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return 'Unknown';
  }
}

export class PracticeSetsPage {
  constructor() {
    this.container = null;
    this.searchQuery = '';
    this.algorithmFilter = 'all';
    this.activeEditId = null;
    this.activeDeleteId = null;
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
  }

  render(container) {
    this.container = container;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        <!-- Page Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-2);">
              <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text);">Practice Sets</h1>
              <span class="badge badge-primary">CRUD + localStorage</span>
            </div>
            <p style="font-size: var(--text-sm); color: var(--muted); margin-top: 4px;">
              Create, view, edit, visualize, and manage custom algorithm test arrays stored persistently in your browser.
            </p>
          </div>

          <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap;">
            <button class="btn btn-primary" id="btn-open-create-modal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>New Practice Set</span>
            </button>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="panel" style="padding: var(--space-4);">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
            <div style="display: flex; align-items: center; gap: var(--space-3); flex: 1; min-width: 260px; max-width: 600px;">
              <!-- Search Input -->
              <div style="flex: 1; position: relative;">
                <input 
                  type="text" 
                  id="practice-search-input" 
                  class="form-input" 
                  placeholder="Search practice sets by name..."
                  value="${escapeHtml(this.searchQuery)}"
                  style="padding-left: 36px;"
                />
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); pointer-events: none;">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              <!-- Filter Dropdown -->
              <div style="min-width: 170px;">
                <select id="practice-algo-filter" class="form-select">
                  <option value="all">All Algorithms</option>
                  <optgroup label="Sorting Algorithms">
                    <option value="bubbleSort">Bubble Sort</option>
                    <option value="selectionSort">Selection Sort</option>
                    <option value="insertionSort">Insertion Sort</option>
                    <option value="mergeSort">Merge Sort</option>
                    <option value="quickSort">Quick Sort</option>
                  </optgroup>
                  <optgroup label="Searching Algorithms">
                    <option value="linearSearch">Linear Search</option>
                    <option value="binarySearch">Binary Search</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <!-- Set Counter -->
            <div id="practice-counter-wrapper">
              <span id="practice-sets-counter" class="badge badge-muted badge-mono">Loading...</span>
            </div>
          </div>
        </div>

        <!-- Main Cards List Viewport -->
        <div id="practice-sets-list-container">
          <!-- Dynamically populated by renderCardsList() -->
        </div>
      </div>

      <!-- Create / Edit Practice Set Modal -->
      <div id="practice-set-modal" class="modal-backdrop" aria-hidden="true" role="dialog" aria-labelledby="practice-modal-title">
        <div class="modal-dialog">
          <div class="modal-header">
            <h2 id="practice-modal-title" class="modal-title">
              <span id="modal-title-text">New Practice Set</span>
            </h2>
            <button class="modal-close-btn" id="btn-close-modal" aria-label="Close dialog">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <form id="practice-set-form">
            <div class="modal-body">
              <!-- Name Input -->
              <div class="form-group">
                <label for="input-practice-name" class="form-label">
                  <span>Practice Set Name</span>
                  <span style="font-size: 10px; color: var(--muted-dark);">2–50 chars</span>
                </label>
                <input 
                  type="text" 
                  id="input-practice-name" 
                  class="form-input" 
                  placeholder="e.g. My Sorting Test" 
                  maxlength="50" 
                  required 
                />
              </div>

              <!-- Algorithm Selection -->
              <div class="form-group">
                <label for="select-practice-algo" class="form-label">
                  <span>Target Algorithm</span>
                </label>
                <select id="select-practice-algo" class="form-select" required>
                  <optgroup label="Sorting Algorithms">
                    <option value="bubbleSort">Bubble Sort (O(n²))</option>
                    <option value="selectionSort">Selection Sort (O(n²))</option>
                    <option value="insertionSort">Insertion Sort (O(n²))</option>
                    <option value="mergeSort">Merge Sort (O(n log n))</option>
                    <option value="quickSort">Quick Sort (O(n log n))</option>
                  </optgroup>
                  <optgroup label="Searching Algorithms">
                    <option value="linearSearch">Linear Search (O(n))</option>
                    <option value="binarySearch">Binary Search (O(log n))</option>
                  </optgroup>
                </select>
              </div>

              <!-- Array Input -->
              <div class="form-group">
                <label for="input-practice-array" class="form-label">
                  <span>Integer Array (1–25 items, values 1–100)</span>
                  <span id="modal-array-count" style="font-family: var(--font-mono); color: var(--secondary);">0 items</span>
                </label>
                <input 
                  type="text" 
                  id="input-practice-array" 
                  class="form-input" 
                  placeholder="e.g. 45, 23, 78, 12, 56" 
                  required 
                />
                
                <!-- Quick Preset Pills -->
                <div style="display: flex; align-items: center; gap: var(--space-2); margin-top: 4px; flex-wrap: wrap;">
                  <span style="font-size: 11px; color: var(--muted);">Quick fill:</span>
                  <button type="button" class="btn btn-ghost btn-sm" id="preset-sample-1" style="padding: 2px 6px; font-size: 11px; font-family: var(--font-mono);">
                    5, 3, 8, 1, 2
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm" id="preset-sample-2" style="padding: 2px 6px; font-size: 11px; font-family: var(--font-mono);">
                    10, 25, 42, 68, 90
                  </button>
                  <button type="button" class="btn btn-ghost btn-sm" id="preset-sample-3" style="padding: 2px 6px; font-size: 11px; font-family: var(--font-mono);">
                    Random 7
                  </button>
                </div>
              </div>

              <!-- Inline Modal Validation Alert -->
              <div id="practice-modal-error" class="alert alert-danger" style="display: none;"></div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-outline" id="btn-cancel-modal">Cancel</button>
              <button type="submit" class="btn btn-primary" id="btn-submit-modal">
                <span id="btn-submit-text">Save Practice Set</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div id="delete-confirm-modal" class="modal-backdrop" aria-hidden="true" role="dialog" aria-labelledby="delete-modal-title">
        <div class="modal-dialog" style="max-width: 440px;">
          <div class="modal-header">
            <h2 id="delete-modal-title" class="modal-title" style="color: var(--danger);">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
              <span>Delete Practice Set</span>
            </h2>
            <button class="modal-close-btn" id="btn-close-delete-modal" aria-label="Close dialog">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <p style="font-size: var(--text-sm); color: var(--text); line-height: 1.6;">
              Are you sure you want to delete <strong id="delete-set-name-target" style="color: var(--warning);">this practice set</strong>?
            </p>
            <p style="font-size: var(--text-xs); color: var(--muted); line-height: 1.5;">
              This record will be permanently deleted from your browser's localStorage. This action cannot be undone.
            </p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-delete">Cancel</button>
            <button type="button" class="btn btn-danger" id="btn-confirm-delete">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Confirm Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.loadAndRenderSets();
  }

  bindEvents() {
    // Top Action Button
    const newBtn = this.container.querySelector('#btn-open-create-modal');
    if (newBtn) {
      newBtn.addEventListener('click', () => this.openCreateModal());
    }

    // Search Input
    const searchInput = this.container.querySelector('#practice-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        this.loadAndRenderSets();
      });
    }

    // Filter Dropdown
    const filterSelect = this.container.querySelector('#practice-algo-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.algorithmFilter = e.target.value;
        this.loadAndRenderSets();
      });
    }

    // Modal Events
    const modalBackdrop = this.container.querySelector('#practice-set-modal');
    const closeBtn = this.container.querySelector('#btn-close-modal');
    const cancelBtn = this.container.querySelector('#btn-cancel-modal');
    const form = this.container.querySelector('#practice-set-form');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) this.closeModal();
      });
    }
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Quick Fill Presets
    const sample1 = this.container.querySelector('#preset-sample-1');
    const sample2 = this.container.querySelector('#preset-sample-2');
    const sample3 = this.container.querySelector('#preset-sample-3');
    const arrayInput = this.container.querySelector('#input-practice-array');

    if (sample1 && arrayInput) {
      sample1.addEventListener('click', () => {
        arrayInput.value = '5, 3, 8, 1, 2';
        this.updateModalArrayCount();
      });
    }
    if (sample2 && arrayInput) {
      sample2.addEventListener('click', () => {
        arrayInput.value = '10, 25, 42, 68, 90';
        this.updateModalArrayCount();
      });
    }
    if (sample3 && arrayInput) {
      sample3.addEventListener('click', () => {
        const rand = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);
        arrayInput.value = rand.join(', ');
        this.updateModalArrayCount();
      });
    }

    if (arrayInput) {
      arrayInput.addEventListener('input', () => this.updateModalArrayCount());
    }

    // Delete Modal Events
    const deleteModalBackdrop = this.container.querySelector('#delete-confirm-modal');
    const closeDeleteBtn = this.container.querySelector('#btn-close-delete-modal');
    const cancelDeleteBtn = this.container.querySelector('#btn-cancel-delete');
    const confirmDeleteBtn = this.container.querySelector('#btn-confirm-delete');

    if (closeDeleteBtn) closeDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
    if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => this.closeDeleteModal());
    if (deleteModalBackdrop) {
      deleteModalBackdrop.addEventListener('click', (e) => {
        if (e.target === deleteModalBackdrop) this.closeDeleteModal();
      });
    }
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', () => this.handleConfirmDelete());
    }

    // Delegate Card Action Buttons (Visualize, Edit, Delete)
    const listContainer = this.container.querySelector('#practice-sets-list-container');
    if (listContainer) {
      listContainer.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('[data-action]');
        if (!targetBtn) return;

        const action = targetBtn.getAttribute('data-action');
        const id = targetBtn.getAttribute('data-id');

        if (action === 'visualize') {
          this.handleVisualize(id);
        } else if (action === 'edit') {
          this.openEditModal(id);
        } else if (action === 'delete') {
          this.openDeleteModal(id);
        } else if (action === 'create-first') {
          this.openCreateModal();
        }
      });
    }

    // Keyboard Accessibility (Escape to close modals)
    document.addEventListener('keydown', this.boundHandleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.closeModal();
      this.closeDeleteModal();
    }
  }

  updateModalArrayCount() {
    const arrayInput = this.container.querySelector('#input-practice-array');
    const countBadge = this.container.querySelector('#modal-array-count');
    if (!arrayInput || !countBadge) return;

    const parts = arrayInput.value.split(/[\s,]+/).filter(Boolean);
    countBadge.textContent = `${parts.length} item${parts.length === 1 ? '' : 's'}`;
  }

  loadAndRenderSets() {
    const allSets = Storage.getPracticeSets();
    const listContainer = this.container.querySelector('#practice-sets-list-container');
    const counterBadge = this.container.querySelector('#practice-sets-counter');
    if (!listContainer) return;

    // Filter sets based on search and algorithm
    let filteredSets = allSets;

    if (this.algorithmFilter !== 'all') {
      filteredSets = filteredSets.filter(s => s && s.algorithm === this.algorithmFilter);
    }

    if (this.searchQuery) {
      filteredSets = filteredSets.filter(s => 
        s && typeof s.name === 'string' && s.name.toLowerCase().includes(this.searchQuery)
      );
    }

    // Update counter badge
    if (counterBadge) {
      if (allSets.length === 0) {
        counterBadge.textContent = '0 sets';
      } else if (filteredSets.length === allSets.length) {
        counterBadge.textContent = `${allSets.length} set${allSets.length === 1 ? '' : 's'}`;
      } else {
        counterBadge.textContent = `Showing ${filteredSets.length} of ${allSets.length} sets`;
      }
    }

    // Empty state 1: No practice sets exist in localStorage at all
    if (allSets.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state-panel">
          <div class="empty-state-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </div>
          <h2 class="empty-state-title">No practice sets yet</h2>
          <p class="empty-state-text">
            Create your first custom practice array to test sorting passes or search targets in the interactive studio.
          </p>
          <button class="btn btn-primary" data-action="create-first" id="btn-empty-create">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Create Your First Practice Set</span>
          </button>
        </div>
      `;
      return;
    }

    // Empty state 2: Search or filter resulted in 0 matches
    if (filteredSets.length === 0) {
      listContainer.innerHTML = `
        <div class="empty-state-panel" style="padding: var(--space-8) var(--space-4);">
          <div class="empty-state-icon" style="color: var(--warning);">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h2 class="empty-state-title" style="font-size: var(--text-md);">No matching practice sets found</h2>
          <p class="empty-state-text" style="font-size: var(--text-xs);">
            No records matched your search query or algorithm filter. Try adjusting your query or reset the filter.
          </p>
          <button class="btn btn-secondary btn-sm" id="btn-reset-filters">
            <span>Reset Search & Filter</span>
          </button>
        </div>
      `;

      const resetBtn = listContainer.querySelector('#btn-reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          this.searchQuery = '';
          this.algorithmFilter = 'all';
          const searchInput = this.container.querySelector('#practice-search-input');
          const filterSelect = this.container.querySelector('#practice-algo-filter');
          if (searchInput) searchInput.value = '';
          if (filterSelect) filterSelect.value = 'all';
          this.loadAndRenderSets();
        });
      }
      return;
    }

    // Render Cards Grid
    listContainer.innerHTML = `
      <div class="practice-sets-grid">
        ${filteredSets.map(set => this.renderPracticeCard(set)).join('')}
      </div>
    `;
  }

  renderPracticeCard(set) {
    const meta = ALGORITHM_METADATA[set.algorithm] || {
      name: set.algorithm,
      category: 'sorting'
    };

    const isSorting = meta.category === 'sorting';
    const badgeClass = isSorting ? 'badge-primary' : 'badge-secondary';
    const chipsHtml = Array.isArray(set.array)
      ? set.array.map(num => `<span class="array-chip">${num}</span>`).join('')
      : '';

    const safeName = escapeHtml(set.name);
    const dateFormatted = formatDate(set.updatedAt || set.createdAt);

    return `
      <div class="practice-card" data-card-id="${set.id}">
        <!-- Card Header -->
        <div class="practice-card-header">
          <div class="practice-card-title-group">
            <h3 class="practice-card-title" title="${safeName}">${safeName}</h3>
            <div class="practice-card-meta">
              <span class="badge ${badgeClass}">${meta.name}</span>
              <span style="font-size: 11px; color: var(--muted);">${set.array ? set.array.length : 0} items</span>
            </div>
          </div>
        </div>

        <!-- Card Body: Array Chips Preview -->
        <div class="practice-card-body">
          <div class="array-preview-label">
            <span>Array Preview</span>
            <span style="font-family: var(--font-mono); font-size: 10px; color: var(--muted-dark);">${dateFormatted}</span>
          </div>
          <div class="array-chips-container" title="[${set.array ? set.array.join(', ') : ''}]">
            ${chipsHtml}
          </div>
        </div>

        <!-- Card Footer Actions -->
        <div class="practice-card-actions">
          <button 
            class="btn btn-primary btn-sm" 
            data-action="visualize" 
            data-id="${set.id}"
            title="Load this array into ${meta.name} visualizer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            <span>Visualize</span>
          </button>

          <div class="practice-card-actions-group">
            <button 
              class="btn btn-secondary btn-sm" 
              data-action="edit" 
              data-id="${set.id}"
              title="Edit name, algorithm, or array"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Edit</span>
            </button>

            <button 
              class="btn btn-danger btn-sm" 
              data-action="delete" 
              data-id="${set.id}"
              title="Delete practice set"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // Modal Management: Create & Edit
  // ==========================================

  openCreateModal() {
    this.activeEditId = null;
    const modalBackdrop = this.container.querySelector('#practice-set-modal');
    const modalTitleText = this.container.querySelector('#modal-title-text');
    const submitBtnText = this.container.querySelector('#btn-submit-text');
    const nameInput = this.container.querySelector('#input-practice-name');
    const algoSelect = this.container.querySelector('#select-practice-algo');
    const arrayInput = this.container.querySelector('#input-practice-array');
    const errorEl = this.container.querySelector('#practice-modal-error');

    if (modalTitleText) modalTitleText.textContent = 'Create New Practice Set';
    if (submitBtnText) submitBtnText.textContent = 'Create Practice Set';
    if (nameInput) nameInput.value = '';
    if (algoSelect) algoSelect.value = 'bubbleSort';
    if (arrayInput) arrayInput.value = '45, 23, 78, 12, 56';
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }

    this.updateModalArrayCount();

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
    }

    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 100);
  }

  openEditModal(id) {
    const set = Storage.getPracticeSetById(id);
    if (!set) {
      State.showToast('Selected practice set could not be found.', 'danger');
      this.loadAndRenderSets();
      return;
    }

    this.activeEditId = id;
    const modalBackdrop = this.container.querySelector('#practice-set-modal');
    const modalTitleText = this.container.querySelector('#modal-title-text');
    const submitBtnText = this.container.querySelector('#btn-submit-text');
    const nameInput = this.container.querySelector('#input-practice-name');
    const algoSelect = this.container.querySelector('#select-practice-algo');
    const arrayInput = this.container.querySelector('#input-practice-array');
    const errorEl = this.container.querySelector('#practice-modal-error');

    if (modalTitleText) modalTitleText.textContent = `Edit Practice Set: ${set.name}`;
    if (submitBtnText) submitBtnText.textContent = 'Save Changes';
    if (nameInput) nameInput.value = set.name || '';
    if (algoSelect) algoSelect.value = set.algorithm || 'bubbleSort';
    if (arrayInput) arrayInput.value = Array.isArray(set.array) ? set.array.join(', ') : '';
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
    }

    this.updateModalArrayCount();

    if (modalBackdrop) {
      modalBackdrop.classList.add('open');
      modalBackdrop.setAttribute('aria-hidden', 'false');
    }

    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 100);
  }

  closeModal() {
    const modalBackdrop = this.container.querySelector('#practice-set-modal');
    if (modalBackdrop) {
      modalBackdrop.classList.remove('open');
      modalBackdrop.setAttribute('aria-hidden', 'true');
    }
    this.activeEditId = null;
  }

  handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = this.container.querySelector('#input-practice-name');
    const algoSelect = this.container.querySelector('#select-practice-algo');
    const arrayInput = this.container.querySelector('#input-practice-array');
    const errorEl = this.container.querySelector('#practice-modal-error');

    const nameVal = nameInput ? nameInput.value : '';
    const algoVal = algoSelect ? algoSelect.value : '';
    const arrayVal = arrayInput ? arrayInput.value : '';

    const existingSets = Storage.getPracticeSets();
    const validationResult = Validation.validatePracticeSet(
      { name: nameVal, algorithm: algoVal, array: arrayVal },
      existingSets,
      this.activeEditId
    );

    if (!validationResult.isValid) {
      if (errorEl) {
        errorEl.textContent = validationResult.error;
        errorEl.style.display = 'flex';
      }
      return;
    }

    const cleanData = validationResult.data;

    if (this.activeEditId) {
      // UPDATE Operation
      const updated = Storage.updatePracticeSet(this.activeEditId, cleanData);
      if (updated) {
        State.showToast(`Updated "${cleanData.name}" successfully!`, 'success');
      } else {
        State.showToast('Unable to update practice set: item was not found.', 'danger');
      }
    } else {
      // CREATE Operation
      Storage.createPracticeSet(cleanData);
      State.showToast(`Practice set "${cleanData.name}" created!`, 'success');
    }

    this.closeModal();
    this.loadAndRenderSets();
  }

  // ==========================================
  // Modal Management: Delete
  // ==========================================

  openDeleteModal(id) {
    const set = Storage.getPracticeSetById(id);
    if (!set) {
      State.showToast('Selected practice set could not be found.', 'danger');
      this.loadAndRenderSets();
      return;
    }

    this.activeDeleteId = id;
    const deleteModalBackdrop = this.container.querySelector('#delete-confirm-modal');
    const targetNameEl = this.container.querySelector('#delete-set-name-target');

    if (targetNameEl) {
      targetNameEl.textContent = `"${set.name}"`;
    }

    if (deleteModalBackdrop) {
      deleteModalBackdrop.classList.add('open');
      deleteModalBackdrop.setAttribute('aria-hidden', 'false');
    }
  }

  closeDeleteModal() {
    const deleteModalBackdrop = this.container.querySelector('#delete-confirm-modal');
    if (deleteModalBackdrop) {
      deleteModalBackdrop.classList.remove('open');
      deleteModalBackdrop.setAttribute('aria-hidden', 'true');
    }
    this.activeDeleteId = null;
  }

  handleConfirmDelete() {
    if (!this.activeDeleteId) return;

    const set = Storage.getPracticeSetById(this.activeDeleteId);
    const setName = set ? set.name : 'Practice set';

    const success = Storage.deletePracticeSet(this.activeDeleteId);
    this.closeDeleteModal();

    if (success) {
      State.showToast(`Deleted "${setName}"`, 'info');
    } else {
      State.showToast('Failed to delete practice set.', 'danger');
    }

    this.loadAndRenderSets();
  }

  // ==========================================
  // Visualize Action Integration
  // ==========================================

  handleVisualize(id) {
    const set = Storage.getPracticeSetById(id);
    if (!set) {
      State.showToast('Practice set could not be found.', 'danger');
      return;
    }

    const meta = ALGORITHM_METADATA[set.algorithm];
    const category = meta ? meta.category : 'sorting';

    if (category === 'searching') {
      window.location.hash = `searching?algo=${set.algorithm}&id=${set.id}`;
    } else {
      window.location.hash = `sorting?algo=${set.algorithm}&id=${set.id}`;
    }
  }

  destroy() {
    document.removeEventListener('keydown', this.boundHandleKeyDown);
  }
}
