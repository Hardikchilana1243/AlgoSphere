/**
 * Test Suite for Selection Sort Visualizer, Engine Integration & Validation
 */

import { generateSelectionSortSteps } from '../js/algorithms/sorting/selectionSort.js';
import { generateBubbleSortSteps } from '../js/algorithms/sorting/bubbleSort.js';
import { ALGORITHM_METADATA } from '../js/data/algorithmMetadata.js';
import { StepEngine } from '../js/visualizer/stepEngine.js';
import { AnimationController } from '../js/visualizer/animationController.js';
import { Validation } from '../js/utils/validation.js';

console.log('--- RUNNING SELECTION SORT AUTOMATED VERIFICATION ---');

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

// 1. Test [5, 3, 8, 1, 2] (Standard Array)
console.log('\nTest Case 1: Standard Array [5, 3, 8, 1, 2]');
{
  const input = [5, 3, 8, 1, 2];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length > 5, 'Generated multiple steps for standard array');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Final array is sorted [1, 2, 3, 5, 8]');
  assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'finalStep.currentArray is sorted [1, 2, 3, 5, 8]');
  assert(finalStep.counters.comparisons === 10, `Comparisons is exactly 10 (n*(n-1)/2): got ${finalStep.counters.comparisons}`);
  assert(finalStep.comparisonCount === 10, `comparisonCount property is 10: got ${finalStep.comparisonCount}`);
  assert(finalStep.counters.swaps === 3, `Swaps is exactly 3: got ${finalStep.counters.swaps}`);
  assert(finalStep.swapCount === 3, `swapCount property is 3: got ${finalStep.swapCount}`);
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
  assert(finalStep.codeLine === 9, 'Final step codeLine is 9 (return arr)');
  assert(finalStep.pseudocodeLine === 9, 'Final step pseudocodeLine is 9');

  // Verify all required step properties across all generated steps
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
    if (s.pseudocodeLine < 1 || s.pseudocodeLine > 9) validCodeLines = false;

    prevComp = s.comparisonCount;
    prevSwaps = s.swapCount;
  }

  assert(allStepsValid, 'All steps strictly conform to metadata schema (currentArray, comparedIndices, currentIndices, swappedIndices, sortedIndices, comparisonCount, swapCount, explanation, pseudocodeLine)');
  assert(monotonicComparisons, 'Comparison counts are monotonically non-decreasing');
  assert(monotonicSwaps, 'Swap counts are monotonically non-decreasing');
  assert(validCodeLines, 'All pseudocode line references are within valid range 1–9');

  // Verify key Selection Sort step types were generated
  const hasIterationStart = steps.some(s => s.type === 'iteration-start');
  const hasCompare = steps.some(s => s.type === 'compare');
  const hasNewMin = steps.some(s => s.type === 'new-min');
  const hasSwap = steps.some(s => s.type === 'swap');
  const hasNoSwap = steps.some(s => s.type === 'no-swap');
  const hasMarkSorted = steps.some(s => s.type === 'mark-sorted');

  assert(hasIterationStart, 'Contains iteration-start steps');
  assert(hasCompare, 'Contains compare steps');
  assert(hasNewMin, 'Contains new-min candidate update steps');
  assert(hasSwap, 'Contains swap steps');
  assert(hasNoSwap, 'Contains no-swap steps for elements already in place');
  assert(hasMarkSorted, 'Contains mark-sorted boundary advancement steps');
}

// 2. Test [1, 2, 3, 4, 5] (Already sorted, verify strict O(n^2) comparisons)
console.log('\nTest Case 2: Already Sorted Array [1, 2, 3, 4, 5]');
{
  const input = [1, 2, 3, 4, 5];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 4, 5]), 'Array remains sorted [1, 2, 3, 4, 5]');
  assert(finalStep.counters.comparisons === 10, `Comparisons must strictly be 10 (O(n^2) best-case, no early-exit): got ${finalStep.counters.comparisons}`);
  assert(finalStep.counters.swaps === 0, 'Zero swaps performed on already sorted array');
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');

  // Verify that all passes resulted in no-swap
  const noSwapSteps = steps.filter(s => s.type === 'no-swap');
  assert(noSwapSteps.length === 4, `All 4 passes generated a no-swap step: got ${noSwapSteps.length}`);
}

