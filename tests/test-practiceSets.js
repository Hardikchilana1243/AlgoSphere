/**
 * Test Suite - Practice Sets CRUD & Web Storage Verification
 * Validates localStorage persistence, CRUD operations, unique IDs,
 * corrupted data recovery, and edge-case validation.
 */

// 1. Shim Browser localStorage for Node.js test environment
const storageStore = new Map();
globalThis.localStorage = {
  getItem(key) {
    return storageStore.has(key) ? storageStore.get(key) : null;
  },
  setItem(key, value) {
    storageStore.set(key, String(value));
  },
  removeItem(key) {
    storageStore.delete(key);
  },
  clear() {
    storageStore.clear();
  }
};

import { Storage, STORAGE_KEYS } from '../js/utils/storage.js';
import { Validation } from '../js/utils/validation.js';

console.log('--- RUNNING PRACTICE SETS CRUD & LOCALSTORAGE VERIFICATION ---');

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

// ==========================================
// Test Suite 1: Storage Key & Empty Storage
// ==========================================
console.log('\nTest Suite 1: Storage Key Specification & Empty Storage');
{
  localStorage.clear();

  assert(STORAGE_KEYS.PRACTICE_SETS === 'algosphere_practice_sets', 'Storage key constant is "algosphere_practice_sets"');

  const emptySets = Storage.getPracticeSets();
  assert(Array.isArray(emptySets), 'getPracticeSets() returns an Array when storage is empty');
  assert(emptySets.length === 0, 'Initial practice sets count is 0');
}

// ==========================================
// Test Suite 2: CREATE Operation (C in CRUD)
// ==========================================
console.log('\nTest Suite 2: CREATE Operation');
let set1, set2, set3;
{
  localStorage.clear();

  // Create 1st Practice Set
  set1 = Storage.createPracticeSet({
    name: 'My Bubble Test',
    algorithm: 'bubbleSort',
    array: [45, 23, 78, 12, 56]
  });

  assert(typeof set1.id === 'string' && set1.id.length > 5, 'Generated unique string ID for Set 1');
  assert(set1.name === 'My Bubble Test', 'Set 1 name is stored correctly');
  assert(set1.algorithm === 'bubbleSort', 'Set 1 algorithm is bubbleSort');
  assert(JSON.stringify(set1.array) === JSON.stringify([45, 23, 78, 12, 56]), 'Set 1 integer array saved correctly');
  assert(typeof set1.createdAt === 'string' && !isNaN(Date.parse(set1.createdAt)), 'Set 1 createdAt is valid ISO string');
  assert(typeof set1.updatedAt === 'string' && !isNaN(Date.parse(set1.updatedAt)), 'Set 1 updatedAt is valid ISO string');

  // Create 2nd Practice Set
  set2 = Storage.createPracticeSet({
    name: 'Binary Search Edge Cases',
    algorithm: 'binarySearch',
    array: [10, 20, 30, 40, 50, 60, 70]
  });

  assert(typeof set2.id === 'string' && set2.id !== set1.id, 'Set 2 has unique ID distinct from Set 1');
  assert(set2.algorithm === 'binarySearch', 'Set 2 algorithm is binarySearch');

  // Create 3rd Practice Set
  set3 = Storage.createPracticeSet({
    name: 'Quick Sort Pivot Test',
    algorithm: 'quickSort',
    array: [88, 11, 44, 22, 66]
  });

  assert(typeof set3.id === 'string' && set3.id !== set1.id && set3.id !== set2.id, 'Set 3 has unique ID distinct from Sets 1 & 2');

  const allSets = Storage.getPracticeSets();
  assert(allSets.length === 3, 'All 3 practice sets are present in storage');
  assert(allSets[0].id === set3.id, 'Newest practice set is prepended to the start of the list');
}

