/**
 * AlgoSphere - Hash-based Client Router
 * Parses URI fragments & query strings, unmounts previous views, and mounts active page controllers.
 */

import { State } from './state.js';
import { renderDashboard } from './pages/dashboard.js';
import { SortingPage } from './pages/sorting.js';
import { SearchingPage } from './pages/searching.js';
import { renderLearn } from './pages/learn.js';
import { renderSettings } from './pages/settings.js';

export class Router {
  /**
   * @param {HTMLElement} contentContainer
   * @param {import('./components/sidebar.js').SidebarComponent} sidebar
   * @param {import('./components/header.js').HeaderComponent} header
   */
  constructor(contentContainer, sidebar, header) {
    this.contentContainer = contentContainer;
    this.sidebar = sidebar;
    this.header = header;
    this.activePageInstance = null;

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    this.handleRoute();
  }

  parseHash() {
    let hash = window.location.hash.slice(1);
    if (!hash || hash === '/') hash = 'dashboard';

    const [routePart, queryPart] = hash.split('?');
    const route = routePart.replace(/^\//, '').toLowerCase();

    const params = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }

    return { route, params };
  }

  handleRoute() {
    const { route, params } = this.parseHash();

    // Cleanup existing page instance
    if (this.activePageInstance && typeof this.activePageInstance.destroy === 'function') {
      this.activePageInstance.destroy();
      this.activePageInstance = null;
    }

    // Update global state
    State.setRoute(route, params);

    // Update UI shell
    if (this.sidebar) this.sidebar.updateActiveLink(route);
    if (this.header) this.header.updateBreadcrumb(route);

    // Scroll to top
    window.scrollTo(0, 0);

    // Render corresponding view
    switch (route) {
      case 'sorting':
        this.activePageInstance = new SortingPage();
        this.activePageInstance.render(this.contentContainer, params);
        break;

      case 'searching':
        this.activePageInstance = new SearchingPage();
        this.activePageInstance.render(this.contentContainer, params);
        break;

      case 'learn':
        renderLearn(this.contentContainer);
        break;

      case 'settings':
        renderSettings(this.contentContainer);
        break;

      case 'dashboard':
      default:
        renderDashboard(this.contentContainer);
        break;
    }
  }

  navigate(hash) {
    window.location.hash = hash;
  }
}
