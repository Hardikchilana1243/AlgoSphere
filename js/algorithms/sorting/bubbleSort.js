/**
 * AlgoSphere - Bubble Sort Algorithm
 * Generates an immutable event sequence with snapshots, operation counters, and pseudocode synchronization.
 * Pure algorithm function with zero DOM dependencies.
 */

export function generateBubbleSortSteps(inputArray) {
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

  // Step 0: Initial State
  steps.push(createStep({
    type: 'initial',
    codeLine: 1,
    description: `Initialized Bubble Sort with ${n} elements. Ready to start.`,
    highlights: mapHighlights(sortedIndices)
  }));

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
      sortedIndices: [0],
      description: `Array of size 1 (${arr[0]}) is trivially sorted.`,
      highlights: { 0: 'sorted' }
    }));
    return steps;
  }

  // Bubble Sort Outer Loop
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Loop header (Pass start)
    steps.push(createStep({
      type: 'iteration-start',
      codeLine: 3,
      description: `Starting Pass ${i + 1} of ${n - 1}. Largest unsorted value will bubble to index ${n - 1 - i}.`,
      highlights: mapHighlights(sortedIndices)
    }));

    // Inner Loop: Compare adjacent elements
    for (let j = 0; j < n - i - 1; j++) {
      // Step: Examine current element being checked (Amber: state-current)
      steps.push(createStep({
        type: 'examine',
        codeLine: 5,
        currentIndices: [j],
        description: `Examining current element arr[${j}] (${arr[j]}). Preparing to compare with adjacent arr[${j + 1}] (${arr[j + 1]}).`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [j]: 'current'
        }
      }));

      comparisons++;
      const isGreater = arr[j] > arr[j + 1];
      const isEqual = arr[j] === arr[j + 1];

      // Step: Comparison step (Violet: state-comparing)
      steps.push(createStep({
        type: 'compare',
        codeLine: 6,
        comparedIndices: [j, j + 1],
        description: isGreater
          ? `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}): ${arr[j]} > ${arr[j + 1]}, swap required.`
          : isEqual
            ? `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}): duplicate values are equal, maintaining stable relative order.`
            : `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}): ${arr[j]} ≤ ${arr[j + 1]}, already in sorted order.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [j]: 'comparing',
          [j + 1]: 'comparing'
        }
      }));

      // Swap if out of order
      if (isGreater) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        // Step: Swap step (Pink: state-moving / state-swapping)
        steps.push(createStep({
          type: 'swap',
          codeLine: 7,
          swappedIndices: [j, j + 1],
          description: `Swapped arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}). Array is now [${arr.join(', ')}].`,
          highlights: {
            ...mapHighlights(sortedIndices),
            [j]: 'moving',
            [j + 1]: 'moving'
          }
        }));
      }
    }

    // Element at n - 1 - i has bubbled to its final position (Green: state-sorted)
    sortedIndices.add(n - 1 - i);
    steps.push(createStep({
      type: 'mark-sorted',
      codeLine: 3,
      description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} is permanently settled at sorted index ${n - 1 - i}.`,
      highlights: mapHighlights(sortedIndices)
    }));

    // Early-exit optimization flag check: if no swaps occurred, array is sorted
    if (!swapped) {
      for (let k = 0; k < n; k++) {
        sortedIndices.add(k);
      }

      steps.push(createStep({
        type: 'early-exit',
        codeLine: 9,
        description: `No swaps occurred during Pass ${i + 1}. Array is already fully sorted! Early exit achieved in O(n) best-case time.`,
        highlights: mapHighlights(sortedIndices)
      }));
      break;
    }
  }

  // Ensure all indices are marked sorted for final completion state
  for (let k = 0; k < n; k++) {
    sortedIndices.add(k);
  }

  steps.push(createStep({
    type: 'complete',
    codeLine: 10,
    description: `Bubble Sort complete! Array fully sorted in ${comparisons} comparisons and ${swaps} swaps.`,
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
