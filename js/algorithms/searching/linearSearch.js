/**
 * AlgoSphere - Linear Search Algorithm
 * Generates an immutable event sequence with sequential pointer tracking, comparisons, and match confirmation.
 */

export function generateLinearSearchSteps(inputArray, target) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;

  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [],
    pointers: {},
    highlights: {},
    counters: { comparisons, swaps: 0 },
    codeLine: 1,
    description: `Initialized Linear Search for target ${target} across ${n} elements.`,
    result: null
  });

  for (let i = 0; i < n; i++) {
    comparisons++;
    const isMatch = arr[i] === target;

    steps.push({
      type: 'compare',
      array: [...arr],
      indices: [i],
      pointers: { current: i },
      highlights: {
        ...getScannedHighlights(i),
        [i]: 'comparing'
      },
      counters: { comparisons, swaps: 0 },
      codeLine: 3,
      description: `Examining index ${i} (value: ${arr[i]}). Target is ${target}. ${isMatch ? 'Values match!' : 'No match, advancing to next cell.'}`,
      result: isMatch ? { found: true, index: i, target, comparisons } : null
    });

    if (isMatch) {
      steps.push({
        type: 'found',
        array: [...arr],
        indices: [i],
        pointers: { current: i },
        highlights: {
          ...getScannedHighlights(i),
          [i]: 'found'
        },
        counters: { comparisons, swaps: 0 },
        codeLine: 4,
        description: `SUCCESS: Target value ${target} found at index ${i} after ${comparisons} comparison${comparisons > 1 ? 's' : ''}!`,
        result: { found: true, index: i, target, comparisons }
      });
      return steps;
    }
  }

  // Not found
  steps.push({
    type: 'not-found',
    array: [...arr],
    indices: [],
    pointers: {},
    highlights: getScannedHighlights(n),
    counters: { comparisons, swaps: 0 },
    codeLine: 5,
    description: `EXHAUSTED: Target value ${target} was not found in array after examining all ${n} elements.`,
    result: { found: false, index: -1, target, comparisons }
  });

  return steps;
}

function getScannedHighlights(currentIdx) {
  const h = {};
  for (let i = 0; i < currentIdx; i++) {
    h[i] = 'eliminated';
  }
  return h;
}
