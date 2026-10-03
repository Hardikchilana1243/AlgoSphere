/**
 * Test Suite for Quick Sort Visualizer, Engine Integration & Schema Verification
 */

import { generateQuickSortSteps } from '../js/algorithms/sorting/quickSort.js';
import { generateBubbleSortSteps } from '../js/algorithms/sorting/bubbleSort.js';
import { generateSelectionSortSteps } from '../js/algorithms/sorting/selectionSort.js';
import { generateInsertionSortSteps } from '../js/algorithms/sorting/insertionSort.js';
import { generateMergeSortSteps } from '../js/algorithms/sorting/mergeSort.js';
import { ALGORITHM_METADATA } from '../js/data/algorithmMetadata.js';
import { StepEngine } from '../js/visualizer/stepEngine.js';
import { AnimationController } from '../js/visualizer/animationController.js';
import { Validation } from '../js/utils/validation.js';

console.log('--- RUNNING QUICK SORT AUTOMATED VERIFICATION ---');

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

// 1. Test Standard Array [5, 3, 8, 1, 2]
console.log('\nTest Case 1: Standard Array [5, 3, 8, 1, 2]');
{
  const input = [5, 3, 8, 1, 2];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length > 5, 'Generated multiple steps for standard array');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Final array is sorted [1, 2, 3, 5, 8]');
  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'finalStep.currentArray is sorted [1, 2, 3, 5, 8]');
  assert(finalStep.counters.comparisons > 0, `Recorded comparisons: got ${finalStep.counters.comparisons}`);
  assert(finalStep.comparisonCount > 0, `comparisonCount property is valid: got ${finalStep.comparisonCount}`);
  assert(finalStep.counters.swaps > 0, `Swaps recorded: got ${finalStep.counters.swaps}`);
  assert(finalStep.swapCount > 0, `swapCount property is valid: got ${finalStep.swapCount}`);
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
  assert(finalStep.codeLine === 1, 'Final step codeLine is 1 (function complete)');

  // Verify full metadata schema conformance across all steps
  let allStepsValid = true;
  let monotonicComparisons = true;
  let monotonicSwaps = true;
  let validCodeLines = true;
  let prevComp = 0;
  let prevSwaps = 0;

  for (let idx = 0; idx < steps.length; idx++) {
    const s = steps[idx];
    if (
      !Array.isArray(s.currentArray) ||
      !Array.isArray(s.comparedIndices) ||
      !Array.isArray(s.currentIndices) ||
      !Array.isArray(s.swappedIndices) ||
      !Array.isArray(s.sortedIndices) ||
      typeof s.comparisonCount !== 'number' ||
      typeof s.swapCount !== 'number' ||
      typeof s.explanation !== 'string' ||
      typeof s.pseudocodeLine !== 'number' ||
      !Array.isArray(s.array) ||
      typeof s.counters?.comparisons !== 'number' ||
      typeof s.counters?.swaps !== 'number' ||
      typeof s.codeLine !== 'number' ||
      typeof s.description !== 'string' ||
      typeof s.highlights !== 'object'
    ) {
      allStepsValid = false;
    }

    if (s.comparisonCount < prevComp) monotonicComparisons = false;
    if (s.swapCount < prevSwaps) monotonicSwaps = false;
    if (s.pseudocodeLine < 1 || s.pseudocodeLine > 13) validCodeLines = false;

    prevComp = s.comparisonCount;
    prevSwaps = s.swapCount;
  }

  assert(allStepsValid, 'All steps strictly conform to metadata schema (currentArray, comparedIndices, currentIndices, swappedIndices, sortedIndices, comparisonCount, swapCount, explanation, pseudocodeLine)');
  assert(monotonicComparisons, 'Comparison counts are monotonically non-decreasing');
  assert(monotonicSwaps, 'Swap counts are monotonically non-decreasing');
  assert(validCodeLines, 'All pseudocode line references are within valid range 1–13');

  // Verify key Quick Sort step types exist
  assert(steps.some(s => s.type === 'initial'), 'Contains initial step');
  assert(steps.some(s => s.type === 'pick-pivot'), 'Contains pick-pivot steps');
  assert(steps.some(s => s.type === 'compare'), 'Contains compare steps');
  assert(steps.some(s => s.type === 'swap'), 'Contains inner partition swap steps');
  assert(steps.some(s => s.type === 'place-pivot'), 'Contains place-pivot steps');
  assert(steps.some(s => s.type === 'partition-start'), 'Contains partition-start steps');
  assert(steps.some(s => s.type === 'complete'), 'Contains complete step');
}

