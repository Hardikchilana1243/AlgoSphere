/**
 * Test Suite for Day 1 - Bubble Sort Visualizer & Validation
 */

import { generateBubbleSortSteps } from '../js/algorithms/sorting/bubbleSort.js';
import { Validation } from '../js/utils/validation.js';

console.log('--- RUNNING DAY 1 AUTOMATED VERIFICATION ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

// 1. Test [5, 3, 8, 1, 2]
console.log('\nTest Case 1: Standard Array [5, 3, 8, 1, 2]');
{
  const input = [5, 3, 8, 1, 2];
  const steps = generateBubbleSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length > 5, 'Generated multiple steps');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Final array is sorted [1, 2, 3, 5, 8]');
  assert(finalStep.counters.comparisons > 0, `Recorded comparisons: ${finalStep.counters.comparisons}`);
  assert(finalStep.counters.swaps > 0, `Recorded swaps: ${finalStep.counters.swaps}`);
  assert(finalStep.sortedIndices.length === 5, 'All indices marked sorted');
  assert(finalStep.codeLine === 10, 'Final step pseudocode line is 10');

  // Verify step fields
  const firstStep = steps[0];
  assert(Array.isArray(firstStep.currentArray), 'Step has currentArray');
  assert(Array.isArray(firstStep.comparedIndices), 'Step has comparedIndices');
  assert(Array.isArray(firstStep.currentIndices), 'Step has currentIndices');
  assert(Array.isArray(firstStep.swappedIndices), 'Step has swappedIndices');
  assert(Array.isArray(firstStep.sortedIndices), 'Step has sortedIndices');
  assert(typeof firstStep.comparisonCount === 'number', 'Step has comparisonCount');
  assert(typeof firstStep.swapCount === 'number', 'Step has swapCount');
  assert(typeof firstStep.explanation === 'string', 'Step has explanation');
  assert(typeof firstStep.pseudocodeLine === 'number', 'Step has pseudocodeLine');
}

// 2. Test [1, 2, 3, 4, 5] (Already sorted, test O(n) early exit)
console.log('\nTest Case 2: Already Sorted Array [1, 2, 3, 4, 5]');
{
  const input = [1, 2, 3, 4, 5];
  const steps = generateBubbleSortSteps(input);
  const finalStep = steps[steps.length - 1];
  const earlyExitStep = steps.find(s => s.type === 'early-exit');

  assert(earlyExitStep !== undefined, 'Early exit step was triggered');
  assert(earlyExitStep.codeLine === 9, 'Early exit pseudocode line is 9 (if not swapped: break)');
  assert(finalStep.counters.swaps === 0, 'Zero swaps performed on already sorted array');
  assert(finalStep.counters.comparisons === 4, `Only n-1 comparisons (4) in Pass 1: got ${finalStep.counters.comparisons}`);
  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 4, 5]), 'Array remains correctly sorted');
}

// 3. Test [5, 4, 3, 2, 1] (Reverse sorted, worst-case)
console.log('\nTest Case 3: Reverse Sorted Array [5, 4, 3, 2, 1]');
{
  const input = [5, 4, 3, 2, 1];
  const steps = generateBubbleSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 4, 5]), 'Array correctly sorted to [1, 2, 3, 4, 5]');
  assert(finalStep.counters.comparisons === 10, `Comparisons in worst case is 10 (n*(n-1)/2): got ${finalStep.counters.comparisons}`);
  assert(finalStep.counters.swaps === 10, `Swaps in worst case is 10 (n*(n-1)/2): got ${finalStep.counters.swaps}`);
}

// 4. Test [5, 5, 2, 2, 8] (Duplicate values, stability)
console.log('\nTest Case 4: Duplicate Values [5, 5, 2, 2, 8]');
{
  const input = [5, 5, 2, 2, 8];
  const steps = generateBubbleSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.array) === JSON.stringify([2, 2, 5, 5, 8]), 'Duplicates sorted correctly to [2, 2, 5, 5, 8]');
  // Verify equal comparison does not swap
  const equalCompare = steps.find(s => s.type === 'compare' && s.description.includes('duplicate values are equal'));
  assert(equalCompare !== undefined, 'Duplicate comparison explanation notes stable relative order');
}

// 5. Test [7] (Single-element array)
console.log('\nTest Case 5: Single-Element Array [7]');
{
  const input = [7];
  const steps = generateBubbleSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length >= 2, 'Generated initial and complete step for single-element array');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([7]), 'Array is [7]');
  assert(finalStep.counters.comparisons === 0, 'Zero comparisons for single element');
  assert(finalStep.counters.swaps === 0, 'Zero swaps for single element');
  assert(finalStep.sortedIndices.includes(0), 'Index 0 marked sorted');
}

// 6. Validation: Empty input
console.log('\nTest Case 6: Validation - Empty Input');
{
  const res1 = Validation.parseArrayInput('');
  const res2 = Validation.parseArrayInput('   ');
  const res3 = Validation.parseArrayInput(null);

  assert(!res1.isValid, 'Empty string rejected');
  assert(res1.error.includes('Input cannot be empty'), 'Friendly error on empty string');
  assert(!res2.isValid, 'Whitespace rejected');
  assert(!res3.isValid, 'Null input rejected');
}

// 7. Validation: Invalid input
console.log('\nTest Case 7: Validation - Invalid Input');
{
  const resLetters = Validation.parseArrayInput('5, abc, 8');
  assert(!resLetters.isValid, 'Non-numeric string rejected');
  assert(resLetters.error.includes('"abc" at position 2 is not a valid number'), 'Clear error identifying non-numeric token');

  const resDecimal = Validation.parseArrayInput('5, 3.14, 8');
  assert(!resDecimal.isValid, 'Decimal number rejected');
  assert(resDecimal.error.includes('decimal number'), 'Helpful error identifying decimal number');

  const resOutOfRange = Validation.parseArrayInput('5, 150, 8');
  assert(!resOutOfRange.isValid, 'Out of range number rejected');
  assert(resOutOfRange.error.includes('out of range'), 'Clear error on out-of-range value');

  const resTooMany = Validation.parseArrayInput(new Array(30).fill(5).join(', '), 1, 25);
  assert(!resTooMany.isValid, 'Over 25 elements rejected');
  assert(resTooMany.error.includes('too large'), 'Clear error on excessively large array');

  // Single element array validation
  const resSingle = Validation.parseArrayInput('7', 1, 25);
  assert(resSingle.isValid, 'Single-element "7" is valid');
  assert(JSON.stringify(resSingle.data) === JSON.stringify([7]), 'Single-element parsed as [7]');
}

console.log(`\n--- ALL TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