// 3. Test [5, 4, 3, 2, 1] (Reverse sorted)
console.log('\nTest Case 3: Reverse Sorted Array [5, 4, 3, 2, 1]');
{
  const input = [5, 4, 3, 2, 1];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 4, 5]), 'Array correctly sorted to [1, 2, 3, 4, 5]');
  assert(finalStep.counters.comparisons === 10, `Comparisons is exactly 10: got ${finalStep.counters.comparisons}`);
  assert(finalStep.counters.swaps === 2, `Swaps is exactly 2: got ${finalStep.counters.swaps}`);
  assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
}

// 4. Test [5, 5, 2, 2, 8] (Duplicate values & stability characteristics)
console.log('\nTest Case 4: Duplicate Values [5, 5, 2, 2, 8]');
{
  const input = [5, 5, 2, 2, 8];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(JSON.stringify(finalStep.array) === JSON.stringify([2, 2, 5, 5, 8]), 'Duplicates sorted correctly to [2, 2, 5, 5, 8]');
  assert(finalStep.counters.comparisons === 10, `Comparisons is 10: got ${finalStep.counters.comparisons}`);
  assert(finalStep.counters.swaps === 2, `Swaps is 2: got ${finalStep.counters.swaps}`);

  // Verify equal comparison handling
  const equalCompare = steps.find(s => s.type === 'compare' && s.description.includes('values are equal'));
  assert(equalCompare !== undefined, 'Equal value comparison explicitly explained in description');
}

// 5. Test [7] (Single-Element Array)
console.log('\nTest Case 5: Single-Element Array [7]');
{
  const input = [7];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length >= 2, 'Generated initial and complete step for single-element array');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([7]), 'Array is [7]');
  assert(finalStep.counters.comparisons === 0, 'Zero comparisons for single element');
  assert(finalStep.counters.swaps === 0, 'Zero swaps for single element');
  assert(finalStep.sortedIndices.includes(0), 'Index 0 marked sorted');
}

// 6. Test Empty Input []
console.log('\nTest Case 6: Empty Input []');
{
  const input = [];
  const steps = generateSelectionSortSteps(input);
  const finalStep = steps[steps.length - 1];

  assert(steps.length >= 2, 'Generated initial and complete step for empty array');
  assert(JSON.stringify(finalStep.array) === JSON.stringify([]), 'Array is []');
  assert(finalStep.counters.comparisons === 0, 'Zero comparisons for empty array');
  assert(finalStep.counters.swaps === 0, 'Zero swaps for empty array');
}

// 7. Validation: Empty & Invalid Inputs
console.log('\nTest Case 7: Validation Handling');
{
  const resEmpty = Validation.parseArrayInput('');
  const resWhitespace = Validation.parseArrayInput('   ');
  const resNull = Validation.parseArrayInput(null);
  const resNonNumeric = Validation.parseArrayInput('5, foo, 8');
  const resDecimal = Validation.parseArrayInput('5, 3.14, 8');
  const resOutOfRange = Validation.parseArrayInput('5, 120, 8');
  const resValidSingle = Validation.parseArrayInput('7', 1, 25);

  assert(!resEmpty.isValid, 'Empty string rejected');
  assert(!resWhitespace.isValid, 'Whitespace rejected');
  assert(!resNull.isValid, 'Null input rejected');
  assert(!resNonNumeric.isValid, 'Non-numeric string rejected');
  assert(!resDecimal.isValid, 'Decimal number rejected');
  assert(!resOutOfRange.isValid, 'Out of range number rejected');
  assert(resValidSingle.isValid, 'Single-element "7" accepted');
  assert(JSON.stringify(resValidSingle.data) === JSON.stringify([7]), 'Parsed single element as [7]');
}