// 2. Test Already Sorted Array [1, 2, 3, 4, 5] (Strict O(n²) worst-case comparisons for Lomuto partition)
console.log('\nTest Case 2: Already Sorted Array [1, 2, 3, 4, 5]');
{
  const input = [1, 2, 3, 4, 5];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array remains sorted [1, 2, 3, 4, 5]');
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
  assert(finalStep.comparisonCount === 10, `Comparisons must strictly be n*(n-1)/2 (10): got ${finalStep.comparisonCount}`);
  assert(finalStep.swapCount === 0, `Zero swaps on already sorted array with in-place Lomuto pivot placement: got ${finalStep.swapCount}`);
}

// 3. Test Reverse Sorted Array [5, 4, 3, 2, 1]
console.log('\nTest Case 3: Reverse Sorted Array [5, 4, 3, 2, 1]');
{
  const input = [5, 4, 3, 2, 1];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array sorted [1, 2, 3, 4, 5]');
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
  assert(finalStep.comparisonCount > 0, `Comparisons recorded: ${finalStep.comparisonCount}`);
  assert(finalStep.swapCount > 0, `Swaps recorded: ${finalStep.swapCount}`);
}

// 4. Test Duplicate Values [5, 5, 2, 2, 8]
console.log('\nTest Case 4: Duplicate Values [5, 5, 2, 2, 8]');
{
  const input = [5, 5, 2, 2, 8];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([2, 2, 5, 5, 8]), 'Duplicates sorted to [2, 2, 5, 5, 8]');
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
}

// 5. Test Duplicate-Heavy Array [5, 3, 5, 2, 5, 1]
console.log('\nTest Case 5: Duplicate-Heavy Array [5, 3, 5, 2, 5, 1]');
{
  const input = [5, 3, 5, 2, 5, 1];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 5, 5, 5]), 'Array sorted to [1, 2, 3, 5, 5, 5]');
  assert(finalStep.sortedIndices.length === 6, 'All 6 indices marked sorted');
  assert(!steps.some(s => Number.isNaN(s.comparisonCount)), 'No NaN in comparison counts');
}

// 6. Test All Equal Array [4, 4, 4, 4, 4]
console.log('\nTest Case 6: All Elements Equal [4, 4, 4, 4, 4]');
{
  const input = [4, 4, 4, 4, 4];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([4, 4, 4, 4, 4]), 'Equal array remains [4, 4, 4, 4, 4]');
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted without infinite recursion');
}

// 7. Test Single-Element Array [7]
console.log('\nTest Case 7: Single-Element Array [7]');
{
  const input = [7];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length >= 1, 'Generated steps for single-element array');
  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([7]), 'Array is [7]');
  assert(finalStep.comparisonCount === 0, 'Zero comparisons for single element');
  assert(finalStep.swapCount === 0, 'Zero swaps for single element');
  assert(finalStep.sortedIndices.includes(0), 'Index 0 marked sorted');
}

// 8. Test Empty Input []
console.log('\nTest Case 8: Empty Input []');
{
  const input = [];
  const steps = generateQuickSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length >= 1, 'Generated steps for empty array');
  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([]), 'Array is []');
  assert(finalStep.comparisonCount === 0, 'Zero comparisons for empty array');
  assert(finalStep.swapCount === 0, 'Zero swaps for empty array');
}

