/**
 * AlgoSphere - Sidebar Navigation Component
 * Renders brand header, structured navigation links, studio status, and mobile drawer toggle.
 */

import { State } from '../state.js';

export class SidebarComponent {
  constructor(sidebarEl, backdropEl) {
    this.sidebarEl = sidebarEl;
    this.backdropEl = backdropEl;
    this.isOpen = false;
  }

  render() {
    if (!this.sidebarEl) return;

    this.sidebarEl.innerHTML = `
      <div class="sidebar-header">
        <a href="#dashboard" class="brand-logo" id="brand-logo-link">
          <div class="brand-icon">A</div>
          <div class="brand-text-wrapper">
            <span class="brand-title">AlgoSphere</span>
            <span class="brand-badge">Learning Studio</span>
          </div>
        </a>
      </div>

      <nav class="sidebar-nav" aria-label="Main Navigation Links">
        <span class="nav-section-label">Studio Workspaces</span>
        
        <a href="#dashboard" class="nav-link" data-route="dashboard" id="nav-dashboard">
          <span class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </span>
          <span>Dashboard</span>
        </a>

        <a href="#sorting" class="nav-link" data-route="sorting" id="nav-sorting">
          <span class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"></line>
              <line x1="12" y1="20" x2="12" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="14"></line>
            </svg>
          </span>
          <span>Sorting Visualizer</span>
        </a>

        <a href="#searching" class="nav-link" data-route="searching" id="nav-searching">
          <span class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <span>Searching Visualizer</span>
        </a>

        <span class="nav-section-label" style="margin-top: var(--space-4);">Knowledge & Config</span>

        <a href="#learn" class="nav-link" data-route="learn" id="nav-learn">
          <span class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </span>
          <span>Learn Studio</span>
        </a>

        <a href="#settings" class="nav-link" data-route="settings" id="nav-settings">
          <span class="nav-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </span>
          <span>Studio Settings</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <div class="studio-status-card">
          <span class="status-dot"></span>
          <div class="status-info">
            <span class="status-label">Vanilla ES Modules</span>
            <span class="status-desc">Zero build tools • Static app</span>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.updateActiveLink(State.currentRoute);
  }

  bindEvents() {
    // Backdrop click closes mobile drawer
    if (this.backdropEl) {
      this.backdropEl.addEventListener('click', () => this.closeMobile());
    }

    // Nav link click closes mobile drawer
    const links = this.sidebarEl.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => this.closeMobile());
    });
  }

  updateActiveLink(route) {
    if (!this.sidebarEl) return;
    const links = this.sidebarEl.querySelectorAll('.nav-link');
    links.forEach(link => {
      if (link.getAttribute('data-route') === route) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  openMobile() {
    this.isOpen = true;
    this.sidebarEl.classList.add('open');
    if (this.backdropEl) this.backdropEl.classList.add('active');
  }

  closeMobile() {
    this.isOpen = false;
    this.sidebarEl.classList.remove('open');
    if (this.backdropEl) this.backdropEl.classList.remove('active');
  }

  toggleMobile() {
    if (this.isOpen) {
      this.closeMobile();
    } else {
      this.openMobile();
    }
  }
}
