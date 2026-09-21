/**
 * AlgoSphere - Insertion Sort Algorithm
 * Generates an immutable event sequence highlighting key selection, shifts, and insertion points.
 */

export function generateInsertionSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set([0]);

  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [0],
    highlights: { 0: 'sorted' },
    counters: { comparisons, swaps },
    codeLine: 1,
    description: `Initialized Insertion Sort with ${n} elements. Index 0 ([${arr[0]}]) is trivially sorted.`
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      type: 'select-key',
      array: [...arr],
      indices: [i],
      highlights: {
        ...mapHighlights(sortedIndices),
        [i]: 'current'
      },
      counters: { comparisons, swaps },
      codeLine: 4,
      description: `Picked key element arr[${i}] = ${key}. Searching sorted portion to find its insertion slot.`
    });

    while (j >= 0) {
      comparisons++;
      const needShift = arr[j] > key;

      steps.push({
        type: 'compare',
        array: [...arr],
        indices: [j, j + 1],
        highlights: {
          ...mapHighlights(sortedIndices),
          [j]: 'comparing',
          [j + 1]: 'current'
        },
        counters: { comparisons, swaps },
        codeLine: 6,
        description: `Comparing arr[${j}] (${arr[j]}) with key (${key}). ${needShift ? `${arr[j]} > ${key}, shifting arr[${j}] right.` : `${arr[j]} ≤ ${key}, found correct insertion position.`}`
      });

      if (needShift) {
        swaps++;
        arr[j + 1] = arr[j];

        steps.push({
          type: 'shift',
          array: [...arr],
          indices: [j + 1],
          highlights: {
            ...mapHighlights(sortedIndices),
            [j + 1]: 'moving'
          },
          counters: { comparisons, swaps },
          codeLine: 7,
          description: `Shifted element ${arr[j]} from index ${j} to ${j + 1}.`
        });
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    sortedIndices.add(i);

    steps.push({
      type: 'insert',
      array: [...arr],
      indices: [j + 1],
      highlights: {
        ...mapHighlights(sortedIndices),
        [j + 1]: 'sorted'
      },
      counters: { comparisons, swaps },
      codeLine: 9,
      description: `Inserted key value ${key} into position ${j + 1}. Subarray [0..${i}] is now sorted.`
    });
  }

  for (let i = 0; i < n; i++) sortedIndices.add(i);

  steps.push({
    type: 'complete',
    array: [...arr],
    indices: [],
    highlights: mapHighlights(sortedIndices),
    counters: { comparisons, swaps },
    codeLine: 10,
    description: `Insertion Sort complete! Sorted in ${comparisons} comparisons and ${swaps} element shifts.`
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
