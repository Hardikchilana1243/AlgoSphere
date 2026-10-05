/**
 * AlgoSphere - Searching Visualizers Automated Test Suite
 * Validates Linear Search and Binary Search event generation, pointers,
 * bounds adjustments, eliminated search space, StepEngine integration, and metadata.
 */

import { generateLinearSearchSteps } from '../js/algorithms/searching/linearSearch.js';
import { generateBinarySearchSteps } from '../js/algorithms/searching/binarySearch.js';
import { isSorted } from '../js/utils/arrayUtils.js';
import { StepEngine } from '../js/visualizer/stepEngine.js';
import { AnimationController } from '../js/visualizer/animationController.js';
import { ALGORITHM_METADATA } from '../js/data/algorithmMetadata.js';
import { Validation } from '../js/utils/validation.js';

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    process.exitCode = 1;
  }
}

console.log('--- RUNNING SEARCHING VISUALIZERS AUTOMATED VERIFICATION ---\n');

// ==========================================================
// TEST SUITE 1: LINEAR SEARCH
// ==========================================================
console.log('Test Suite 1: Linear Search Verification');

// Case 1A: Target Found (Middle Index)
{
  const arr = [10, 25, 42, 68, 90];
  const steps = generateLinearSearchSteps(arr, 42);
  assert(steps.length > 0, 'Generated steps for Linear Search (middle index)');
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Final step type is "found"');
  assert(finalStep.result && finalStep.result.found === true, 'Result object reports found: true');
  assert(finalStep.result.index === 2, 'Found at index 2');
  assert(finalStep.result.comparisons === 3, 'Found after 3 comparisons');
  assert(finalStep.highlights[2] === 'found', 'Target index has "found" highlight');
  assert(finalStep.highlights[0] === 'eliminated', 'Prior index 0 is marked "eliminated"');
  assert(finalStep.highlights[1] === 'eliminated', 'Prior index 1 is marked "eliminated"');
}

// Case 1B: Target Found (First Index)
{
  const arr = [10, 25, 42, 68, 90];
  const steps = generateLinearSearchSteps(arr, 10);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Target at first index found immediately');
  assert(finalStep.result.index === 0, 'Target located at index 0');
  assert(finalStep.result.comparisons === 1, 'Only 1 comparison needed for first element');
}

// Case 1C: Target Found (Last Index)
{
  const arr = [10, 25, 42, 68, 90];
  const steps = generateLinearSearchSteps(arr, 90);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Target at last index found');
  assert(finalStep.result.index === 4, 'Target located at index 4');
  assert(finalStep.result.comparisons === 5, 'Exact n (5) comparisons needed for last element');
}

// Case 1D: Target Not Found (Exhausted Scan)
{
  const arr = [10, 25, 42, 68, 90];
  const steps = generateLinearSearchSteps(arr, 99);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Final step is "not-found"');
  assert(finalStep.result && finalStep.result.found === false, 'Result object reports found: false');
  assert(finalStep.result.index === -1, 'Not found index is -1');
  assert(finalStep.result.comparisons === 5, 'Examined all 5 elements before confirming absence');
  assert(finalStep.codeLine === 5, 'Pseudocode line is 5 (return -1)');
}

// Case 1E: Single Element Array (Found)
{
  const steps = generateLinearSearchSteps([7], 7);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Single element array found');
  assert(finalStep.result.index === 0, 'Found at index 0');
  assert(finalStep.result.comparisons === 1, '1 comparison performed');
}

// Case 1F: Single Element Array (Not Found)
{
  const steps = generateLinearSearchSteps([7], 42);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Single element array not found');
  assert(finalStep.result.found === false, 'Reports not found');
  assert(finalStep.result.comparisons === 1, '1 comparison performed');
}

// Case 1G: Empty Array
{
  const steps = generateLinearSearchSteps([], 42);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Empty array returns not-found step');
  assert(finalStep.result.found === false, 'Result is false');
  assert(finalStep.result.comparisons === 0, '0 comparisons performed on empty array');
}

// Case 1H: Duplicate Values (First Occurrence)
{
  const steps = generateLinearSearchSteps([5, 5, 2, 2, 8], 2);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Found target in duplicate array');
  assert(finalStep.result.index === 2, 'Stops at first occurrence (index 2)');
}

// ==========================================================
// TEST SUITE 2: BINARY SEARCH
// ==========================================================
console.log('\nTest Suite 2: Binary Search Verification');

