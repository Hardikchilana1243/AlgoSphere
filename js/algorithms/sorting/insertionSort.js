/**
 * AlgoSphere - Insertion Sort Algorithm
 * Generates an immutable event sequence with key selection, shifts, insertion points, and pseudocode synchronization.
 * Pure algorithm function with zero DOM dependencies.
 */

export function generateInsertionSortSteps(inputArray) {
  const steps = [];
  const arr = Array.isArray(inputArray) ? [...inputArray] : [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set();

  /**
   * Helper to construct step snapshots with full metadata
   * Includes both required specification fields and renderer compatibility fields.
   */
  const createStep = (config) => ({
    type: config.type,
    // Explicit properties matching assignment requirements
    currentArray: [...arr],
    comparedIndices: config.comparedIndices ? [...config.comparedIndices] : [],
    currentIndices: config.currentIndices ? [...config.currentIndices] : [],
    swappedIndices: config.swappedIndices ? [...config.swappedIndices] : [],
    sortedIndices: Array.from(sortedIndices),
    comparisonCount: comparisons,
    swapCount: swaps,
    explanation: config.description,
    pseudocodeLine: config.codeLine,

    // Backward-compatibility properties for existing renderer & engine
    array: [...arr],
    indices: config.comparedIndices || config.currentIndices || [],
    highlights: config.highlights || {},
    counters: { comparisons, swaps },
    codeLine: config.codeLine,
    description: config.description
  });

  // Handle empty array
  if (n === 0) {
    steps.push(createStep({
      type: 'complete',
      codeLine: 10,
      description: 'Array is empty. Nothing to sort.',
      highlights: {}
    }));
    return steps;
  }

  // Handle single-element array (trivially sorted)
  if (n === 1) {
    sortedIndices.add(0);
    steps.push(createStep({
      type: 'complete',
      codeLine: 10,
      description: `Array of size 1 (${arr[0]}) is trivially sorted.`,
      highlights: { 0: 'sorted' }
    }));
    return steps;
  }

  // Step 0: Initial State for standard arrays (Index 0 is trivially sorted)
  sortedIndices.add(0);
  steps.push(createStep({
    type: 'initial',
    codeLine: 1,
    currentIndices: [0],
    description: `Initialized Insertion Sort with ${n} elements. Index 0 (${arr[0]}) is trivially sorted on its own.`,
    highlights: mapHighlights(sortedIndices)
  }));

  // Outer Loop: iterate through unsorted elements starting from index 1
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    // Step: Pick the current key to be inserted into the sorted subarray [0..i - 1]
    steps.push(createStep({
      type: 'select-key',
      codeLine: 4,
      currentIndices: [i],
      description: `Picked key element arr[${i}] (${key}). Scanning sorted subarray [0..${i - 1}] to find its insertion position.`,
      highlights: {
        ...mapHighlights(sortedIndices),
        [i]: 'current'
      }
    }));

    // Inner Loop: scan backwards through the sorted subarray
    while (j >= 0) {
      comparisons++;
      const needShift = arr[j] > key;

      // Step: Compare arr[j] with the key
      steps.push(createStep({
        type: 'compare',
        codeLine: 6,
        comparedIndices: [j],
        currentIndices: [j + 1],
        description: needShift
          ? `Comparing arr[${j}] (${arr[j]}) with key (${key}): ${arr[j]} > ${key}. Shift arr[${j}] right.`
          : `Comparing arr[${j}] (${arr[j]}) with key (${key}): ${arr[j]} ≤ ${key}. Correct insertion position found at index ${j + 1}.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [j]: 'comparing',
          [j + 1]: 'current'
        }
      }));

      if (needShift) {
        swaps++;
        arr[j + 1] = arr[j];

        // Step: Shift element arr[j] right to arr[j + 1]
        steps.push(createStep({
          type: 'shift',
          codeLine: 7,
          swappedIndices: [j + 1],
          description: `Shifted element ${arr[j]} from index ${j} right to index ${j + 1}.`,
          highlights: {
            ...mapHighlights(sortedIndices),
            [j + 1]: 'moving'
          }
        }));

        j--;
      } else {
        // Element is smaller or equal; stop scanning
        break;
      }
    }

    // Place key into its sorted position
    arr[j + 1] = key;
    sortedIndices.add(i);

    // Step: Insert the key and update the sorted subarray
    steps.push(createStep({
      type: 'insert',
      codeLine: 9,
      currentIndices: [j + 1],
      description: `Inserted key (${key}) into slot ${j + 1}. Subarray [0..${i}] is now sorted.`,
      highlights: {
        ...mapHighlights(sortedIndices),
        [j + 1]: 'sorted'
      }
    }));
  }

  // Ensure all indices are marked sorted for final state
  for (let k = 0; k < n; k++) {
    sortedIndices.add(k);
  }

  // Step: Final Complete State
  steps.push(createStep({
    type: 'complete',
    codeLine: 10,
    description: `Insertion Sort complete! Array fully sorted in ${comparisons} comparisons and ${swaps} shifts.`,
    highlights: mapHighlights(sortedIndices)
  }));

  return steps;
}

function mapHighlights(sortedSet) {
  const highlights = {};
  sortedSet.forEach(idx => {
    highlights[idx] = 'sorted';
  });
  return highlights;
}
