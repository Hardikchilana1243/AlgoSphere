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
  parseArrayInput(inputStr, minElements = 1, maxElements = 25, minVal = 1, maxVal = 100) {
    if (!inputStr || typeof inputStr !== 'string' || !inputStr.trim()) {
      return { 
        isValid: false, 
        error: 'Input cannot be empty. Please enter a comma-separated list of integers (e.g. 5, 3, 8, 1, 2).' 
      };
    }

    // Split by comma or whitespace and clean empty items
    const parts = inputStr.split(/[\s,]+/).filter(part => part.length > 0);

    if (parts.length === 0) {
      return {
        isValid: false,
        error: 'Input cannot be empty. Please enter a comma-separated list of integers.'
      };
    }

    if (parts.length < minElements) {
      return {
        isValid: false,
        error: `Array is too short. Please provide at least ${minElements} number${minElements > 1 ? 's' : ''} (you provided ${parts.length}).`
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
      const part = parts[i].trim();

      // Check if it's a valid integer representation
      if (!/^-?\d+$/.test(part)) {
        // Check if user entered a decimal number
        if (/^-?\d+\.\d+$/.test(part)) {
          return {
            isValid: false,
            error: `"${part}" at position ${i + 1} is a decimal number. Please enter integers only.`
          };
        }
        return {
          isValid: false,
          error: `"${part}" at position ${i + 1} is not a valid number. Please enter integers only.`
        };
      }

      const intVal = parseInt(part, 10);
      if (isNaN(intVal) || !Number.isFinite(intVal)) {
        return {
          isValid: false,
          error: `"${part}" at position ${i + 1} is not a valid number.`
        };
      }

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

    const trimmed = String(targetVal).trim();
    if (!/^-?\d+$/.test(trimmed)) {
      return { isValid: false, error: 'Target must be a valid integer.' };
    }

    const intVal = parseInt(trimmed, 10);
    if (isNaN(intVal) || !Number.isFinite(intVal)) {
      return { isValid: false, error: 'Target must be a valid number.' };
    }

    if (intVal < minVal || intVal > maxVal) {
      return { isValid: false, error: `Target must be between ${minVal} and ${maxVal}.` };
    }

    return { isValid: true, value: intVal };
  },

  /**
   * Validates a practice set name
   * @param {string} name
   * @param {Array} existingSets
   * @param {string|null} currentId
   * @returns {{ isValid: boolean, error?: string, value?: string }}
   */
  validatePracticeSetName(name, existingSets = [], currentId = null) {
    if (!name || typeof name !== 'string' || !name.trim()) {
      return { isValid: false, error: 'Practice set name cannot be empty.' };
    }

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      return { isValid: false, error: 'Practice set name must be at least 2 characters long.' };
    }

    if (trimmed.length > 50) {
      return { isValid: false, error: 'Practice set name cannot exceed 50 characters.' };
    }

    // Check duplicate name (case-insensitive), excluding current record in case of edit
    const isDuplicate = existingSets.some(set => {
      if (!set || (currentId && set.id === currentId)) return false;
      return typeof set.name === 'string' && set.name.trim().toLowerCase() === trimmed.toLowerCase();
    });

    if (isDuplicate) {
      return {
        isValid: false,
        error: `A practice set with the name "${trimmed}" already exists. Please choose a unique name.`
      };
    }

    return { isValid: true, value: trimmed };
  },

  /**
   * Validates algorithm selection
   * @param {string} algorithm
   * @returns {{ isValid: boolean, error?: string, value?: string }}
   */
  validatePracticeSetAlgorithm(algorithm) {
    const validAlgos = [
      'bubbleSort',
      'selectionSort',
      'insertionSort',
      'mergeSort',
      'quickSort',
      'linearSearch',
      'binarySearch'
    ];

    if (!algorithm || !validAlgos.includes(algorithm)) {
      return { isValid: false, error: 'Please select a valid algorithm.' };
    }

    return { isValid: true, value: algorithm };
  },

  /**
   * Comprehensive validation for a practice set payload
   * @param {{ name: string, algorithm: string, array: string|number[] }} data
   * @param {Array} existingSets
   * @param {string|null} currentId
   * @returns {{ isValid: boolean, error?: string, data?: { name: string, algorithm: string, array: number[] } }}
   */
  validatePracticeSet(data, existingSets = [], currentId = null) {
    if (!data || typeof data !== 'object') {
      return { isValid: false, error: 'Invalid practice set data format.' };
    }

    const nameValidation = this.validatePracticeSetName(data.name, existingSets, currentId);
    if (!nameValidation.isValid) {
      return { isValid: false, error: nameValidation.error };
    }

    const algoValidation = this.validatePracticeSetAlgorithm(data.algorithm);
    if (!algoValidation.isValid) {
      return { isValid: false, error: algoValidation.error };
    }

    let parsedArray;
    if (typeof data.array === 'string') {
      parsedArray = this.parseArrayInput(data.array, 1, 25, 1, 100);
    } else if (Array.isArray(data.array)) {
      parsedArray = this.parseArrayInput(data.array.join(','), 1, 25, 1, 100);
    } else {
      return { isValid: false, error: 'Please provide a valid array of numbers.' };
    }

    if (!parsedArray.isValid) {
      return { isValid: false, error: parsedArray.error };
    }

    return {
      isValid: true,
      data: {
        name: nameValidation.value,
        algorithm: algoValidation.value,
        array: parsedArray.data
      }
    };
  }
};