// ==========================================
// Test Suite 3: READ Operation (R in CRUD)
// ==========================================
console.log('\nTest Suite 3: READ Operation');
{
  const sets = Storage.getPracticeSets();
  assert(sets.length === 3, 'Retrieved all 3 practice sets');

  const foundSet1 = Storage.getPracticeSetById(set1.id);
  assert(foundSet1 !== null, 'Found Set 1 by ID');
  assert(foundSet1.name === 'My Bubble Test', 'Found Set 1 name matches original');
  assert(JSON.stringify(foundSet1.array) === JSON.stringify([45, 23, 78, 12, 56]), 'Found Set 1 array matches original');

  const foundSet2 = Storage.getPracticeSetById(set2.id);
  assert(foundSet2 !== null && foundSet2.algorithm === 'binarySearch', 'Found Set 2 by ID');

  const notFound = Storage.getPracticeSetById('non_existent_id_xyz');
  assert(notFound === null, 'getPracticeSetById returns null for nonexistent ID');

  const nullId = Storage.getPracticeSetById(null);
  assert(nullId === null, 'getPracticeSetById returns null for null ID');

  const emptyId = Storage.getPracticeSetById('');
  assert(emptyId === null, 'getPracticeSetById returns null for empty string ID');
}

// ==========================================
// Test Suite 4: UPDATE Operation (U in CRUD)
// ==========================================
console.log('\nTest Suite 4: UPDATE Operation');
{
  const originalSet2CreatedAt = set2.createdAt;

  // Small delay to ensure timestamp difference
  const updated = Storage.updatePracticeSet(set2.id, {
    name: 'Binary Search Edge Cases (Updated)',
    algorithm: 'linearSearch',
    array: [5, 15, 25, 35, 45]
  });

  assert(updated !== null, 'updatePracticeSet returns updated record');
  assert(updated.id === set2.id, 'ID is preserved and unchanged after update');
  assert(updated.createdAt === originalSet2CreatedAt, 'createdAt is preserved and unchanged after update');
  assert(updated.name === 'Binary Search Edge Cases (Updated)', 'Updated name is persisted');
  assert(updated.algorithm === 'linearSearch', 'Updated algorithm is persisted');
  assert(JSON.stringify(updated.array) === JSON.stringify([5, 15, 25, 35, 45]), 'Updated array is persisted');

  // Verify non-mutation of unrelated records
  const checkSet1 = Storage.getPracticeSetById(set1.id);
  assert(checkSet1.name === 'My Bubble Test', 'Set 1 was not mutated by Set 2 update');
  assert(checkSet1.algorithm === 'bubbleSort', 'Set 1 algorithm remains bubbleSort');

  const checkSet3 = Storage.getPracticeSetById(set3.id);
  assert(checkSet3.name === 'Quick Sort Pivot Test', 'Set 3 was not mutated by Set 2 update');

  // Verify updating non-existent record
  const updateNonExistent = Storage.updatePracticeSet('invalid_id', { name: 'Foo' });
  assert(updateNonExistent === null, 'updatePracticeSet returns null for nonexistent ID');

  // Verify updating with empty ID
  const updateEmptyId = Storage.updatePracticeSet('', { name: 'Foo' });
  assert(updateEmptyId === null, 'updatePracticeSet returns null for empty ID');
}

// ==========================================
// Test Suite 5: DELETE Operation (D in CRUD)
// ==========================================
console.log('\nTest Suite 5: DELETE Operation');
{
  // Delete Set 2
  const deleteResult = Storage.deletePracticeSet(set2.id);
  assert(deleteResult === true, 'deletePracticeSet returns true on successful deletion');

  const setsAfterDelete = Storage.getPracticeSets();
  assert(setsAfterDelete.length === 2, 'Total practice sets decreased from 3 to 2');

  const lookupDeleted = Storage.getPracticeSetById(set2.id);
  assert(lookupDeleted === null, 'Deleted set cannot be retrieved by ID');

  // Ensure remaining records are intact
  const remaining1 = Storage.getPracticeSetById(set1.id);
  const remaining3 = Storage.getPracticeSetById(set3.id);
  assert(remaining1 !== null && remaining1.name === 'My Bubble Test', 'Set 1 remained completely intact after Set 2 deletion');
  assert(remaining3 !== null && remaining3.name === 'Quick Sort Pivot Test', 'Set 3 remained completely intact after Set 2 deletion');

  // Delete non-existent ID
  const deleteInvalid = Storage.deletePracticeSet('non_existent_id');
  assert(deleteInvalid === false, 'deletePracticeSet returns false for non-existent ID');

  // Delete null ID
  const deleteNull = Storage.deletePracticeSet(null);
  assert(deleteNull === false, 'deletePracticeSet returns false for null ID');

  // Delete Set 1 and Set 3 (emptying the storage)
  Storage.deletePracticeSet(set1.id);
  Storage.deletePracticeSet(set3.id);
  const finalEmpty = Storage.getPracticeSets();
  assert(Array.isArray(finalEmpty) && finalEmpty.length === 0, 'Storage successfully emptied after deleting all practice sets');
}

