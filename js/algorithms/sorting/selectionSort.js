/**
 * AlgoSphere - Selection Sort Algorithm
 * Generates an immutable event sequence with snapshots, minimum-index tracking, and step descriptions.
 */

export function generateSelectionSortSteps(inputArray) {
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
    description: `Initialized Selection Sort with ${n} elements.`
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      type: 'iteration-start',
      array: [...arr],
      indices: [i],
      highlights: {
        ...mapHighlights(sortedIndices),
        [i]: 'current'
      },
      counters: { comparisons, swaps },
      codeLine: 4,
      description: `Starting pass for index ${i}. Initializing minimum element candidate to arr[${i}] (${arr[i]}).`
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      const isNewMin = arr[j] < arr[minIdx];

      steps.push({
        type: 'compare',
        array: [...arr],
        indices: [j, minIdx],
        highlights: {
          ...mapHighlights(sortedIndices),
          [minIdx]: 'current',
          [j]: 'comparing'
        },
        counters: { comparisons, swaps },
        codeLine: 6,
        description: `Comparing candidate arr[${j}] (${arr[j]}) against current min arr[${minIdx}] (${arr[minIdx]}). ${isNewMin ? `Found new smaller value (${arr[j]}).` : 'Not smaller.'}`
      });

      if (isNewMin) {
        minIdx = j;
        steps.push({
          type: 'new-min',
          array: [...arr],
          indices: [minIdx],
          highlights: {
            ...mapHighlights(sortedIndices),
            [i]: 'comparing',
            [minIdx]: 'current'
          },
          counters: { comparisons, swaps },
          codeLine: 7,
          description: `Updated minimum index to ${minIdx} (value: ${arr[minIdx]}).`
        });
      }
    }

    if (minIdx !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        type: 'swap',
        array: [...arr],
        indices: [i, minIdx],
        highlights: {
          ...mapHighlights(sortedIndices),
          [i]: 'moving',
          [minIdx]: 'moving'
        },
        counters: { comparisons, swaps },
        codeLine: 9,
        description: `Swapped minimum element ${arr[i]} into target position index ${i}.`
      });
    } else {
      steps.push({
        type: 'no-swap',
        array: [...arr],
        indices: [i],
        highlights: {
          ...mapHighlights(sortedIndices),
          [i]: 'current'
        },
        counters: { comparisons, swaps },
        codeLine: 8,
        description: `Element ${arr[i]} at index ${i} is already the minimum for this pass. No swap needed.`
      });
    }

    sortedIndices.add(i);
    steps.push({
      type: 'mark-sorted',
      array: [...arr],
      indices: [i],
      highlights: mapHighlights(sortedIndices),
      counters: { comparisons, swaps },
      codeLine: 4,
      description: `Index ${i} (${arr[i]}) is now permanently sorted.`
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
    description: `Selection Sort complete! Sorted in ${comparisons} comparisons and ${swaps} swaps.`
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
