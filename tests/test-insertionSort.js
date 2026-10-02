/**
 * Test Suite for Insertion Sort Visualizer, Engine Integration & Schema Verification
 */

import { generateInsertionSortSteps } from '../js/algorithms/sorting/insertionSort.js';
import { generateBubbleSortSteps } from '../js/algorithms/sorting/bubbleSort.js';
import { generateSelectionSortSteps } from '../js/algorithms/sorting/selectionSort.js';
import { ALGORITHM_METADATA } from '../js/data/algorithmMetadata.js';
import { StepEngine } from '../js/visualizer/stepEngine.js';
import { AnimationController } from '../js/visualizer/animationController.js';

console.log('--- RUNNING INSERTION SORT AUTOMATED VERIFICATION ---');

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
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length > 5, 'Generated multiple steps for standard array');
    assert(JSON.stringify(finalStep.array) === JSON.stringify([1, 2, 3, 5, 8]), 'Final array is sorted [1, 2, 3, 5, 8]');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'finalStep.currentArray is sorted [1, 2, 3, 5, 8]');
    assert(finalStep.counters.comparisons === 9, `Comparisons is exactly 9: got ${finalStep.counters.comparisons}`);
    assert(finalStep.comparisonCount === 9, `comparisonCount property is 9: got ${finalStep.comparisonCount}`);
    assert(finalStep.counters.swaps === 7, `Shifts is exactly 7: got ${finalStep.counters.swaps}`);
    assert(finalStep.swapCount === 7, `swapCount property is 7: got ${finalStep.swapCount}`);
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
    assert(finalStep.codeLine === 10, 'Final step codeLine is 10 (return arr)');
    assert(finalStep.pseudocodeLine === 10, 'Final step pseudocodeLine is 10');

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
        if (s.pseudocodeLine < 1 || s.pseudocodeLine > 10) validCodeLines = false;

        prevComp = s.comparisonCount;
        prevSwaps = s.swapCount;
    }

    assert(allStepsValid, 'All steps strictly conform to metadata schema (currentArray, comparedIndices, currentIndices, swappedIndices, sortedIndices, comparisonCount, swapCount, explanation, pseudocodeLine)');
    assert(monotonicComparisons, 'Comparison counts are monotonically non-decreasing');
    assert(monotonicSwaps, 'Swap/shift counts are monotonically non-decreasing');
    assert(validCodeLines, 'All pseudocode line references are within valid range 1–10');

    // Verify key step types exist
    assert(steps.some(s => s.type === 'initial'), 'Contains initial step');
    assert(steps.some(s => s.type === 'select-key'), 'Contains select-key steps');
    assert(steps.some(s => s.type === 'compare'), 'Contains compare steps');
    assert(steps.some(s => s.type === 'shift'), 'Contains shift steps');
    assert(steps.some(s => s.type === 'insert'), 'Contains insert steps');
    assert(steps.some(s => s.type === 'complete'), 'Contains complete step');
}

// 2. Test Already Sorted Array [1, 2, 3, 4, 5] (O(n) Best Case)
console.log('\nTest Case 2: Already Sorted Array [1, 2, 3, 4, 5]');
{
    const input = [1, 2, 3, 4, 5];
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array remains sorted');
    assert(finalStep.comparisonCount === 4, `Comparisons must strictly be n-1 (4): got ${finalStep.comparisonCount}`);
    assert(finalStep.swapCount === 0, `Zero shifts performed on already sorted array: got ${finalStep.swapCount}`);
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
}

// 3. Test Reverse Sorted Array [5, 4, 3, 2, 1] (O(n²) Worst Case)
console.log('\nTest Case 3: Reverse Sorted Array [5, 4, 3, 2, 1]');
{
    const input = [5, 4, 3, 2, 1];
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([1, 2, 3, 4, 5]), 'Array sorted [1, 2, 3, 4, 5]');
    assert(finalStep.comparisonCount === 10, `Comparisons is n*(n-1)/2 (10): got ${finalStep.comparisonCount}`);
    assert(finalStep.swapCount === 10, `Shifts is n*(n-1)/2 (10): got ${finalStep.swapCount}`);
    assert(finalStep.sortedIndices.length === 5, 'All 5 indices marked sorted');
}

