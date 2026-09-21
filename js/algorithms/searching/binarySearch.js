/**
 * AlgoSphere - Binary Search Algorithm
 * Generates an immutable event sequence with low/mid/high pointer tracking, eliminated search space, and bounds updates.
 */

export function generateBinarySearchSteps(inputArray, target) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;

  let low = 0;
  let high = n - 1;

  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [],
    pointers: { low, high },
    highlights: {},
    counters: { comparisons, swaps: 0 },
    codeLine: 1,
    description: `Initialized Binary Search for target ${target}. Search space spans indices [0..${high}].`,
    result: null
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = arr[mid];
    const isMatch = midVal === target;

    steps.push({
      type: 'calculate-mid',
      array: [...arr],
      indices: [mid],
      pointers: { low, mid, high },
      highlights: {
        ...getEliminatedHighlights(low, high, n),
        [mid]: 'current'
      },
      counters: { comparisons, swaps: 0 },
      codeLine: 4,
      description: `Calculated midpoint: index ${mid} (value: ${midVal}) between low (${low}) and high (${high}).`,
      result: null
    });

    steps.push({
      type: 'compare',
      array: [...arr],
      indices: [mid],
      pointers: { low, mid, high },
      highlights: {
        ...getEliminatedHighlights(low, high, n),
        [mid]: 'comparing'
      },
      counters: { comparisons, swaps: 0 },
      codeLine: 5,
      description: `Comparing arr[${mid}] (${midVal}) with target (${target}). ${isMatch ? 'Match found!' : midVal < target ? `${midVal} < ${target}: Target must be in the right half.` : `${midVal} > ${target}: Target must be in the left half.`}`,
      result: isMatch ? { found: true, index: mid, target, comparisons } : null
    });

    if (isMatch) {
      steps.push({
        type: 'found',
        array: [...arr],
        indices: [mid],
        pointers: { low, mid, high },
        highlights: {
          ...getEliminatedHighlights(low, high, n),
          [mid]: 'found'
        },
        counters: { comparisons, swaps: 0 },
        codeLine: 5,
        description: `SUCCESS: Target ${target} found at index ${mid} after ${comparisons} comparison${comparisons > 1 ? 's' : ''}!`,
        result: { found: true, index: mid, target, comparisons }
      });
      return steps;
    }

    if (midVal < target) {
      low = mid + 1;
      steps.push({
        type: 'adjust-bounds',
        array: [...arr],
        indices: [],
        pointers: { low, high },
        highlights: getEliminatedHighlights(low, high, n),
        counters: { comparisons, swaps: 0 },
        codeLine: 6,
        description: `Narrowing search window: Updated low = ${low}. Search space is now indices [${low}..${high}].`,
        result: null
      });
    } else {
      high = mid - 1;
      steps.push({
        type: 'adjust-bounds',
        array: [...arr],
        indices: [],
        pointers: { low, high },
        highlights: getEliminatedHighlights(low, high, n),
        counters: { comparisons, swaps: 0 },
        codeLine: 7,
        description: `Narrowing search window: Updated high = ${high}. Search space is now indices [${low}..${high}].`,
        result: null
      });
    }
  }

  // Not found
  const allEliminated = {};
  for (let i = 0; i < n; i++) allEliminated[i] = 'eliminated';

  steps.push({
    type: 'not-found',
    array: [...arr],
    indices: [],
    pointers: {},
    highlights: allEliminated,
    counters: { comparisons, swaps: 0 },
    codeLine: 8,
    description: `EXHAUSTED: Search window closed (low ${low} > high ${high}). Target ${target} is not in the array.`,
    result: { found: false, index: -1, target, comparisons }
  });

  return steps;
}

function getEliminatedHighlights(low, high, n) {
  const h = {};
  for (let i = 0; i < n; i++) {
    if (i < low || i > high) {
      h[i] = 'eliminated';
    }
  }
  return h;
}