// 8. StepEngine & Playback Integration with Selection Sort
console.log('\nTest Case 8: StepEngine & AnimationController Integration');
{
  const input = [5, 3, 8, 1, 2];
  const steps = generateSelectionSortSteps(input);
  const engine = new StepEngine();

  engine.load(steps, input);

  assert(engine.getTotalSteps() === steps.length, 'Engine loaded all Selection Sort steps');
  assert(engine.getStepIndex() === 0, 'Engine starts at step 0');
  assert(engine.hasNext() === true, 'Engine has next step');
  assert(engine.hasPrev() === false, 'Engine has no previous step at start');

  // Step Forward
  const step1 = engine.next();
  assert(engine.getStepIndex() === 1, 'Engine advances to step 1');
  assert(engine.hasPrev() === true, 'Engine now has previous step');
  assert(step1 !== null, 'next() returned valid step snapshot');

  // Step Backward
  const step0 = engine.prev();
  assert(engine.getStepIndex() === 0, 'Engine stepped back to step 0');
  assert(JSON.stringify(step0.array) === JSON.stringify(steps[0].array), 'Step 0 array snapshot accurately restored');

  // Arbitrary jump
  const targetIndex = 5;
  const jumpedStep = engine.jumpTo(targetIndex);
  assert(engine.getStepIndex() === targetIndex, `Engine jumped directly to step ${targetIndex}`);
  assert(JSON.stringify(jumpedStep.array) === JSON.stringify(steps[targetIndex].array), 'Jumped step matches exact precomputed snapshot');

  // Reset
  engine.reset();
  assert(engine.getStepIndex() === 0, 'Engine reset returns to step 0');

  // Jump to completion
  engine.jumpTo(steps.length - 1);
  assert(engine.isComplete() === true, 'Engine detects completion state at final step');

  // AnimationController speed and state
  const anim = new AnimationController(engine, { speedMs: 200 });
  assert(anim.isPlaying === false, 'AnimationController initially paused');
  anim.setSpeed(150);
  assert(anim.speedMs === 150, 'AnimationController dynamic speed updated');
}

// 9. Algorithm Metadata & Complexity Requirements
console.log('\nTest Case 9: Selection Sort Metadata & Complexity Verification');
{
  const meta = ALGORITHM_METADATA.selectionSort;

  assert(meta !== undefined, 'Selection Sort metadata entry exists in ALGORITHM_METADATA');
  assert(meta.name === 'Selection Sort', 'Name is "Selection Sort"');
  assert(meta.complexities.best === 'O(n²)', 'Best case complexity is strictly O(n²)');
  assert(meta.complexities.average === 'O(n²)', 'Average case complexity is O(n²)');
  assert(meta.complexities.worst === 'O(n²)', 'Worst case complexity is O(n²)');
  assert(meta.complexities.space === 'O(1)', 'Space complexity is O(1)');
  assert(meta.complexities.stability === 'Not Stable in the standard in-place swap implementation', 'Stability specifies not stable in standard in-place swap implementation');
  assert(meta.complexities.inPlace === 'Yes', 'In-place is "Yes"');
  assert(Array.isArray(meta.pseudocode), 'Pseudocode is an array of strings');
  assert(meta.pseudocode.length === 9, `Pseudocode has 9 lines: got ${meta.pseudocode.length}`);
}

// 10. Bubble Sort Regression Verification
console.log('\nTest Case 10: Bubble Sort Regression Safety');
{
  const input = [5, 3, 8, 1, 2];
  const bubbleSteps = generateBubbleSortSteps(input);
  const bubbleFinal = bubbleSteps[bubbleSteps.length - 1];

  assert(JSON.stringify(bubbleFinal.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Bubble Sort still sorts correctly without regression');
  assert(bubbleFinal.counters.comparisons === 10, 'Bubble Sort comparisons intact');
  assert(bubbleFinal.counters.swaps === 7, 'Bubble Sort swaps intact');

  // Verify already sorted early-exit remains intact
  const sortedInput = [1, 2, 3, 4, 5];
  const sortedBubbleSteps = generateBubbleSortSteps(sortedInput);
  const earlyExit = sortedBubbleSteps.find(s => s.type === 'early-exit');
  assert(earlyExit !== undefined, 'Bubble Sort early exit O(n) optimization remains intact');
}

console.log(`\n--- ALL SELECTION SORT TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