// Case 2A: Target Found (Middle Index)
{
  const arr = [10, 20, 30, 40, 50];
  const steps = generateBinarySearchSteps(arr, 30);
  assert(steps.length > 0, 'Generated steps for Binary Search');
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Final step is "found"');
  assert(finalStep.result.found === true, 'Result reports found: true');
  assert(finalStep.result.index === 2, 'Found at index 2 (exact initial mid)');
  assert(finalStep.result.comparisons === 1, 'Found in 1 comparison (best-case O(1))');
  assert(finalStep.pointers.mid === 2, 'Mid pointer accurately positioned at 2');
}

// Case 2B: Target Found (First Index)
{
  const arr = [10, 20, 30, 40, 50];
  const steps = generateBinarySearchSteps(arr, 10);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Found target at index 0');
  assert(finalStep.result.index === 0, 'Target located at index 0');
  assert(finalStep.pointers.low === 0, 'Low pointer is 0');
}

// Case 2C: Target Found (Last Index)
{
  const arr = [10, 20, 30, 40, 50];
  const steps = generateBinarySearchSteps(arr, 50);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Found target at index 4');
  assert(finalStep.result.index === 4, 'Target located at index 4');
}

// Case 2D: Target Not Found (Missing Element)
{
  const arr = [10, 20, 30, 40, 50];
  const steps = generateBinarySearchSteps(arr, 35);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Binary Search correctly reports "not-found"');
  assert(finalStep.result.found === false, 'Result found is false');
  assert(finalStep.result.index === -1, 'Result index is -1');
  assert(finalStep.codeLine === 8, 'Pseudocode line is 8 (return -1)');
  assert(Object.keys(finalStep.highlights).length === 5, 'All cells highlighted as eliminated');
}

// Case 2E: Pointer Tracking & Bounds Narrowing
{
  const arr = [10, 20, 30, 40, 50, 60, 70, 80, 90];
  const steps = generateBinarySearchSteps(arr, 70);
  const midSteps = steps.filter(s => s.type === 'calculate-mid');
  assert(midSteps.length >= 2, 'Multiple midpoint calculations generated');
  assert(midSteps[0].pointers.low === 0 && midSteps[0].pointers.high === 8, 'Initial window is [0..8]');
  assert(midSteps[0].pointers.mid === 4, 'First midpoint is index 4 (value 50)');

  const adjustSteps = steps.filter(s => s.type === 'adjust-bounds');
  assert(adjustSteps.length > 0, 'Bounds adjustment steps recorded');
}

// Case 2F: Single Element Array (Found)
{
  const steps = generateBinarySearchSteps([7], 7);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Single element binary search found');
  assert(finalStep.result.index === 0, 'Found at index 0');
  assert(finalStep.result.comparisons === 1, '1 comparison performed');
}

// Case 2G: Single Element Array (Not Found)
{
  const steps = generateBinarySearchSteps([7], 42);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Single element binary search not found');
  assert(finalStep.result.found === false, 'Result is false');
}

// Case 2H: Empty Array
{
  const steps = generateBinarySearchSteps([], 42);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'not-found', 'Empty array returns not-found step');
  assert(finalStep.result.comparisons === 0, '0 comparisons performed on empty array');
}

// Case 2I: Duplicate Values
{
  const arr = [2, 2, 5, 5, 8];
  const steps = generateBinarySearchSteps(arr, 5);
  const finalStep = steps[steps.length - 1];
  assert(finalStep.type === 'found', 'Target found in sorted duplicate array');
  assert(arr[finalStep.result.index] === 5, 'Found element matches target value 5');
}

// ==========================================================
// TEST SUITE 3: ARRAY UTILITIES & SORTED DETECTION
// ==========================================================
console.log('\nTest Suite 3: Array Utilities & Sorted Check');

assert(isSorted([1, 2, 3, 4, 5]) === true, 'isSorted identifies ascending sorted array');
assert(isSorted([1, 1, 2, 2, 3]) === true, 'isSorted identifies sorted array with duplicates');
assert(isSorted([7]) === true, 'isSorted identifies single-element array as sorted');
assert(isSorted([]) === true, 'isSorted identifies empty array as sorted');
assert(isSorted([5, 3, 8, 1, 2]) === false, 'isSorted detects unsorted array');
assert(isSorted([5, 4, 3, 2, 1]) === false, 'isSorted detects reverse sorted array');