// 4. Test Duplicate Values [5, 5, 2, 2, 8] (Stability)
console.log('\nTest Case 4: Duplicate Values [5, 5, 2, 2, 8]');
{
    const input = [5, 5, 2, 2, 8];
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([2, 2, 5, 5, 8]), 'Duplicates sorted to [2, 2, 5, 5, 8]');
    assert(finalStep.comparisonCount === 7, `Comparisons is 7: got ${finalStep.comparisonCount}`);
    assert(finalStep.swapCount === 4, `Shifts is 4: got ${finalStep.swapCount}`);
}

// 5. Test Single-Element Array [7]
console.log('\nTest Case 5: Single-Element Array [7]');
{
    const input = [7];
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length === 1, 'Only 1 step for single-element array');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([7]), 'Array is [7]');
    assert(finalStep.comparisonCount === 0, 'Zero comparisons for single element');
    assert(finalStep.swapCount === 0, 'Zero shifts for single element');
    assert(finalStep.sortedIndices.includes(0), 'Index 0 marked sorted');
}

// 6. Test Empty Input []
console.log('\nTest Case 6: Empty Input []');
{
    const input = [];
    const steps = generateInsertionSortSteps(input);
    const finalStep = steps[steps.length - 1];

    assert(steps.length === 1, 'Only 1 step for empty array');
    assert(JSON.stringify(finalStep.currentArray) === JSON.stringify([]), 'Array is []');
    assert(finalStep.comparisonCount === 0, 'Zero comparisons for empty array');
    assert(finalStep.swapCount === 0, 'Zero shifts for empty array');
}

// 7. StepEngine & Time-Travel Integration
console.log('\nTest Case 7: StepEngine & Time-Travel Stepping');
{
    const engine = new StepEngine();
    const input = [5, 3, 8, 1, 2];
    const steps = generateInsertionSortSteps(input);

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

    engine.jumpTo(5);
    assert(engine.getStepIndex() === 5, 'Engine jumped directly to step 5');

    engine.reset();
    assert(engine.getStepIndex() === 0, 'Engine reset returns to step 0');
}

// 8. Metadata and Pseudocode Verification
console.log('\nTest Case 8: Metadata & Pseudocode Verification');
{
    const meta = ALGORITHM_METADATA.insertionSort;
    assert(meta !== undefined, 'Insertion Sort metadata exists in ALGORITHM_METADATA');
    assert(meta.name === 'Insertion Sort', 'Name is "Insertion Sort"');
    assert(meta.complexities.best === 'O(n)', 'Best case complexity is O(n)');
    assert(meta.complexities.average === 'O(n²)', 'Average case complexity is O(n²)');
    assert(meta.complexities.worst === 'O(n²)', 'Worst case complexity is O(n²)');
    assert(meta.complexities.space === 'O(1)', 'Space complexity is O(1)');
    assert(meta.complexities.stability === 'Stable', 'Stability is Stable');
    assert(meta.complexities.inPlace === 'Yes', 'In-place is "Yes"');
    assert(Array.isArray(meta.pseudocode), 'Pseudocode is an array of strings');
    assert(meta.pseudocode.length === 10, `Pseudocode has 10 lines: got ${meta.pseudocode.length}`);
}

// 9. Regression Safety for Bubble Sort & Selection Sort
console.log('\nTest Case 9: Regression Safety');
{
    const bSteps = generateBubbleSortSteps([5, 3, 8, 1, 2]);
    const sSteps = generateSelectionSortSteps([5, 3, 8, 1, 2]);

    assert(JSON.stringify(bSteps[bSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Bubble Sort intact');
    assert(JSON.stringify(sSteps[sSteps.length - 1].currentArray) === JSON.stringify([1, 2, 3, 5, 8]), 'Selection Sort intact');
}

console.log(`\n--- ALL INSERTION SORT TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
