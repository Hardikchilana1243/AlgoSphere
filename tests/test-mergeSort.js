/**
 * Test Suite for Merge Sort Visualizer, Engine Integration & Schema Verification
 */

import { generateMergeSortSteps } from '../js/algorithms/sorting/mergeSort.js';
import { generateBubbleSortSteps } from '../js/algorithms/sorting/bubbleSort.js';
import { generateSelectionSortSteps } from '../js/algorithms/sorting/selectionSort.js';
import { generateInsertionSortSteps } from '../js/algorithms/sorting/insertionSort.js';
import { ALGORITHM_METADATA } from '../js/data/algorithmMetadata.js';
import { StepEngine } from '../js/visualizer/stepEngine.js';
import { AnimationController } from '../js/visualizer/animationController.js';
import { Validation } from '../js/utils/validation.js';

console.log('--- RUNNING MERGE SORT AUTOMATED VERIFICATION ---');

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
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length > 5, 'Generated multiple steps for standard array');
    assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Final array is sorted [1, 2, 3, 5, 8]');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'finalStep.currentArray is sorted [1, 2, 3, 5, 8]');
    assert(finalStep.counters.comparisons > 0, `Recorded comparisons: got ${finalStep.counters.comparisons}`);
    assert(finalStep.comparisonCount > 0, `comparisonCount property is valid: got ${finalStep.comparisonCount}`);
    assert(finalStep.counters.swaps > 0, `Overwrites/writes recorded: got ${finalStep.counters.swaps}`);
    assert(finalStep.swapCount > 0, `swapCount property is valid: got ${finalStep.swapCount}`);
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
    assert(finalStep.codeLine === 1, 'Final step codeLine is 1 (function/complete)');

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
        if (s.pseudocodeLine < 1 || s.pseudocodeLine > 11) validCodeLines = false;

        prevComp = s.comparisonCount;
        prevSwaps = s.swapCount;
    }

    assert(allStepsValid, 'All steps strictly conform to metadata schema (currentArray, comparedIndices, currentIndices, swappedIndices, sortedIndices, comparisonCount, swapCount, explanation, pseudocodeLine)');
    assert(monotonicComparisons, 'Comparison counts are monotonically non-decreasing');
    assert(monotonicSwaps, 'Swap/overwrite counts are monotonically non-decreasing');
    assert(validCodeLines, 'All pseudocode line references are within valid range 1–11');

    // Verify key step types exist
    assert(steps.some(s => s.type === 'initial'), 'Contains initial step');
    assert(steps.some(s => s.type === 'split'), 'Contains split/divide steps');
    assert(steps.some(s => s.type === 'recurse-left' || s.type === 'recurse-right'), 'Contains recursion steps');
    assert(steps.some(s => s.type === 'merge-start'), 'Contains merge-start steps');
    assert(steps.some(s => s.type === 'compare'), 'Contains compare steps');
    assert(steps.some(s => s.type === 'overwrite'), 'Contains overwrite steps');
    assert(steps.some(s => s.type === 'merge-complete'), 'Contains merge-complete steps');
    assert(steps.some(s => s.type === 'complete'), 'Contains complete step');
}

// 2. Test Already Sorted Array [1, 2, 3, 4, 5]
console.log('\nTest Case 2: Already Sorted Array [1, 2, 3, 4, 5]');
{
    const input = [1, 2, 3, 4, 5];
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array remains sorted [1, 2, 3, 4, 5]');
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
    assert(finalStep.comparisonCount > 0, `Comparisons recorded: ${finalStep.comparisonCount}`);
    assert(finalStep.swapCount > 0, `Overwrites recorded: ${finalStep.swapCount}`);
}

// 3. Test Reverse Sorted Array [5, 4, 3, 2, 1]
console.log('\nTest Case 3: Reverse Sorted Array [5, 4, 3, 2, 1]');
{
    const input = [5, 4, 3, 2, 1];
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array sorted [1, 2, 3, 4, 5]');
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
    assert(finalStep.comparisonCount > 0, `Comparisons recorded: ${finalStep.comparisonCount}`);
    assert(finalStep.swapCount > 0, `Overwrites recorded: ${finalStep.swapCount}`);
}

