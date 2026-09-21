/**
 * AlgoSphere - Bubble Sort Algorithm
 * Generates an immutable event sequence with snapshots, operation counters, and pseudocode synchronization.
 */

export function generateBubbleSortSteps(inputArray) {
  const steps = [];
  const arr = [...inputArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set();

  // Step 0: Initial State
  steps.push({
    type: 'initial',
    array: [...arr],
    indices: [],
    highlights: {},
    counters: { comparisons, swaps },
    codeLine: 1,
    description: `Initialized Bubble Sort with ${n} elements.`
  });

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Loop header
    steps.push({
      type: 'iteration-start',
      array: [...arr],
      indices: [],
      highlights: mapHighlights(sortedIndices),
      counters: { comparisons, swaps },
      codeLine: 3,
      description: `Starting Pass ${i + 1} of ${n - 1}. Largest unsorted value will bubble to index ${n - 1 - i}.`
    });

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Comparison step
      const isGreater = arr[j] > arr[j + 1];
      steps.push({
        type: 'compare',
        array: [...arr],
        indices: [j, j + 1],
        highlights: {
          ...mapHighlights(sortedIndices),
          [j]: 'comparing',
          [j + 1]: 'comparing'
        },
        counters: { comparisons, swaps },
        codeLine: 6,
        description: `Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}). ${isGreater ? `${arr[j]} > ${arr[j + 1]}, swap required.` : `${arr[j]} ≤ ${arr[j + 1]}, in correct relative order.`}`
      });

      if (isGreater) {
        swaps++;
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        // Swap step
        steps.push({
          type: 'swap',
          array: [...arr],
          indices: [j, j + 1],
          highlights: {
            ...mapHighlights(sortedIndices),
            [j]: 'moving',
            [j + 1]: 'moving'
          },
          counters: { comparisons, swaps },
          codeLine: 7,
          description: `Swapped arr[${j}] and arr[${j + 1}]. Array is now [${arr.join(', ')}].`
        });
      }
    }

    // Element at n - 1 - i is now guaranteed sorted
    sortedIndices.add(n - 1 - i);
    steps.push({
      type: 'mark-sorted',
      array: [...arr],
      indices: [n - 1 - i],
      highlights: mapHighlights(sortedIndices),
      counters: { comparisons, swaps },
      codeLine: 3,
      description: `Element ${arr[n - 1 - i]} is now permanently settled at sorted index ${n - 1 - i}.`
    });

    if (!swapped) {
      steps.push({
        type: 'early-exit',
        array: [...arr],
        indices: [],
        highlights: mapHighlights(sortedIndices),
        counters: { comparisons, swaps },
        codeLine: 9,
        description: 'No swaps occurred during this entire pass. Array is fully sorted early!'
      });
      break;
    }
  }

  // Mark all indices sorted
  for (let i = 0; i < n; i++) sortedIndices.add(i);

  steps.push({
    type: 'complete',
    array: [...arr],
    indices: [],
    highlights: mapHighlights(sortedIndices),
    counters: { comparisons, swaps },
    codeLine: 10,
    description: `Bubble Sort complete! Sorted in ${comparisons} comparisons and ${swaps} swaps.`
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
