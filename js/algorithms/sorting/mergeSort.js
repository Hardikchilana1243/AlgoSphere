/**
 * AlgoSphere - Merge Sort Algorithm
 * Generates an immutable event sequence for recursive divide-and-conquer splitting and linear merging.
 * Pure algorithm function with zero DOM dependencies.
 */

export function generateMergeSortSteps(inputArray) {
  const steps = [];
  const arr = Array.isArray(inputArray) ? [...inputArray] : [];
  const n = arr.length;
  let comparisons = 0;
  let overwrites = 0; // In Merge Sort, overwrites/writes represent data movements
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
    swapCount: overwrites,
    explanation: config.description,
    pseudocodeLine: config.codeLine,

    // Backward-compatibility properties for existing renderer & engine
    array: [...arr],
    indices: config.comparedIndices || config.currentIndices || config.swappedIndices || [],
    highlights: config.highlights || {},
    counters: { comparisons, swaps: overwrites },
    codeLine: config.codeLine,
    description: config.description
  });

  // Step 0: Initial State
  steps.push(createStep({
    type: 'initial',
    codeLine: 1,
    description: `Initialized Merge Sort with ${n} elements. Ready for recursive divide-and-conquer.`,
    highlights: {}
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
      description: `Array of size 1 (${arr[0]}) is trivially sorted. Base case reached (left >= right).`,
      highlights: { 0: 'sorted' }
    }));
    return steps;
  }

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    steps.push(createStep({
      type: 'merge-start',
      codeLine: 8,
      currentIndices: [left, right],
      description: `Merging sorted halves: left [${leftArr.join(', ')}] (indices ${left}..${mid}) and right [${rightArr.join(', ')}] (indices ${mid + 1}..${right}).`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(left, mid, 'comparing'),
        ...getSubarrayHighlights(mid + 1, right, 'current')
      }
    }));

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const leftVal = leftArr[i];
      const rightVal = rightArr[j];
      const actualLeftIdx = left + i;
      const actualRightIdx = mid + 1 + j;

      steps.push(createStep({
        type: 'compare',
        codeLine: 9,
        comparedIndices: [actualLeftIdx, actualRightIdx],
        currentIndices: [k],
        description: `Comparing left element arr[${actualLeftIdx}] (${leftVal}) with right element arr[${actualRightIdx}] (${rightVal}).`,
        highlights: {
          ...mapHighlights(sortedIndices),
          ...getSubarrayHighlights(left, right, 'default'),
          [actualLeftIdx]: 'comparing',
          [actualRightIdx]: 'comparing',
          [k]: 'current'
        }
      }));

      // <= maintains stability: prefer left element on equality
      if (leftVal <= rightVal) {
        overwrites++;
        arr[k] = leftVal;
        steps.push(createStep({
          type: 'overwrite',
          codeLine: 10,
          swappedIndices: [k],
          currentIndices: [k],
          description: leftVal === rightVal
            ? `Values are equal (${leftVal}). Picking left element to maintain stability. Writing into arr[${k}].`
            : `Left element (${leftVal}) ≤ right element (${rightVal}). Writing smaller value into arr[${k}].`,
          highlights: {
            ...mapHighlights(sortedIndices),
            ...getSubarrayHighlights(left, right, 'default'),
            [k]: 'moving'
          }
        }));
        i++;
      } else {
        overwrites++;
        arr[k] = rightVal;
        steps.push(createStep({
          type: 'overwrite',
          codeLine: 10,
          swappedIndices: [k],
          currentIndices: [k],
          description: `Right element (${rightVal}) < left element (${leftVal}). Writing smaller value into arr[${k}].`,
          highlights: {
            ...mapHighlights(sortedIndices),
            ...getSubarrayHighlights(left, right, 'default'),
            [k]: 'moving'
          }
        }));
        j++;
      }
      k++;
    }

    // Copy remaining elements of leftArr, if any
    while (i < leftArr.length) {
      overwrites++;
      arr[k] = leftArr[i];
      steps.push(createStep({
        type: 'overwrite-remaining',
        codeLine: 11,
        swappedIndices: [k],
        currentIndices: [k],
        description: `Copying remaining left half element (${leftArr[i]}) into arr[${k}].`,
        highlights: {
          ...mapHighlights(sortedIndices),
          ...getSubarrayHighlights(left, right, 'default'),
          [k]: 'moving'
        }
      }));
      i++;
      k++;
    }

    // Copy remaining elements of rightArr, if any
    while (j < rightArr.length) {
      overwrites++;
      arr[k] = rightArr[j];
      steps.push(createStep({
        type: 'overwrite-remaining',
        codeLine: 11,
        swappedIndices: [k],
        currentIndices: [k],
        description: `Copying remaining right half element (${rightArr[j]}) into arr[${k}].`,
        highlights: {
          ...mapHighlights(sortedIndices),
          ...getSubarrayHighlights(left, right, 'default'),
          [k]: 'moving'
        }
      }));
      j++;
      k++;
    }

    const isFinalMerge = (left === 0 && right === n - 1);
    if (isFinalMerge) {
      for (let idx = 0; idx < n; idx++) {
        sortedIndices.add(idx);
      }
    }

    steps.push(createStep({
      type: 'merge-complete',
      codeLine: 6,
      currentIndices: [left, right],
      description: isFinalMerge
        ? `Final merge complete! Entire array [0..${n - 1}] is now fully merged and sorted.`
        : `Completed merge for range [${left}..${right}]: [${arr.slice(left, right + 1).join(', ')}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(left, right, isFinalMerge ? 'sorted' : 'current')
      }
    }));
  }

  function divideAndConquer(left, right) {
    if (left >= right) {
      steps.push(createStep({
        type: 'base-case',
        codeLine: 2,
        currentIndices: [left],
        description: `Subarray [${left}..${right}] has 1 element (${arr[left]}). Base case reached: already sorted.`,
        highlights: {
          ...mapHighlights(sortedIndices),
          [left]: 'current'
        }
      }));
      return;
    }

    const mid = Math.floor((left + right) / 2);

    steps.push(createStep({
      type: 'split',
      codeLine: 3,
      currentIndices: [mid],
      comparedIndices: [left, right],
      description: `Dividing range [${left}..${right}] at midpoint ${mid}. Left: [${left}..${mid}], Right: [${mid + 1}..${right}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(left, right, 'current'),
        [mid]: 'current'
      }
    }));

    steps.push(createStep({
      type: 'recurse-left',
      codeLine: 4,
      currentIndices: [left, mid],
      description: `Recursively sorting left half [${left}..${mid}]: [${arr.slice(left, mid + 1).join(', ')}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(left, mid, 'current')
      }
    }));
    divideAndConquer(left, mid);

    steps.push(createStep({
      type: 'recurse-right',
      codeLine: 5,
      currentIndices: [mid + 1, right],
      description: `Recursively sorting right half [${mid + 1}..${right}]: [${arr.slice(mid + 1, right + 1).join(', ')}].`,
      highlights: {
        ...mapHighlights(sortedIndices),
        ...getSubarrayHighlights(mid + 1, right, 'current')
      }
    }));
    divideAndConquer(mid + 1, right);

    merge(left, mid, right);
  }

  divideAndConquer(0, n - 1);

  // Ensure all indices are marked sorted for final state
  for (let idx = 0; idx < n; idx++) {
    sortedIndices.add(idx);
  }

  steps.push(createStep({
    type: 'complete',
    codeLine: 1,
    description: `Merge Sort complete! Array fully sorted in ${comparisons} comparisons and ${overwrites} write operations.`,
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

function getSubarrayHighlights(left, right, state = 'comparing') {
  const h = {};
  for (let i = left; i <= right; i++) {
    h[i] = state;
  }
  return h;
}
