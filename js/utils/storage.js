/**
 * AlgoSphere - Local Storage Utility
 * Manages user preferences and local progress persistence gracefully.
 */

const STORAGE_KEYS = {
  PREFERENCES: 'algosphere_user_preferences',
  COMPLETED_ALGOS: 'algosphere_completed_algos'
};

const DEFAULT_PREFERENCES = {
  animationSpeedMs: 350,
  reducedMotion: false,
  defaultArraySize: 12
};

/**
 * Safely reads an item from localStorage
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
function getItem(key, defaultValue) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('AlgoSphere: Unable to read from localStorage', err);
    return defaultValue;
  }
}

/**
 * Safely saves an item to localStorage
 * @param {string} key
 * @param {*} value
 */
function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('AlgoSphere: Unable to write to localStorage', err);
  }
}

export const Storage = {
  getPreferences() {
    return { ...DEFAULT_PREFERENCES, ...getItem(STORAGE_KEYS.PREFERENCES, {}) };
  },

  savePreferences(prefs) {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    setItem(STORAGE_KEYS.PREFERENCES, updated);
    return updated;
  },

  resetPreferences() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
    } catch (err) {
      console.warn(err);
    }
    return { ...DEFAULT_PREFERENCES };
  },

  getCompletedAlgorithms() {
    return getItem(STORAGE_KEYS.COMPLETED_ALGOS, []);
  },

  markAlgorithmCompleted(algoId) {
    const list = this.getCompletedAlgorithms();
    if (!list.includes(algoId)) {
      list.push(algoId);
      setItem(STORAGE_KEYS.COMPLETED_ALGOS, list);
    }
    return list;
  },

  clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_ALGOS);
    } catch (err) {
      console.warn(err);
    }
  }
};
