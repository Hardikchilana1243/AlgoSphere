/**
 * AlgoSphere - Input Validation Utilities
 * Ensures robust user inputs and actionable error messaging.
 */

export const Validation = {
  /**
   * Validates and parses a comma-separated list of numbers for sorting or searching
   * @param {string} inputStr
   * @param {number} minElements
   * @param {number} maxElements
   * @param {number} minVal
   * @param {number} maxVal
   * @returns {{ isValid: boolean, error?: string, data?: number[] }}
   */
  parseArrayInput(inputStr, minElements = 5, maxElements = 25, minVal = 1, maxVal = 100) {
    if (!inputStr || typeof inputStr !== 'string' || !inputStr.trim()) {
      return { isValid: false, error: 'Please enter a comma-separated list of numbers.' };
    }

    // Split by comma or whitespace
    const parts = inputStr.split(/[\s,]+/).filter(part => part.length > 0);

    if (parts.length < minElements) {
      return {
        isValid: false,
        error: `Array is too short. Please provide at least ${minElements} numbers (you provided ${parts.length}).`
      };
    }

    if (parts.length > maxElements) {
      return {
        isValid: false,
        error: `Array is too large for clear visualization. Maximum is ${maxElements} numbers (you provided ${parts.length}).`
      };
    }

    const numbers = [];
    for (let i = 0; i < parts.length; i++) {
      const val = Number(parts[i]);
      if (isNaN(val) || !Number.isFinite(val)) {
        return {
          isValid: false,
          error: `"${parts[i]}" at position ${i + 1} is not a valid number.`
        };
      }

      const intVal = Math.round(val);
      if (intVal < minVal || intVal > maxVal) {
        return {
          isValid: false,
          error: `Number ${intVal} at position ${i + 1} is out of range. Values must be between ${minVal} and ${maxVal}.`
        };
      }
      numbers.push(intVal);
    }

    return { isValid: true, data: numbers };
  },

  /**
   * Validates target search input
   * @param {string|number} targetVal
   * @param {number} minVal
   * @param {number} maxVal
   * @returns {{ isValid: boolean, error?: string, value?: number }}
   */
  parseTargetInput(targetVal, minVal = 1, maxVal = 100) {
    if (targetVal === '' || targetVal === null || targetVal === undefined) {
      return { isValid: false, error: 'Please enter a target number to search.' };
    }

    const num = Number(targetVal);
    if (isNaN(num) || !Number.isFinite(num)) {
      return { isValid: false, error: 'Target must be a valid number.' };
    }

    const intVal = Math.round(num);
    if (intVal < minVal || intVal > maxVal) {
      return { isValid: false, error: `Target must be between ${minVal} and ${maxVal}.` };
    }

    return { isValid: true, value: intVal };
  }
};
