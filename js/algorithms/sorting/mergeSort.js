/**
 * AlgoSphere - Merge Sort Algorithm
 * Generates an immutable event sequence for divide-and-conquer splitting and linear merging.
 */

export function generateMergeSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0; // In merge sort, overwrites count as data movements

  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [],
    highlights: {},
    counters: { comparisons, swaps },
    codeLine: 1,
    description: `Initialized Merge Sort with ${n} elements. Preparing recursive divide & conquer.`
  });

  function merge(left, mid, right) {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    steps.push({
      type: 'merge-start',
      array: [...arr],
      indices: [left, right],
      highlights: getSubarrayHighlights(left, right),
      counters: { comparisons, swaps },
      codeLine: 8,
      description: `Merging sorted halves: left [${leftArr.join(', ')}] and right [${rightArr.join(', ')}].`
    });

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      const leftVal = leftArr[i];
      const rightVal = rightArr[j];

      steps.push({
        type: 'compare',
        array: [...arr],
        indices: [left + i, mid + 1 + j],
        highlights: {
          ...getSubarrayHighlights(left, right),
          [left + i]: 'comparing',
          [mid + 1 + j]: 'comparing'
        },
        counters: { comparisons, swaps },
        codeLine: 9,
        description: `Comparing left element ${leftVal} with right element ${rightVal}.`
      });

      if (leftVal <= rightVal) {
        swaps++;
        arr[k] = leftVal;
        steps.push({
          type: 'overwrite',
          array: [...arr],
          indices: [k],
          highlights: {
            ...getSubarrayHighlights(left, right),
            [k]: 'moving'
          },
          counters: { comparisons, swaps },
          codeLine: 10,
          description: `Placed smaller element ${leftVal} into position arr[${k}].`
        });
        i++;
      } else {
        swaps++;
        arr[k] = rightVal;
        steps.push({
          type: 'overwrite',
          array: [...arr],
          indices: [k],
          highlights: {
            ...getSubarrayHighlights(left, right),
            [k]: 'moving'
          },
          counters: { comparisons, swaps },
          codeLine: 10,
          description: `Placed smaller element ${rightVal} into position arr[${k}].`
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      swaps++;
      arr[k] = leftArr[i];
      steps.push({
        type: 'overwrite-remaining',
        array: [...arr],
        indices: [k],
        highlights: {
          ...getSubarrayHighlights(left, right),
          [k]: 'moving'
        },
        counters: { comparisons, swaps },
        codeLine: 10,
        description: `Copied remaining left element ${leftArr[i]} into arr[${k}].`
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      swaps++;
      arr[k] = rightArr[j];
      steps.push({
        type: 'overwrite-remaining',
        array: [...arr],
        indices: [k],
        highlights: {
          ...getSubarrayHighlights(left, right),
          [k]: 'moving'
        },
        counters: { comparisons, swaps },
        codeLine: 10,
        description: `Copied remaining right element ${rightArr[j]} into arr[${k}].`
      });
      j++;
      k++;
    }

    steps.push({
      type: 'merge-complete',
      array: [...arr],
      indices: [left, right],
      highlights: getSubarrayHighlights(left, right, right === n - 1 && left === 0 ? 'sorted' : 'current'),
      counters: { comparisons, swaps },
      codeLine: 6,
      description: `Completed merge for range [${left}..${right}]: [${arr.slice(left, right + 1).join(', ')}].`
    });
  }

  function divideAndConquer(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: 'split',
      array: [...arr],
      indices: [mid],
      highlights: {
        [mid]: 'current'
      },
      counters: { comparisons, swaps },
      codeLine: 3,
      description: `Splitting range [${left}..${right}] at midpoint ${mid}. Left: [${left}..${mid}], Right: [${mid + 1}..${right}].`
    });

    divideAndConquer(left, mid);
    divideAndConquer(mid + 1, right);
    merge(left, mid, right);
  }

  divideAndConquer(0, n - 1);

  const allSorted = {};
  for (let idx = 0; idx < n; idx++) allSorted[idx] = 'sorted';

  steps.push({
    type: 'complete',
    array: [...arr],
    indices: [],
    highlights: allSorted,
    counters: { comparisons, swaps },
    codeLine: 6,
    description: `Merge Sort complete! Array sorted in ${comparisons} comparisons and ${swaps} write operations.`
  });

  return steps;
}

function getSubarrayHighlights(left, right, state = 'comparing') {
  const h = {};
  for (let i = left; i <= right; i++) {
    h[i] = state;
  }
  return h;
}