// 9. Test Multiple Arbitrary Random Arrays
console.log('\nTest Case 9: Multiple Arbitrary Random Arrays');
{
  const randomDatasets = [
    [38, 27, 43, 3, 9, 82, 10],
    [99, 12, 45, 67, 23, 89, 34, 1, 56],
    [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [42, 42, 17, 17, 99, 1, 8, 8, 42],
    [100, 1]
  ];

  randomDatasets.forEach((dataset, idx) => {
    const expected = [...dataset].sort((a, b) => a - b);
    const steps = generateQuickSortSteps(dataset);
    const finalStep = steps[steps.length - 1];

    assert(
      JSON.stringify(finalStep.currentArray) === JSON.stringify(expected),
      `Random array #${idx + 1} (${dataset.length} items) sorted correctly to [${expected.join(', ')}]`
    );
    assert(finalStep.sortedIndices.length === dataset.length, `All ${dataset.length} indices marked sorted`);
  });
}

// 10. StepEngine & AnimationController Integration
console.log('\nTest Case 10: StepEngine & AnimationController Integration');
{
  const engine = new StepEngine();
  const input = [5, 3, 8, 1, 2];
  const steps = generateQuickSortSteps(input);

  engine.load(steps, input);

  assert(engine.getTotalSteps() === steps.length, 'Engine loaded all steps');
  assert(engine.getStepIndex() === 0, 'Engine starts at step 0');
  assert(engine.hasNext() === true, 'Engine has next step');
  assert(engine.hasPrev() === false, 'Engine has no prev step at start');

  engine.next();
  assert(engine.getStepIndex() === 1, 'Engine advances to step 1');
  assert(engine.hasPrev() === true, 'Engine has prev step after advance');

  engine.prev();
  assert(engine.getStepIndex() === 0, 'Engine stepped backward to step 0');
  assert(JSON.stringify(engine.getCurrentStep().array) === JSON.stringify(steps[0].array), 'Step 0 array snapshot accurately restored');

  engine.jumpTo(4);
  assert(engine.getStepIndex() === 4, 'Engine jumped directly to step 4');

  engine.reset();
  assert(engine.getStepIndex() === 0, 'Engine reset returns to step 0');

  engine.jumpTo(steps.length - 1);
  assert(engine.isComplete() === true, 'Engine detects completion state at final step');

  // AnimationController playback controls & dynamic speed
  const anim = new AnimationController(engine, { speedMs: 300 });
  assert(anim.isPlaying === false, 'AnimationController initially paused');
  anim.setSpeed(120);
  assert(anim.speedMs === 120, 'AnimationController dynamic speed updated');
}

// 11. Validation Handling
console.log('\nTest Case 11: Input Validation Handling');
{
  const resEmpty = Validation.parseArrayInput('');
  const resWhitespace = Validation.parseArrayInput('   ');
  const resNull = Validation.parseArrayInput(null);
  const resNonNumeric = Validation.parseArrayInput('5, foo, 8');
  const resDecimal = Validation.parseArrayInput('5, 3.14, 8');
  const resOutOfRange = Validation.parseArrayInput('5, 120, 8');
  const resValidSingle = Validation.parseArrayInput('7', 1, 25);
  const resValidQuick = Validation.parseArrayInput('5, 3, 8, 1, 2', 1, 25);

  assert(!resEmpty.isValid, 'Empty string rejected');
  assert(!resWhitespace.isValid, 'Whitespace rejected');
  assert(!resNull.isValid, 'Null input rejected');
  assert(!resNonNumeric.isValid, 'Non-numeric string rejected');
  assert(!resDecimal.isValid, 'Decimal number rejected');
  assert(!resOutOfRange.isValid, 'Out of range number rejected');
  assert(resValidSingle.isValid, 'Single-element "7" accepted');
  assert(JSON.stringify(resValidSingle.data) === JSON.stringify([7]), 'Parsed single element as [7]');
  assert(resValidQuick.isValid, 'Valid array accepted');
  assert(JSON.stringify(resValidQuick.data) === JSON.stringify([5, 3, 8, 1, 2]), 'Parsed array accurately');
}

// 12. Metadata and Pseudocode Verification
console.log('\nTest Case 12: Metadata & Pseudocode Verification');
{
  const meta = ALGORITHM_METADATA.quickSort;
  assert(meta !== undefined, 'Quick Sort metadata exists in ALGORITHM_METADATA');
  assert(meta.name === 'Quick Sort', 'Name is "Quick Sort"');
  assert(meta.complexities.best === 'O(n log n)', 'Best case complexity is O(n log n)');
  assert(meta.complexities.average === 'O(n log n)', 'Average case complexity is O(n log n)');
  assert(meta.complexities.worst === 'O(n²)', 'Worst case complexity is O(n²)');
  assert(meta.complexities.space === 'O(log n)', 'Space complexity is O(log n)');
  assert(meta.complexities.stability === 'No', 'Stability is "No"');
  assert(meta.complexities.inPlace === 'Yes', 'In-place is "Yes"');
  assert(Array.isArray(meta.pseudocode), 'Pseudocode is an array of strings');
  assert(meta.pseudocode.length === 13, `Pseudocode has 13 lines: got ${meta.pseudocode.length}`);
}

// 13. Regression Safety for Bubble, Selection, Insertion & Merge Sort
console.log('\nTest Case 13: Regression Safety for Previous Algorithms');
{
  const bSteps = generateBubbleSortSteps([5, 3, 8, 1, 2]);
  const sSteps = generateSelectionSortSteps([5, 3, 8, 1, 2]);
  const iSteps = generateInsertionSortSteps([5, 3, 8, 1, 2]);
  const mSteps = generateMergeSortSteps([5, 3, 8, 1, 2]);

  assert(JSON.stringify(bSteps[bSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Bubble Sort intact');
  assert(JSON.stringify(sSteps[sSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Selection Sort intact');
  assert(JSON.stringify(iSteps[iSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Insertion Sort intact');
  assert(JSON.stringify(mSteps[mSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Merge Sort intact');

  assert(bSteps[bSteps.length - 1].counters.comparisons === 10, 'Bubble Sort comparisons intact');
  assert(sSteps[sSteps.length - 1].counters.comparisons === 10, 'Selection Sort comparisons intact');
  assert(iSteps[iSteps.length - 1].counters.comparisons === 9, 'Insertion Sort comparisons intact');
  assert(mSteps[mSteps.length - 1].counters.comparisons === 6, 'Merge Sort comparisons intact');
}

// 14. Algorithm Switching & State Resets
console.log('\nTest Case 14: Algorithm Switching Integration');
{
  const input = [5, 3, 8, 1, 2];
  const engine = new StepEngine();

  // Load Bubble Sort
  const bubbleSteps = generateBubbleSortSteps(input);
  engine.load(bubbleSteps, input);
  assert(engine.getTotalSteps() === bubbleSteps.length, 'Engine loaded initial Bubble Sort steps');

  // Advance engine a few steps
  engine.next();
  engine.next();
  assert(engine.getStepIndex() === 2, 'Engine advanced in Bubble Sort');

  // Switch to Quick Sort
  const quickSteps = generateQuickSortSteps(input);
  engine.load(quickSteps, input);
  assert(engine.getStepIndex() === 0, 'Switching to Quick Sort resets stepIndex to 0');
  assert(engine.getTotalSteps() === quickSteps.length, 'Engine loaded Quick Sort steps upon algorithm switch');
  assert(JSON.stringify(engine.getCurrentStep().currentArray) === JSON.stringify(input), 'Initial array state preserved on switch');

  // Step through Quick Sort to completion
  engine.jumpTo(quickSteps.length - 1);
  assert(engine.isComplete() === true, 'Quick Sort step engine completes accurately');
  assert(JSON.stringify(engine.getCurrentStep().currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Quick Sort final array is sorted');

  // Switch to Merge Sort and back to Quick Sort
  const mergeSteps = generateMergeSortSteps(input);
  engine.load(mergeSteps, input);
  assert(engine.getStepIndex() === 0, 'Switching to Merge Sort resets stepIndex to 0');

  engine.load(quickSteps, input);
  assert(engine.getStepIndex() === 0, 'Switching back to Quick Sort resets stepIndex to 0');
  assert(engine.getTotalSteps() === quickSteps.length, 'Quick Sort steps reloaded reliably');
}

console.log(`\n--- ALL QUICK SORT TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);