// ==========================================================
// TEST SUITE 4: STEP ENGINE & ANIMATION CONTROLLER INTEGRATION
// ==========================================================
console.log('\nTest Suite 4: Step Engine Integration with Searching');

{
  const steps = generateLinearSearchSteps([10, 20, 30], 20);
  const engine = new StepEngine();
  engine.load(steps, [10, 20, 30]);

  assert(engine.getTotalSteps() === steps.length, 'Engine loaded all searching steps');
  assert(engine.getStepIndex() === 0, 'Engine starts at step 0');
  assert(engine.hasNext() === true, 'Engine has next step');
  assert(engine.hasPrev() === false, 'Engine has no prev step at start');

  engine.next();
  assert(engine.getStepIndex() === 1, 'Engine advances to step 1');
  assert(engine.hasPrev() === true, 'Engine has prev step after advance');

  engine.prev();
  assert(engine.getStepIndex() === 0, 'Engine returns to step 0');

  engine.jumpTo(steps.length - 1);
  assert(engine.isComplete() === true, 'Engine detects completion state');

  const anim = new AnimationController(engine, { speedMs: 400 });
  assert(anim.isPlaying === false, 'AnimationController initially paused');
  anim.setSpeed(200);
  assert(anim.speedMs === 200, 'AnimationController speed updated');
}

// ==========================================================
// TEST SUITE 5: METADATA & PSEUDOCODE VERIFICATION
// ==========================================================
console.log('\nTest Suite 5: Searching Metadata Verification');

{
  const lsMeta = ALGORITHM_METADATA.linearSearch;
  assert(lsMeta !== undefined, 'Linear Search metadata exists');
  assert(lsMeta.name === 'Linear Search', 'Name is "Linear Search"');
  assert(lsMeta.complexities.best === 'O(1)', 'Linear Search best time is O(1)');
  assert(lsMeta.complexities.average === 'O(n)', 'Linear Search average time is O(n)');
  assert(lsMeta.complexities.worst === 'O(n)', 'Linear Search worst time is O(n)');
  assert(lsMeta.complexities.space === 'O(1)', 'Linear Search space is O(1)');
  assert(Array.isArray(lsMeta.pseudocode), 'Pseudocode is an array');
  assert(lsMeta.pseudocode.length === 5, 'Linear Search pseudocode has 5 lines');

  const bsMeta = ALGORITHM_METADATA.binarySearch;
  assert(bsMeta !== undefined, 'Binary Search metadata exists');
  assert(bsMeta.name === 'Binary Search', 'Name is "Binary Search"');
  assert(bsMeta.complexities.best === 'O(1)', 'Binary Search best time is O(1)');
  assert(bsMeta.complexities.average === 'O(log n)', 'Binary Search average time is O(log n)');
  assert(bsMeta.complexities.worst === 'O(log n)', 'Binary Search worst time is O(log n)');
  assert(bsMeta.complexities.space === 'O(1)', 'Binary Search space is O(1)');
  assert(Array.isArray(bsMeta.pseudocode), 'Pseudocode is an array');
  assert(bsMeta.pseudocode.length === 8, 'Binary Search pseudocode has 8 lines');
}

// ==========================================================
// TEST SUITE 6: SEARCH TARGET INPUT VALIDATION
// ==========================================================
console.log('\nTest Suite 6: Target Input Validation');

{
  assert(Validation.parseTargetInput('').isValid === false, 'Empty target rejected');
  assert(Validation.parseTargetInput('   ').isValid === false, 'Whitespace target rejected');
  assert(Validation.parseTargetInput(null).isValid === false, 'Null target rejected');
  assert(Validation.parseTargetInput('abc').isValid === false, 'Non-numeric string target rejected');
  assert(Validation.parseTargetInput('3.14').isValid === false, 'Decimal target rejected');
  assert(Validation.parseTargetInput(0, 1, 100).isValid === false, 'Target < 1 rejected');
  assert(Validation.parseTargetInput(101, 1, 100).isValid === false, 'Target > 100 rejected');
  const validRes = Validation.parseTargetInput('42', 1, 100);
  assert(validRes.isValid === true, 'Valid target "42" accepted');
  assert(validRes.value === 42, 'Target parsed as integer 42');
}

console.log(`\n--- ALL SEARCHING TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
