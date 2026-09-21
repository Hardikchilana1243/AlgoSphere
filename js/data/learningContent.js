/**
 * AlgoSphere - Learning Content & Educational Guides
 * Structured guides, Big-O reference matrix, and Computer Science glossary.
 */

export const LEARNING_CONTENT = {
  sortingBasics: {
    title: 'Sorting Fundamentals',
    summary: 'Sorting is the computational process of arranging elements in an ordered sequence (ascending or descending). It serves as the foundation for search optimization, data indexing, and computational geometry.',
    keyPoints: [
      {
        title: 'Comparison-Based Lower Bound',
        content: 'Any comparison-based sorting algorithm mathematically requires at least Ω(n log n) comparisons in the worst case (proven via decision tree height).'
      },
      {
        title: 'In-Place vs. Out-of-Place',
        content: 'An in-place algorithm sorts the array using O(1) or O(log n) auxiliary memory without allocating another copy of the array. Out-of-place algorithms like Merge Sort allocate O(n) auxiliary storage.'
      },
      {
        title: 'Algorithmic Stability',
        content: 'A sorting algorithm is stable if elements with identical keys appear in the same relative order in the output as they did in the input (crucial when sorting multi-column datasets).'
      }
    ]
  },

  searchingBasics: {
    title: 'Searching Fundamentals',
    summary: 'Searching is the algorithmic task of locating a specific target item within an element collection, returning its memory location or index.',
    keyPoints: [
      {
        title: 'Sequential vs. Binary Search',
        content: 'Linear search scans element by element in O(n) time. Binary search leverages sorted order to divide the search space in half with every comparison, achieving O(log n) efficiency.'
      },
      {
        title: 'Prerequisites for Logarithmic Search',
        content: 'Binary search requires random access indexing (arrays) and monotonically ordered values. For unsorted data, linear search is required unless the array is pre-sorted once.'
      },
      {
        title: 'Midpoint Calculation & Integer Overflow',
        content: 'In fixed-width integer languages (Java/C++), mid = (low + high) / 2 can overflow. The safer calculation is mid = low + floor((high - low) / 2).'
      }
    ]
  },

  bigOReference: {
    title: 'Big-O Complexity Cheat Sheet',
    summary: 'Asymptotic notation classifies algorithm performance as input size (n) grows towards infinity.',
    notations: [
      {
        complexity: 'O(1)',
        name: 'Constant Time',
        rating: 'Excellent',
        ratingClass: 'badge-success',
        example: 'Array index access, variable assignment'
      },
      {
        complexity: 'O(log n)',
        name: 'Logarithmic Time',
        rating: 'Good',
        ratingClass: 'badge-success',
        example: 'Binary search, balanced binary search tree operations'
      },
      {
        complexity: 'O(n)',
        name: 'Linear Time',
        rating: 'Fair',
        ratingClass: 'badge-secondary',
        example: 'Linear search, single loop across array'
      },
      {
        complexity: 'O(n log n)',
        name: 'Linearithmic Time',
        rating: 'Good (Optimal for comparison sort)',
        ratingClass: 'badge-primary',
        example: 'Merge Sort, Quick Sort (average), Heap Sort'
      },
      {
        complexity: 'O(n²)',
        name: 'Quadratic Time',
        rating: 'Poor (Scales poorly on large n)',
        ratingClass: 'badge-danger',
        example: 'Bubble Sort, Selection Sort, nested comparison loops'
      }
    ]
  },

  glossary: [
    {
      term: 'Comparison',
      category: 'Operation',
      definition: 'The evaluation of two elements (A and B) using relational operators (<, >, ==) to determine precedence.'
    },
    {
      term: 'Swap',
      category: 'Operation',
      definition: 'The exchange of positions between two elements in an array, typically requiring a temporary variable or XOR register.'
    },
    {
      term: 'Inversion',
      category: 'Measurement',
      definition: 'A pair of indices (i, j) such that i < j but arr[i] > arr[j]. The number of inversions measures how far an array is from being sorted.'
    },
    {
      term: 'Pivot',
      category: 'Quick Sort',
      definition: 'A selected element used as the reference point to partition an array into subsets of smaller and larger values.'
    },
    {
      term: 'Partition',
      category: 'Algorithm Strategy',
      definition: 'The rearrangement of array elements around a pivot such that elements ≤ pivot appear on the left, and elements > pivot appear on the right.'
    },
    {
      term: 'Search Space',
      category: 'Search',
      definition: 'The subset of indices or candidate items that could potentially contain the target value at any given phase of execution.'
    },
    {
      term: 'Divide and Conquer',
      category: 'Design Paradigm',
      definition: 'An algorithmic paradigm that breaks a problem into smaller independent subproblems, solves them recursively, and combines the results (e.g. Merge Sort).'
    },
    {
      term: 'Stable Sort',
      category: 'Property',
      definition: 'A sorting algorithm property ensuring elements with duplicate keys retain their original relative positions in the sorted result.'
    },
    {
      term: 'In-Place Algorithm',
      category: 'Property',
      definition: 'An algorithm that transforms the input without using an auxiliary data structure proportional to the input size (O(1) extra space).'
    }
  ]
};
