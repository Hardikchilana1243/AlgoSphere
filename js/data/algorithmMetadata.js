/**
 * AlgoSphere - Algorithm Metadata & Pseudocode Definitions
 * Curated metadata, complexities, and 1-indexed pseudocode for visualizer synchronization.
 */

export const ALGORITHM_METADATA = {
  bubbleSort: {
    id: 'bubbleSort',
    name: 'Bubble Sort',
    category: 'sorting',
    shortSummary: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if out of order.',
    description: 'Bubble Sort is a straightforward comparison-based algorithm. On each pass, the largest unsorted element "bubbles up" to its correct position at the end of the array. An optimization flag stops early if no swaps occurred.',
    complexities: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stability: 'Stable',
      inPlace: 'Yes'
    },
    tags: ['Comparison', 'In-Place', 'Stable', 'Beginner'],
    pseudocode: [
      'function bubbleSort(arr):',
      '  n = length(arr)',
      '  for i from 0 to n - 1:',
      '    swapped = false',
      '    for j from 0 to n - i - 2:',
      '      if arr[j] > arr[j + 1]:',
      '        swap(arr[j], arr[j + 1])',
      '        swapped = true',
      '    if not swapped: break',
      '  return arr'
    ]
  },

  selectionSort: {
    id: 'selectionSort',
    name: 'Selection Sort',
    category: 'sorting',
    shortSummary: 'Finds the smallest element in the unsorted portion and swaps it into the beginning.',
    description: 'Selection Sort divides the array into a sorted subarray and an unsorted subarray. In each iteration, it performs linear scan over the unsorted section to find the minimum value and swaps it with the first unsorted element.',
    complexities: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stability: 'Unstable',
      inPlace: 'Yes'
    },
    tags: ['Comparison', 'In-Place', 'Selection', 'Fixed Swaps'],
    pseudocode: [
      'function selectionSort(arr):',
      '  n = length(arr)',
      '  for i from 0 to n - 1:',
      '    minIdx = i',
      '    for j from i + 1 to n - 1:',
      '      if arr[j] < arr[minIdx]:',
      '        minIdx = j',
      '    if minIdx != i:',
      '      swap(arr[i], arr[minIdx])',
      '  return arr'
    ]
  },

  insertionSort: {
    id: 'insertionSort',
    name: 'Insertion Sort',
    category: 'sorting',
    shortSummary: 'Builds the sorted array one item at a time by repeatedly inserting elements into place.',
    description: 'Insertion Sort operates like sorting playing cards in hand. It iterates through the array, taking each current element and shifting greater sorted elements to the right to make room for its insertion.',
    complexities: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
      stability: 'Stable',
      inPlace: 'Yes'
    },
    tags: ['Comparison', 'In-Place', 'Adaptive', 'Stable'],
    pseudocode: [
      'function insertionSort(arr):',
      '  n = length(arr)',
      '  for i from 1 to n - 1:',
      '    key = arr[i]',
      '    j = i - 1',
      '    while j >= 0 and arr[j] > key:',
      '      arr[j + 1] = arr[j]',
      '      j = j - 1',
      '    arr[j + 1] = key',
      '  return arr'
    ]
  },

  mergeSort: {
    id: 'mergeSort',
    name: 'Merge Sort',
    category: 'sorting',
    shortSummary: 'Divide-and-conquer algorithm that recursively splits arrays and merges sorted halves.',
    description: 'Merge Sort recursively divides the array into halves until single-element subarrays remain. It then merges adjacent sorted lists back together in linear time, guaranteeing O(n log n) runtime across all inputs.',
    complexities: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)',
      stability: 'Stable',
      inPlace: 'No'
    },
    tags: ['Divide & Conquer', 'Guaranteed O(n log n)', 'Stable'],
    pseudocode: [
      'function mergeSort(arr, left, right):',
      '  if left >= right: return',
      '  mid = floor((left + right) / 2)',
      '  mergeSort(arr, left, mid)',
      '  mergeSort(arr, mid + 1, right)',
      '  merge(arr, left, mid, right)',
      '',
      'function merge(arr, left, mid, right):',
      '  compare elements from left & right halves',
      '  overwrite arr[k] with smaller element'
    ]
  },

  quickSort: {
    id: 'quickSort',
    name: 'Quick Sort',
    category: 'sorting',
    shortSummary: 'Picks a pivot, partitions elements around it, and recursively sorts sub-partitions.',
    description: 'Quick Sort selects a pivot element and rearranges the array such that all items smaller than the pivot precede it and all items larger follow it. It then recursively repeats on both partitions with minimal auxiliary space.',
    complexities: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(log n)',
      stability: 'Unstable',
      inPlace: 'Yes'
    },
    tags: ['Divide & Conquer', 'Partitioning', 'Cache-Friendly', 'In-Place'],
    pseudocode: [
      'function quickSort(arr, low, high):',
      '  if low < high:',
      '    p = partition(arr, low, high)',
      '    quickSort(arr, low, p - 1)',
      '    quickSort(arr, p + 1, high)',
      '',
      'function partition(arr, low, high):',
      '  pivot = arr[high]',
      '  i = low - 1',
      '  for j from low to high - 1:',
      '    if arr[j] < pivot: i++; swap(arr[i], arr[j])',
      '  swap(arr[i + 1], arr[high])',
      '  return i + 1'
    ]
  },

  linearSearch: {
    id: 'linearSearch',
    name: 'Linear Search',
    category: 'searching',
    shortSummary: 'Sequentially checks every element in the array until a match is found or the end is reached.',
    description: 'Linear Search is the most fundamental searching algorithm. It requires no preconditions or pre-sorting on the input array. It examines elements one by one from start to finish.',
    complexities: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)',
      space: 'O(1)',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    tags: ['Sequential', 'Unsorted Data', 'Elementary'],
    pseudocode: [
      'function linearSearch(arr, target):',
      '  for i from 0 to length(arr) - 1:',
      '    if arr[i] == target:',
      '      return i  // Match found',
      '  return -1    // Target not present'
    ]
  },

  binarySearch: {
    id: 'binarySearch',
    name: 'Binary Search',
    category: 'searching',
    shortSummary: 'Repeatedly halves the search space in a sorted array by comparing the target with the middle element.',
    description: 'Binary Search operates on a sorted array by maintaining low and high bounds. It compares the middle element with the target. If equal, target is found; if target is smaller, search continues in the left half; otherwise in the right half.',
    complexities: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)',
      space: 'O(1)',
      stability: 'N/A',
      inPlace: 'Yes'
    },
    tags: ['Divide & Conquer', 'Logarithmic', 'Requires Sorted Array'],
    pseudocode: [
      'function binarySearch(arr, target):',
      '  low = 0, high = length(arr) - 1',
      '  while low <= high:',
      '    mid = floor((low + high) / 2)',
      '    if arr[mid] == target: return mid',
      '    else if arr[mid] < target: low = mid + 1',
      '    else: high = mid - 1',
      '  return -1  // Target not found'
    ]
  }
};
