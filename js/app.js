/**
 * AlgoSphere - Main Application Bootstrap
 * Initializes shell layout components, mounts hash router, and applies user preferences.
 */

import { SidebarComponent } from './components/sidebar.js';
import { HeaderComponent } from './components/header.js';
import { Router } from './router.js';
import { Storage } from './utils/storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const sidebarEl = document.getElementById('app-sidebar');
  const backdropEl = document.getElementById('sidebar-backdrop');
  const headerEl = document.getElementById('app-header');
  const contentEl = document.getElementById('app-content');

  // Apply stored preferences on load
  const prefs = Storage.getPreferences();
  if (prefs.reducedMotion) {
    document.documentElement.classList.add('reduce-motion');
  }

  // Initialize UI Shell
  const sidebar = new SidebarComponent(sidebarEl, backdropEl);
  sidebar.render();

  const header = new HeaderComponent(headerEl, sidebar);
  header.render();

  // Initialize Client Router
  const router = new Router(contentEl, sidebar, header);
  router.init();

  console.info('🚀 AlgoSphere initialized successfully. Dark Developer Studio ready.');
});
