/**
 * AlgoSphere - Local Storage Utility
 * Manages user preferences and local progress persistence gracefully.
 */

export const STORAGE_KEYS = {
  PREFERENCES: 'algosphere_user_preferences',
  COMPLETED_ALGOS: 'algosphere_completed_algos',
  PRACTICE_SETS: 'algosphere_practice_sets'
};

const DEFAULT_PREFERENCES = {
  animationSpeedMs: 350,
  reducedMotion: false,
  defaultArraySize: 12
};

/**
 * Generates a unique browser-friendly ID for practice sets
 * @returns {string}
 */
function generatePracticeSetId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'ps_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

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

  // ==========================================
  // Practice Sets CRUD Operations
  // ==========================================

  /**
   * Retrieves all saved practice sets from localStorage.
   * Recovers gracefully with an empty array if data is missing or corrupted.
   * @returns {Array<{id: string, name: string, algorithm: string, array: number[], createdAt: string, updatedAt: string}>}
   */
  getPracticeSets() {
    const sets = getItem(STORAGE_KEYS.PRACTICE_SETS, []);
    if (!Array.isArray(sets)) {
      console.warn('AlgoSphere: Corrupted practice sets payload detected, resetting to empty array.');
      return [];
    }
    return sets;
  },

  /**
   * Persists an array of practice sets to localStorage.
   * @param {Array} sets
   * @returns {Array}
   */
  savePracticeSets(sets) {
    if (!Array.isArray(sets)) {
      console.warn('AlgoSphere: savePracticeSets expects an array.');
      return [];
    }
    setItem(STORAGE_KEYS.PRACTICE_SETS, sets);
    return sets;
  },

  /**
   * Finds and returns a single practice set by its unique ID.
   * @param {string} id
   * @returns {object|null}
   */
  getPracticeSetById(id) {
    if (!id) return null;
    const sets = this.getPracticeSets();
    return sets.find(s => s && s.id === id) || null;
  },

  /**
   * Creates and persists a new practice set.
   * Prepends to the list so newest sets appear first in the UI.
   * @param {{ name: string, algorithm: string, array: number[] }} param0
   * @returns {object}
   */
  createPracticeSet({ name, algorithm, array }) {
    const sets = this.getPracticeSets();
    const now = new Date().toISOString();
    const newSet = {
      id: generatePracticeSetId(),
      name: String(name || '').trim(),
      algorithm: String(algorithm || '').trim(),
      array: Array.isArray(array) ? array.map(n => parseInt(n, 10)) : [],
      createdAt: now,
      updatedAt: now
    };

    sets.unshift(newSet);
    this.savePracticeSets(sets);
    return newSet;
  },

  /**
   * Updates an existing practice set by ID. Preserves ID and createdAt.
   * @param {string} id
   * @param {{ name?: string, algorithm?: string, array?: number[] }} updates
   * @returns {object|null}
   */
  updatePracticeSet(id, updates = {}) {
    if (!id) return null;
    const sets = this.getPracticeSets();
    const index = sets.findIndex(s => s && s.id === id);
    if (index === -1) {
      return null;
    }

    const current = sets[index];
    const updated = {
      ...current,
      name: updates.name !== undefined ? String(updates.name).trim() : current.name,
      algorithm: updates.algorithm !== undefined ? String(updates.algorithm).trim() : current.algorithm,
      array: updates.array !== undefined && Array.isArray(updates.array)
        ? updates.array.map(n => parseInt(n, 10))
        : current.array,
      id: current.id,
      createdAt: current.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    sets[index] = updated;
    this.savePracticeSets(sets);
    return updated;
  },

  /**
   * Deletes a practice set by ID.
   * @param {string} id
   * @returns {boolean} True if deleted, false if not found
   */
  deletePracticeSet(id) {
    if (!id) return false;
    const sets = this.getPracticeSets();
    const initialLength = sets.length;
    const filtered = sets.filter(s => s && s.id !== id);
    if (filtered.length === initialLength) {
      return false;
    }
    this.savePracticeSets(filtered);
    return true;
  },

  clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.COMPLETED_ALGOS);
      localStorage.removeItem(STORAGE_KEYS.PRACTICE_SETS);
    } catch (err) {
      console.warn(err);
    }
  }
};
