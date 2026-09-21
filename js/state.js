/**
 * AlgoSphere - Global Application State
 * Manages route parameters, active user preferences, and notification toasts.
 */

import { Storage } from './utils/storage.js';

class AppState {
  constructor() {
    this.currentRoute = 'dashboard';
    this.routeParams = {};
    this.preferences = Storage.getPreferences();
    this.listeners = new Set();
  }

  get(key) {
    return this[key];
  }

  setRoute(route, params = {}) {
    this.currentRoute = route;
    this.routeParams = params;
    this.notify();
  }

  updatePreferences(newPrefs) {
    this.preferences = Storage.savePreferences(newPrefs);
    this.notify();
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(fn => fn(this));
  }

  /**
   * Displays a toast notification in the UI
   * @param {string} message
   * @param {'info'|'success'|'warning'|'danger'} type
   * @param {number} durationMs
   */
  showToast(message, type = 'info', durationMs = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠';
    if (type === 'danger') icon = '✕';

    toast.innerHTML = `
      <span style="font-weight: 700;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 200);
    }, durationMs);
  }
}

export const State = new AppState();