// ==========================================
// Test Suite 6: Unique ID Generation
// ==========================================
console.log('\nTest Suite 6: Unique ID Generation');
{
  localStorage.clear();
  const createdIds = new Set();
  const count = 30;

  for (let i = 0; i < count; i++) {
    const item = Storage.createPracticeSet({
      name: `Unique Set ${i}`,
      algorithm: 'bubbleSort',
      array: [i + 1, i + 2, i + 3]
    });
    createdIds.add(item.id);
  }

  assert(createdIds.size === count, `Generated ${count} unique IDs with zero collisions`);
}

// ==========================================
// Test Suite 7: Persistence Serialization
// ==========================================
console.log('\nTest Suite 7: Persistence Serialization via Web Storage');
{
  localStorage.clear();

  Storage.createPracticeSet({
    name: 'Persistent Test Set',
    algorithm: 'mergeSort',
    array: [100, 50, 75, 25]
  });

  const rawStorageValue = localStorage.getItem('algosphere_practice_sets');
  assert(typeof rawStorageValue === 'string', 'Raw localStorage entry is a string');
  assert(rawStorageValue.startsWith('[') && rawStorageValue.endsWith(']'), 'Raw value is a valid JSON array format');

  const parsed = JSON.parse(rawStorageValue);
  assert(Array.isArray(parsed) && parsed.length === 1, 'Raw JSON string successfully parsed back into array');
  assert(parsed[0].name === 'Persistent Test Set', 'Parsed name accurately matches');
  assert(parsed[0].algorithm === 'mergeSort', 'Parsed algorithm accurately matches');
}

// ==========================================
// Test Suite 8: Corrupted Storage Recovery
// ==========================================
console.log('\nTest Suite 8: Corrupted Storage Recovery');
{
  // 1. Invalid JSON string
  localStorage.setItem('algosphere_practice_sets', '{{invalid_json_payload');
  const recovered1 = Storage.getPracticeSets();
  assert(Array.isArray(recovered1), 'Recovers gracefully to array when localStorage contains invalid JSON string');
  assert(recovered1.length === 0, 'Invalid JSON string recovers to empty array');

  // 2. Non-array JSON payload (e.g. object)
  localStorage.setItem('algosphere_practice_sets', JSON.stringify({ error: 'not an array' }));
  const recovered2 = Storage.getPracticeSets();
  assert(Array.isArray(recovered2), 'Recovers gracefully to array when stored payload is an Object instead of Array');
  assert(recovered2.length === 0, 'Non-array object recovers to empty array');

  // 3. Stored primitive number
  localStorage.setItem('algosphere_practice_sets', '42');
  const recovered3 = Storage.getPracticeSets();
  assert(Array.isArray(recovered3) && recovered3.length === 0, 'Recovers gracefully when stored value is a primitive number');

  // 4. Stored null literal
  localStorage.setItem('algosphere_practice_sets', 'null');
  const recovered4 = Storage.getPracticeSets();
  assert(Array.isArray(recovered4) && recovered4.length === 0, 'Recovers gracefully when stored value is null literal');
}