// 4. Test Duplicate Values [5, 5, 2, 2, 8] (Stability)
console.log('\nTest Case 4: Duplicate Values [5, 5, 2, 2, 8]');
{
    const input = [5, 5, 2, 2, 8];
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([2, 2, 5, 5, 8]), 'Duplicates sorted to [2, 2, 5, 5, 8]');
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');

    // Verify stability explanation in duplicate comparison steps
    const duplicateSteps = steps.filter(s => s.explanation && s.explanation.includes('stability'));
    assert(duplicateSteps.length > 0, 'Step explanation explicitly notes stability preference on equal values');
}

// 5. Test Single-Element Array [7]
console.log('\nTest Case 5: Single-Element Array [7]');
{
    const input = [7];
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length >= 1, 'Generated steps for single-element array');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([7]), 'Array is [7]');
    assert(finalStep.comparisonCount === 0, 'Zero comparisons for single element');
    assert(finalStep.swapCount === 0, 'Zero overwrites for single element');
    assert(finalStep.sortedIndices.includes(0), 'Index 0 marked sorted');
}

// 6. Test Empty Input []
console.log('\nTest Case 6: Empty Input []');
{
    const input = [];
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length >= 1, 'Generated steps for empty array');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([]), 'Array is []');
    assert(finalStep.comparisonCount === 0, 'Zero comparisons for empty array');
    assert(finalStep.swapCount === 0, 'Zero overwrites for empty array');
}

// 7. Test Random Array
console.log('\nTest Case 7: Arbitrary Random Array');
{
    const input = [38, 27, 43, 3, 9, 82, 10];
    const expected = [...input].sort((a, b) => a - b);
    const steps = generateMergeSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify(expected), `Random array sorted correctly to [${expected.join(', ')}]`);
    assert(finalStep.sortedIndices.length === input.length, 'All indices marked sorted');
}

// 8. StepEngine & AnimationController Integration
console.log('\nTest Case 8: StepEngine & AnimationController Integration');
{
    const engine = new StepEngine();
    const input = [5, 3, 8, 1, 2];
    const steps = generateMergeSortSteps(input);

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

    engine.jumpTo(5);
    assert(engine.getStepIndex() === 5, 'Engine jumped directly to step 5');

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

// 9. Validation Handling
console.log('\nTest Case 9: Input Validation Handling');
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

// 10. Metadata and Pseudocode Verification
console.log('\nTest Case 10: Metadata & Pseudocode Verification');
{
    const meta = ALGORITHM_METADATA.mergeSort;
    assert(meta !== undefined, 'Merge Sort metadata exists in ALGORITHM_METADATA');
    assert(meta.name === 'Merge Sort', 'Name is "Merge Sort"');
    assert(meta.complexities.best === 'O(n log n)', 'Best case complexity is O(n log n)');
    assert(meta.complexities.average === 'O(n log n)', 'Average case complexity is O(n log n)');
    assert(meta.complexities.worst === 'O(n log n)', 'Worst case complexity is O(n log n)');
    assert(meta.complexities.space === 'O(n)', 'Space complexity is O(n)');
    assert(meta.complexities.stability === 'Stable', 'Stability is Stable');
    assert(meta.complexities.inPlace === 'No', 'In-place is "No"');
    assert(Array.isArray(meta.pseudocode), 'Pseudocode is an array of strings');
    assert(meta.pseudocode.length === 11, `Pseudocode has 11 lines: got ${meta.pseudocode.length}`);
}

// 11. Regression Safety for Bubble, Selection & Insertion Sort
console.log('\nTest Case 11: Regression Safety');
{
    const bSteps = generateBubbleSortSteps([5, 3, 8, 1, 2]);
    const sSteps = generateSelectionSortSteps([5, 3, 8, 1, 2]);
    const iSteps = generateInsertionSortSteps([5, 3, 8, 1, 2]);

    assert(JSON.stringify(bSteps[bSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Bubble Sort intact');
    assert(JSON.stringify(sSteps[sSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Selection Sort intact');
    assert(JSON.stringify(iSteps[iSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Insertion Sort intact');
}

console.log(`\n--- ALL MERGE SORT TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
