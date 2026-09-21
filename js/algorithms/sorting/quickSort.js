/**
 * AlgoSphere - Quick Sort Algorithm
 * Generates an immutable event sequence with pivot selection, partitioning, and recursive bounds.
 */

export function generateQuickSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set();

  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [],
    highlights: {},
    counters: { comparisons, swaps },
    codeLine: 1,
    description: `Initialized Quick Sort with ${n} elements. Preparing partition steps.`
  });

  function partition(low, high) {
    const pivot = arr[high];

    steps.push({
      type: 'pick-pivot',
      array: [...arr],
      indices: [high],
      highlights: {
        ...mapHighlights(sortedIndices),
        [high]: 'pivot'
      },
      counters: { comparisons, swaps },
      codeLine: 8,
      description: `Selected pivot element arr[${high}] = ${pivot} for partition range [${low}..${high}].`
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      const isSmaller = arr[j] < pivot;

      steps.push({
        type: 'compare',
        array: [...arr],
        indices: [j, high],
        highlights: {
          ...mapHighlights(sortedIndices),
          [high]: 'pivot',
          [j]: 'comparing',
          ...(i >= low ? { [i]: 'current' } : {})
        },
        counters: { comparisons, swaps },
        codeLine: 11,
        description: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivot}). ${isSmaller ? `${arr[j]} < ${pivot}, advancing partition pointer and swapping.` : `${arr[j]} ≥ ${pivot}, leaving on right side.`}`
      });

      if (isSmaller) {
        i++;
        if (i !== j) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            type: 'swap',
            array: [...arr],
            indices: [i, j],
            highlights: {
              ...mapHighlights(sortedIndices),
              [high]: 'pivot',
              [i]: 'moving',
              [j]: 'moving'
            },
            counters: { comparisons, swaps },
            codeLine: 11,
            description: `Swapped smaller element arr[${j}] with arr[${i}]. Array is now [${arr.join(', ')}].`
          });
        }
      }
    }

    // Place pivot in correct sorted partition position
    swaps++;
    const pivotIdx = i + 1;
    const temp = arr[pivotIdx];
    arr[pivotIdx] = arr[high];
    arr[high] = temp;

    sortedIndices.add(pivotIdx);

    steps.push({
      type: 'place-pivot',
      array: [...arr],
      indices: [pivotIdx, high],
      highlights: {
        ...mapHighlights(sortedIndices),
        [pivotIdx]: 'sorted'
      },
      counters: { comparisons, swaps },
      codeLine: 12,
      description: `Moved pivot ${pivot} into its sorted position at index ${pivotIdx}. Subarray left is ≤ ${pivot}, right is ≥ ${pivot}.`
    });

    return pivotIdx;
  }

  function quick(low, high) {
    if (low <= high) {
      if (low === high) {
        sortedIndices.add(low);
        steps.push({
          type: 'single-element-sorted',
          array: [...arr],
          indices: [low],
          highlights: mapHighlights(sortedIndices),
          counters: { comparisons, swaps },
          codeLine: 2,
          description: `Single element at index ${low} is sorted.`
        });
        return;
      }

      const p = partition(low, high);
      quick(low, p - 1);
      quick(p + 1, high);
    }
  }

  quick(0, n - 1);

  for (let idx = 0; idx < n; idx++) sortedIndices.add(idx);

  steps.push({
    type: 'complete',
    array: [...arr],
    indices: [],
    highlights: mapHighlights(sortedIndices),
    counters: { comparisons, swaps },
    codeLine: 13,
    description: `Quick Sort complete! Array fully sorted in ${comparisons} comparisons and ${swaps} swaps.`
  });

  return steps;
}

function mapHighlights(sortedSet) {
  const highlights = {};
  sortedSet.forEach(idx => {
    highlights[idx] = 'sorted';
  });
  return highlights;
}