// ==========================================
// Test Suite 9: Input Validation
// ==========================================
console.log('\nTest Suite 9: Validation Rules & Error Feedback');
{
  const existing = [
    { id: '1', name: 'Existing Set', algorithm: 'bubbleSort', array: [1, 2, 3] }
  ];

  // 1. Empty Name
  const emptyName = Validation.validatePracticeSet({ name: '', algorithm: 'bubbleSort', array: '1, 2, 3' }, existing);
  assert(emptyName.isValid === false, 'Empty name is rejected');
  assert(emptyName.error.includes('empty'), `Error message mentions empty: "${emptyName.error}"`);

  // 2. Short Name (< 2 chars)
  const shortName = Validation.validatePracticeSet({ name: 'A', algorithm: 'bubbleSort', array: '1, 2, 3' }, existing);
  assert(shortName.isValid === false, 'Single character name is rejected');

  // 3. Long Name (> 50 chars)
  const longNameStr = 'A'.repeat(51);
  const longName = Validation.validatePracticeSet({ name: longNameStr, algorithm: 'bubbleSort', array: '1, 2, 3' }, existing);
  assert(longName.isValid === false, 'Name exceeding 50 characters is rejected');

  // 4. Duplicate Name
  const duplicateName = Validation.validatePracticeSet({ name: 'Existing Set', algorithm: 'bubbleSort', array: '1, 2, 3' }, existing);
  assert(duplicateName.isValid === false, 'Exact duplicate name is rejected');

  // 5. Duplicate Name Case-Insensitive
  const caseDuplicate = Validation.validatePracticeSet({ name: 'existing set', algorithm: 'bubbleSort', array: '1, 2, 3' }, existing);
  assert(caseDuplicate.isValid === false, 'Case-insensitive duplicate name is rejected');

  // 6. Name collision allowed for the record being edited
  const editSelf = Validation.validatePracticeSet({ name: 'Existing Set', algorithm: 'bubbleSort', array: '1, 2, 3' }, existing, '1');
  assert(editSelf.isValid === true, 'Same name is permitted when editing the same record (same ID)');

  // 7. Invalid Algorithm
  const invalidAlgo = Validation.validatePracticeSet({ name: 'Good Name', algorithm: 'bogosort', array: '1, 2, 3' }, existing);
  assert(invalidAlgo.isValid === false, 'Unsupported algorithm is rejected');

  // 8. All Valid Algorithms Accepted
  const validAlgos = ['bubbleSort', 'selectionSort', 'insertionSort', 'mergeSort', 'quickSort', 'linearSearch', 'binarySearch'];
  let allAlgosValid = true;
  for (const algo of validAlgos) {
    const res = Validation.validatePracticeSet({ name: `Name for ${algo}`, algorithm: algo, array: '1, 2, 3' }, existing);
    if (!res.isValid) allAlgosValid = false;
  }
  assert(allAlgosValid, 'All 7 supported algorithms pass validation');

  // 9. Empty Array
  const emptyArray = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: '' }, existing);
  assert(emptyArray.isValid === false, 'Empty array string is rejected');

  // 10. Decimal Numbers
  const decimalArray = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: '5, 3.14, 8' }, existing);
  assert(decimalArray.isValid === false, 'Array with decimal numbers is rejected');

  // 11. Non-Numeric Tokens
  const textArray = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: '5, abc, 8' }, existing);
  assert(textArray.isValid === false, 'Array with letters/non-numbers is rejected');

  // 12. Array Size Limits (> 25 items)
  const tooManyItems = Array.from({ length: 26 }, (_, i) => i + 1).join(', ');
  const largeArray = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: tooManyItems }, existing);
  assert(largeArray.isValid === false, 'Array with > 25 items is rejected');

  // 13. Value Limits (< 1 or > 100)
  const outOfRangeLow = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: '0, 10, 20' }, existing);
  assert(outOfRangeLow.isValid === false, 'Value < 1 is rejected');

  const outOfRangeHigh = Validation.validatePracticeSet({ name: 'Valid Name', algorithm: 'bubbleSort', array: '50, 101' }, existing);
  assert(outOfRangeHigh.isValid === false, 'Value > 100 is rejected');

  // 14. Valid Array Accepted
  const validSet = Validation.validatePracticeSet({ name: 'Valid Set', algorithm: 'bubbleSort', array: '45, 23, 78, 12, 56' }, existing);
  assert(validSet.isValid === true, 'Properly formatted set passes validation');
  assert(JSON.stringify(validSet.data.array) === JSON.stringify([45, 23, 78, 12, 56]), 'Parsed array integers correctly');
}

// ==========================================
// Test Suite 10: Clear All Data
// ==========================================
console.log('\nTest Suite 10: Clear All Data Integration');
{
  localStorage.clear();
  Storage.createPracticeSet({ name: 'To Be Cleared', algorithm: 'bubbleSort', array: [1, 2, 3] });
  Storage.savePreferences({ animationSpeedMs: 500 });
  Storage.markAlgorithmCompleted('bubbleSort');

  assert(Storage.getPracticeSets().length === 1, 'Practice set created before clear');
  Storage.clearAllData();

  assert(Storage.getPracticeSets().length === 0, 'Practice sets cleared by clearAllData()');
  assert(localStorage.getItem('algosphere_practice_sets') === null, 'algosphere_practice_sets key removed from localStorage');
}

console.log(`\n--- ALL PRACTICE SETS TESTS COMPLETED: ${passedTests}/${totalTests} PASSED ---`);
if (passedTests !== totalTests) {
  process.exitCode = 1;
}
