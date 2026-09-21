/**
 * AlgoSphere - Settings Page Controller
 * Dark theme palette preview, animation speed preferences, reduced motion toggle, and local preference reset.
 */

import { Storage } from '../utils/storage.js';
import { State } from '../state.js';

export function renderSettings(container) {
  const currentPrefs = Storage.getPreferences();

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-8); max-width: 900px;">
      <!-- Header -->
      <div>
        <div style="display: flex; align-items: center; gap: var(--space-2);">
          <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text);">Studio Settings</h1>
          <span class="badge badge-primary">Preferences</span>
        </div>
        <p style="font-size: var(--text-sm); color: var(--muted); margin-top: 4px;">
          Configure visualizer playback defaults, accessibility preferences, and review theme color tokens.
        </p>
      </div>

      <!-- Theme Palette Specification Section -->
      <section class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-4);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">Theme: Dark Developer Studio</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">
            Curated SaaS color tokens: deep navy surfaces, restrained violet accents, and semantic algorithm state colors.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--space-3);">
          ${renderColorSwatch('--bg', '#0B1020', 'Canvas BG')}
          ${renderColorSwatch('--sidebar', '#0E1428', 'Sidebar')}
          ${renderColorSwatch('--panel', '#121A30', 'Surface')}
          ${renderColorSwatch('--panel-elevated', '#18223B', 'Elevated')}
          ${renderColorSwatch('--border', '#28324D', 'Border')}
          ${renderColorSwatch('--primary', '#8B5CF6', 'Primary Accent')}
          ${renderColorSwatch('--primary-hover', '#A78BFA', 'Hover Violet')}
          ${renderColorSwatch('--secondary', '#60A5FA', 'Secondary Blue')}
          ${renderColorSwatch('--text', '#F1F5F9', 'Text Base')}
          ${renderColorSwatch('--muted', '#94A3B8', 'Muted Slate')}
          ${renderColorSwatch('--success', '#34D399', 'Sorted Green')}
          ${renderColorSwatch('--warning', '#FBBF24', 'Current Amber')}
          ${renderColorSwatch('--danger', '#FB7185', 'Moving Pink')}
        </div>
      </section>

      <!-- Visualizer Playback Preferences -->
      <section class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">Playback & Accessibility</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">Stored locally in your browser's localStorage.</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-5);">
          <!-- Default Playback Speed -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; gap: var(--space-3);">
            <div>
              <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text);">Default Playback Speed</h3>
              <p style="font-size: var(--text-xs); color: var(--muted);">Controls the initial animation delay for sorting and searching visualizers.</p>
            </div>

            <div class="segmented-control" id="speed-pref-selector">
              <button class="segment-btn ${currentPrefs.animationSpeedMs === 650 ? 'active' : ''}" data-speed="650">Slow (650ms)</button>
              <button class="segment-btn ${currentPrefs.animationSpeedMs === 350 ? 'active' : ''}" data-speed="350">Normal (350ms)</button>
              <button class="segment-btn ${currentPrefs.animationSpeedMs === 120 ? 'active' : ''}" data-speed="120">Fast (120ms)</button>
            </div>
          </div>

          <!-- Reduced Motion Setting -->
          <div style="display: flex; justify-content: space-between; align-items: center; padding-bottom: var(--space-4); border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; gap: var(--space-3);">
            <div>
              <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text);">Reduced Motion Mode</h3>
              <p style="font-size: var(--text-xs); color: var(--muted);">Disables bar transitions and bouncing pointers for users sensitive to motion.</p>
            </div>

            <label style="display: flex; align-items: center; gap: var(--space-2); cursor: pointer;">
              <input type="checkbox" id="reduced-motion-toggle" ${currentPrefs.reducedMotion ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--primary);" />
              <span style="font-size: var(--text-sm); font-weight: 500;">Enable Reduced Motion</span>
            </label>
          </div>

          <!-- Default Array Size -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-3);">
            <div>
              <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text);">Default Dataset Size</h3>
              <p style="font-size: var(--text-xs); color: var(--muted);">Initial number of elements generated for visualizers (5–20 elements).</p>
            </div>

            <div style="display: flex; align-items: center; gap: var(--space-3);">
              <input type="range" id="default-size-slider" min="6" max="20" value="${currentPrefs.defaultArraySize || 12}" class="range-slider" style="width: 120px;" />
              <span id="default-size-value" style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 600; min-width: 60px;">${currentPrefs.defaultArraySize || 12} items</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Reset & Data Management -->
      <section class="panel" style="padding: var(--space-6); border-color: rgba(251, 113, 133, 0.25);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-base); font-weight: 700; color: var(--danger);">Reset Local Studio Preferences</h2>
            <p style="font-size: var(--text-xs); color: var(--muted); margin-top: 2px;">
              Reverts all speed, motion, and explored algorithm tracking stored in your browser's localStorage.
            </p>
          </div>

          <button class="btn btn-danger" id="reset-preferences-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
            <span>Reset Local Preferences</span>
          </button>
        </div>
      </section>
    </div>
  `;

  // Bind speed buttons
  const speedContainer = container.querySelector('#speed-pref-selector');
  if (speedContainer) {
    const btns = speedContainer.querySelectorAll('.segment-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const speed = parseInt(btn.getAttribute('data-speed'), 10);
        State.updatePreferences({ animationSpeedMs: speed });
        State.showToast(`Default animation speed set to ${speed}ms`, 'success');
      });
    });
  }

  // Bind reduced motion toggle
  const motionToggle = container.querySelector('#reduced-motion-toggle');
  if (motionToggle) {
    motionToggle.addEventListener('change', (e) => {
      const isReduced = e.target.checked;
      State.updatePreferences({ reducedMotion: isReduced });
      applyReducedMotionPreference(isReduced);
      State.showToast(isReduced ? 'Reduced motion enabled' : 'Reduced motion disabled', 'info');
    });
  }

  // Bind default array size slider
  const sizeSlider = container.querySelector('#default-size-slider');
  const sizeValue = container.querySelector('#default-size-value');
  if (sizeSlider && sizeValue) {
    sizeSlider.addEventListener('input', (e) => {
      const size = parseInt(e.target.value, 10);
      sizeValue.textContent = `${size} items`;
    });
    sizeSlider.addEventListener('change', (e) => {
      const size = parseInt(e.target.value, 10);
      State.updatePreferences({ defaultArraySize: size });
      State.showToast(`Default array size set to ${size} items`, 'success');
    });
  }

  // Bind reset button
  const resetBtn = container.querySelector('#reset-preferences-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      Storage.resetPreferences();
      State.preferences = Storage.getPreferences();
      applyReducedMotionPreference(false);
      State.showToast('Local preferences reset to studio defaults', 'warning');
      renderSettings(container);
    });
  }
}

function renderColorSwatch(varName, hex, label) {
  return `
    <div style="background: var(--panel-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-2); display: flex; flex-direction: column; gap: 6px;">
      <div style="height: 36px; border-radius: var(--radius-sm); background-color: ${hex}; border: 1px solid rgba(255, 255, 255, 0.1);"></div>
      <div>
        <span style="font-size: 11px; font-weight: 600; color: var(--text); display: block;">${label}</span>
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--muted);">${hex}</span>
      </div>
    </div>
  `;
}

function applyReducedMotionPreference(isReduced) {
  if (isReduced) {
    document.documentElement.classList.add('reduce-motion');
  } else {
    document.documentElement.classList.remove('reduce-motion');
  }
}
