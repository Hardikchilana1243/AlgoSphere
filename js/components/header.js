/**
 * AlgoSphere - Header Bar Component
 * Renders breadcrumb hierarchy, mobile menu button, and developer studio badges.
 */

const ROUTE_NAMES = {
  dashboard: 'Dashboard',
  sorting: 'Sorting Visualizer',
  searching: 'Searching Visualizer',
  learn: 'Learn Studio',
  settings: 'Studio Settings'
};

export class HeaderComponent {
  /**
   * @param {HTMLElement} headerEl
   * @param {import('./sidebar.js').SidebarComponent} sidebar
   */
  constructor(headerEl, sidebar) {
    this.headerEl = headerEl;
    this.sidebar = sidebar;
  }

  render(currentRoute = 'dashboard') {
    if (!this.headerEl) return;

    const routeTitle = ROUTE_NAMES[currentRoute] || 'Studio';

    this.headerEl.innerHTML = `
      <div class="header-left">
        <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div class="header-breadcrumbs">
          <span>AlgoSphere</span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current" id="header-breadcrumb-current">${routeTitle}</span>
        </div>
      </div>

      <div class="header-right">
        <div class="header-badge header-badge-accent">
          <span style="font-size: 10px;">●</span>
          <span class="header-badge-text">Dark Developer Studio</span>
        </div>

        <a href="#learn" class="btn btn-outline btn-sm" id="header-quick-docs-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span class="header-badge-text">Glossary & Big-O</span>
        </a>
      </div>
    `;

    const menuBtn = this.headerEl.querySelector('#mobile-menu-btn');
    if (menuBtn && this.sidebar) {
      menuBtn.addEventListener('click', () => {
        this.sidebar.toggleMobile();
      });
    }
  }

  updateBreadcrumb(currentRoute) {
    const currentEl = this.headerEl.querySelector('#header-breadcrumb-current');
    if (currentEl) {
      currentEl.textContent = ROUTE_NAMES[currentRoute] || 'Studio';
    }
  }
}
