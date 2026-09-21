/**
 * AlgoSphere - Array Utilities
 * Helper generators and checks for visualization datasets.
 */

/**
 * Generates an array of random integers between min and max
 * @param {number} size
 * @param {number} min
 * @param {number} max
 * @returns {number[]}
 */
export function generateRandomArray(size = 12, min = 10, max = 95) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return result;
}

/**
 * Generates a nearly sorted array with 2-3 swapped elements
 * @param {number} size
 * @returns {number[]}
 */
export function generateNearlySortedArray(size = 12) {
  const arr = [];
  const step = Math.floor(80 / size);
  for (let i = 0; i < size; i++) {
    arr.push(10 + i * step + Math.floor(Math.random() * 3));
  }
  // Introduce 2 small swaps
  if (size > 4) {
    const i1 = 2;
    const i2 = 3;
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
  }
  if (size > 8) {
    const i3 = size - 3;
    const i4 = size - 2;
    const temp = arr[i3];
    arr[i3] = arr[i4];
    arr[i4] = temp;
  }
  return arr;
}

/**
 * Generates a reverse-sorted array
 * @param {number} size
 * @returns {number[]}
 */
export function generateReverseSortedArray(size = 12) {
  const arr = [];
  const step = Math.floor(80 / size);
  for (let i = 0; i < size; i++) {
    arr.push(95 - i * step);
  }
  return arr;
}

/**
 * Generates an array with only 3-4 unique values repeated
 * @param {number} size
 * @returns {number[]}
 */
export function generateFewUniqueArray(size = 12) {
  const uniquePool = [15, 38, 65, 88];
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(uniquePool[Math.floor(Math.random() * uniquePool.length)]);
  }
  return arr;
}

/**
 * Checks if an array is sorted in ascending order
 * @param {number[]} arr
 * @returns {boolean}
 */
export function isSorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

/**
 * Deep clones a simple numeric array
 * @param {number[]} arr
 * @returns {number[]}
 */
export function cloneArray(arr) {
  return [...arr];
}
