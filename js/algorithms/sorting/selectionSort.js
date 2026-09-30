/**
 * AlgoSphere - Selection Sort Algorithm
 * Generates an immutable event sequence with snapshots, minimum-index tracking, operation counters, and pseudocode synchronization.
 * Pure algorithm function with zero DOM dependencies.
 */

export function generateSelectionSortSteps(inputArray) {
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
    description: `Initialized Selection Sort with ${n} elements. Ready to start.`,
    highlights: mapHighlights(sortedIndices)
  }));

  // Handle empty array
  if (n === 0) {
    steps.push(createStep({
      type: 'complete',
      codeLine: 9,
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
      codeLine: 9,
      sortedIndices: [0],
      description: `Array of size 1 (${arr[0]}) is trivially sorted.`,
      highlights: { 0: 'sorted' }
    }));
    return steps;
  }

  // Selection Sort: for each position i from 0 to n - 2
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // 1. Assume i is the minimum index & start pass
    steps.push(createStep({
      type: 'iteration-start',
      codeLine: 4, // minIndex = i
      currentIndices: [i],
      description: `Starting pass ${i + 1} of ${n - 1} at position ${i}. Assuming current element arr[${i}] (${arr[i]}) is the minimum candidate.`,
      highlights: {
        ...mapHighlights(sortedIndices),
        [i]: 'current'
      }
    }));

    // 2. Scan the remaining unsorted portion
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isSmaller = arr[j] < arr[minIdx];
      const isEqual = arr[j] === arr[minIdx];

      // 3. Compare current candidate with current minimum
      steps.push(createStep({
        type: 'compare',
        codeLine: 6, // if arr[j] < arr[minIndex]:
        comparedIndices: [j, minIdx],
        currentIndices: [minIdx],
        description: isSmaller
          ? `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}): ${arr[j]} < ${arr[minIdx]}, smaller element found!`
          : isEqual
            ? `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}): values are equal (${arr[j]}), keeping earlier minimum.`
            : `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}): ${arr[j]} ≥ ${arr[minIdx]}, not smaller.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [minIdx]: 'current',
          [j]: 'comparing'
        }
      }));

      // 4. Update minimum index when a smaller value is found
      if (isSmaller) {
        const prevMin = minIdx;
        minIdx = j;

        steps.push(createStep({
          type: 'new-min',
          codeLine: 7, // minIndex = j
          currentIndices: [minIdx],
          description: `Found a smaller element! Updating minimum candidate to index ${minIdx} (value: ${arr[minIdx]}, previously arr[${prevMin}] = ${arr[prevMin]}).`,
          highlights: {
            ...mapHighlights(sortedIndices),
            [minIdx]: 'current'
          }
        }));
      }
    }

    // 5. Swap the minimum element into position i
    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push(createStep({
        type: 'swap',
        codeLine: 8, // swap(arr[i], arr[minIndex])
        swappedIndices: [i, minIdx],
        description: `Placing the minimum element into its final position: swapped arr[${i}] (${arr[i]}) with arr[${minIdx}] (${arr[minIdx]}).`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [i]: 'moving',
          [minIdx]: 'moving'
        }
      }));
    } else {
      steps.push(createStep({
        type: 'no-swap',
        codeLine: 8, // swap(arr[i], arr[minIndex])
        currentIndices: [i],
        description: `Element arr[${i}] (${arr[i]}) is already the minimum for this pass. No swap needed.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [i]: 'current'
        }
      }));
    }

    // 6. Mark position i as sorted
    sortedIndices.add(i);
    steps.push(createStep({
      type: 'mark-sorted',
      codeLine: 3, // for i from 0 to n - 2:
      currentIndices: [i],
      description: `Position ${i} is now permanently sorted with value ${arr[i]}. Sorted boundary advances.`,
      highlights: mapHighlights(sortedIndices)
    }));
  }

  // The final remaining element at index n - 1 is naturally sorted
  sortedIndices.add(n - 1);
  steps.push(createStep({
    type: 'mark-sorted',
    codeLine: 9, // return arr
    currentIndices: [n - 1],
    description: `The last remaining element at index ${n - 1} (${arr[n - 1]}) is naturally in its sorted position.`,
    highlights: mapHighlights(sortedIndices)
  }));

  // Complete state
  steps.push(createStep({
    type: 'complete',
    codeLine: 9, // return arr
    description: `Selection Sort complete! Array fully sorted in ${comparisons} comparisons and ${swaps} swaps.`,
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
