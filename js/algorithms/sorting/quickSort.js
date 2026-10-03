/**
 * AlgoSphere - Quick Sort Algorithm
 * Generates an immutable event sequence with pivot selection, partitioning, and recursive bounds.
 * Pure algorithm function with zero DOM dependencies.
 */

export function generateQuickSortSteps(inputArray) {
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
    indices: config.comparedIndices || config.currentIndices || config.swappedIndices || [],
    highlights: config.highlights || {},
    counters: { comparisons, swaps },
    codeLine: config.codeLine,
    description: config.description
  });

  // Step 0: Initial State
  steps.push(createStep({
    type: 'initial',
    codeLine: 1,
    description: `Initialized Quick Sort with ${n} elements. Ready for recursive partitioning.`,
    highlights: mapHighlights(sortedIndices)
  }));

  // Handle empty array
  if (n === 0) {
    steps.push(createStep({
      type: 'complete',
      codeLine: 2,
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
      codeLine: 2,
      currentIndices: [0],
      sortedIndices: [0],
      description: `Array of size 1 (${arr[0]}) is trivially sorted. Base case reached (low >= high).`,
      highlights: { 0: 'sorted' }
    }));
    return steps;
  }

  function partition(low, high) {
    const pivot = arr[high];

    // Pick pivot step (Amber: state-current)
    steps.push(createStep({
      type: 'pick-pivot',
      codeLine: 8,
      currentIndices: [high],
      description: `Selected pivot element arr[${high}] = ${pivot} for partition range [${low}..${high}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        [high]: 'current'
      }
    }));

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      const isSmaller = arr[j] < pivot;
      const isEqual = arr[j] === pivot;

      // Comparison step (arr[j] Violet: state-comparing, pivot Amber: state-current)
      steps.push(createStep({
        type: 'compare',
        codeLine: 11,
        comparedIndices: [j, high],
        currentIndices: [high],
        description: isSmaller
          ? `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}): ${arr[j]} < ${pivot}. Element belongs in left partition.`
          : isEqual
            ? `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}): ${arr[j]} = ${pivot}. Equal value remains in right partition (standard Lomuto convention).`
            : `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}): ${arr[j]} > ${pivot}. Element remains in right partition.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [high]: 'current',
          [j]: 'comparing'
        }
      }));

      if (isSmaller) {
        i++;
        if (i !== j) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          // Swap step (Pink: state-moving / state-swapping)
          steps.push(createStep({
            type: 'swap',
            codeLine: 11,
            swappedIndices: [i, j],
            currentIndices: [high],
            description: `Swapped smaller element arr[${j}] (${arr[i]}) with arr[${i}] (${arr[j]}). Left partition boundary advances to index ${i}.`,
            highlights: {
              ...mapHighlights(sortedIndices),
              [high]: 'current',
              [i]: 'moving',
              [j]: 'moving'
            }
          }));
        }
      }
    }

    // Place pivot in correct sorted partition position
    const pivotIdx = i + 1;
    if (pivotIdx !== high) {
      swaps++;
      const temp = arr[pivotIdx];
      arr[pivotIdx] = arr[high];
      arr[high] = temp;

      sortedIndices.add(pivotIdx);

      // Place pivot step (Pink on moving, Green on newly sorted pivot)
      steps.push(createStep({
        type: 'place-pivot',
        codeLine: 12,
        swappedIndices: [pivotIdx, high],
        currentIndices: [pivotIdx],
        description: `Placed pivot ${pivot} into its sorted position at index ${pivotIdx} by swapping with arr[${high}]. Left elements are < ${pivot}, right elements are ≥ ${pivot}.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [high]: 'moving',
          [pivotIdx]: 'sorted'
        }
      }));
    } else {
      sortedIndices.add(pivotIdx);

      steps.push(createStep({
        type: 'place-pivot',
        codeLine: 12,
        currentIndices: [pivotIdx],
        description: `Pivot ${pivot} is already at its sorted partition position at index ${pivotIdx}. Subarray left is < ${pivot}.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [pivotIdx]: 'sorted'
        }
      }));
    }

    return pivotIdx;
  }

  function quick(low, high) {
    if (low >= high) {
      if (low === high) {
        sortedIndices.add(low);
        steps.push(createStep({
          type: 'single-element-sorted',
          codeLine: 2,
          currentIndices: [low],
          description: `Single remaining element at index ${low} (${arr[low]}) is in its final sorted position.`,
          highlights: mapHighlights(sortedIndices)
        }));
      }
      return;
    }

    steps.push(createStep({
      type: 'partition-start',
      codeLine: 3,
      currentIndices: [low, high],
      description: `Partitioning subarray range [${low}..${high}]: [${arr.slice(low, high + 1).join(', ')}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(low, high, 'current')
      }
    }));

    const p = partition(low, high);

    // Recursively process left partition
    if (low < p - 1) {
      steps.push(createStep({
        type: 'recurse-left',
        codeLine: 4,
        currentIndices: [low, p - 1],
        description: `Recursively sorting left partition [${low}..${p - 1}]: [${arr.slice(low, p).join(', ')}].`,
        highlights: {
          ...mapHighlights(sortedIndices),
          ...getSubarrayHighlights(low, p - 1, 'current')
        }
      }));
    }
    quick(low, p - 1);

    // Recursively process right partition
    if (p + 1 < high) {
      steps.push(createStep({
        type: 'recurse-right',
        codeLine: 5,
        currentIndices: [p + 1, high],
        description: `Recursively sorting right partition [${p + 1}..${high}]: [${arr.slice(p + 1, high + 1).join(', ')}].`,
        highlights: {
          ...mapHighlights(sortedIndices),
          ...getSubarrayHighlights(p + 1, high, 'current')
        }
      }));
    }
    quick(p + 1, high);
  }

  quick(0, n - 1);

  // Ensure all indices are in sortedIndices for complete step
  for (let idx = 0; idx < n; idx++) {
    sortedIndices.add(idx);
  }

  steps.push(createStep({
    type: 'complete',
    codeLine: 1,
    description: `Quick Sort complete! Array fully sorted in ${comparisons} comparisons and ${swaps} swaps.`,
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

function getSubarrayHighlights(low, high, state = 'current') {
  const h = {};
  for (let i = low; i <= high; i++) {
    h[i] = state;
  }
  return h;
}
