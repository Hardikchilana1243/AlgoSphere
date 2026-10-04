# AlgoSphere — Manual Testing Checklist

Use this checklist to perform end-to-end quality assurance before presenting AlgoSphere in placement interviews or deployment.

---

## 1. Shell & Routing
- [ ] **Hash Navigation**:
  - [ ] Clicking **Dashboard** navigates to `#/dashboard` and renders the Hero, stats, and catalog.
  - [ ] Clicking **Sorting Visualizer** navigates to `#/sorting`.
  - [ ] Clicking **Searching Visualizer** navigates to `#/searching`.
  - [ ] Clicking **Learn Studio** navigates to `#/learn`.
  - [ ] Clicking **Studio Settings** navigates to `#/settings`.
  - [ ] Direct URL entry with query parameters (e.g. `#/sorting?algo=quickSort`) automatically selects the requested algorithm.
- [ ] **Active Link Highlighting**: The active navigation item in the sidebar possesses the elevated panel styling and violet icon.
- [ ] **Breadcrumbs**: Top header breadcrumbs update synchronously with the active page.
- [ ] **Mobile Drawer**:
  - [ ] Hamburger button appears on screens $<768\text{px}$.
  - [ ] Clicking hamburger opens the sidebar with a blurred backdrop overlay.
  - [ ] Clicking any link or the backdrop smoothly dismisses the sidebar drawer.

---

## 2. Dashboard
- [ ] **Branding & Copy**: Tagline *"Explore algorithms beyond the code"* and *"Understand algorithms, one step at a time"* are visible.
- [ ] **Hero CTAs**:
  - [ ] *"Start Visualizing"* navigates to `#/sorting`.
  - [ ] *"Explore Big-O & Guides"* navigates to `#/learn`.
- [ ] **Catalog Filter Tabs**:
  - [ ] Clicking **All (7)** displays all 7 algorithm cards.
  - [ ] Clicking **Sorting (5)** filters to Bubble, Selection, Insertion, Merge, Quick Sort.
  - [ ] Clicking **Searching (2)** filters to Linear Search and Binary Search.
- [ ] **Card Launch Buttons**: Each card button jumps directly to the visualizer with the corresponding algorithm pre-selected.

---

## 3. Sorting Visualizer
- [ ] **Algorithm Selector**:
  - [ ] Bubble Sort loads with correct $O(n^2)$ complexity metadata and pseudocode.
  - [ ] Selection Sort loads with $O(n^2)$ metadata and min-finding pseudocode.
  - [ ] Insertion Sort loads with adaptive $O(n)$ best / $O(n^2)$ worst complexity.
  - [ ] Merge Sort loads with $O(n \log n)$ divide-and-conquer steps and auxiliary writes.
  - [ ] Quick Sort loads with pivot partitioning steps.
- [ ] **Visual Elements**:
  - [ ] Vertical bars render with proportional heights and numbers.
  - [ ] Color states conform to design rules:
    - Default bars: Secondary Blue (`#60A5FA`)
    - Comparing: Violet (`#8B5CF6`)
    - Current/Key: Amber (`#FBBF24`)
    - Moving/Swapping/Writing: Pink (`#FB7185`)
    - Sorted elements: Green (`#34D399`)
- [ ] **Input & Presets**:
  - [ ] Preset dropdown (*Random*, *Nearly Sorted*, *Reverse Sorted*, *Few Unique*) generates distinct datasets.
  - [ ] Typing valid custom array (e.g. `20, 10, 50, 40, 30`) updates the bars immediately.
  - [ ] Typing invalid input (letters, $<5$ items, $>25$ items, numbers $>100$) shows a red error banner without crashing.
- [ ] **Step Execution & Controls**:
  - [ ] **Play**: Starts step-by-step playback; button text changes to **Pause**.
  - [ ] **Pause**: Freezes playback immediately without pending timer leakage.
  - [ ] **Next Step**: Advances exactly 1 operation; pseudocode line updates.
  - [ ] **Previous Step**: Steps backward 1 operation; array state is accurately restored.
  - [ ] **Reset**: Returns array to its original input state; counters reset to 0.
  - [ ] **Scrubber**: Dragging the range slider jumps to any step instantly.
  - [ ] **Speed Slider**: Adjusting speed speeds up or slows down playback dynamically.
  - [ ] **Keyboard**: Space toggles play/pause; Left/Right step backwards/forwards; R resets.
- [ ] **Counters**: Comparison and Swap counters increment accurately.

---

## 4. Searching Visualizer
- [ ] **Linear Search**:
  - [ ] Searches sequentially from index 0 upward.
  - [ ] Target found: highlights found cell in green, shows success banner with index and comparison count.
  - [ ] Target missing: scans entire array, shows red "Target Not Found" banner.
- [ ] **Binary Search**:
  - [ ] Correctly renders Low, Mid, and High pointer badges above cells.
  - [ ] Eliminated search space cells become dimmed (`state-eliminated`).
  - [ ] Target found: highlights midpoint cell in green with success banner.
  - [ ] Target missing: search bounds invert ($low > high$) and banner confirms absence.
- [ ] **Unsorted Array Guard**:
  - [ ] Entering an unsorted array into Binary Search triggers the warning banner: *"Binary Search requires a sorted array"*.
  - [ ] Clicking **[Sort Array Now]** sorts the array in-place and clears the warning.

---

## 5. Learn Studio
- [ ] **Guides**:
  - [ ] Sorting Fundamentals section renders comparison lower-bound, stability, and in-place concepts.
  - [ ] Searching Fundamentals section renders sequential vs logarithmic principles.
- [ ] **Big-O Cheat Sheet**:
  - [ ] Table renders $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$ with color badges.
- [ ] **Matrix Table**:
  - [ ] All 7 algorithms listed with Best, Avg, Worst, Space, and Stability.
  - [ ] "Try It →" links navigate to the corresponding visualizer.
- [ ] **Glossary**:
  - [ ] All 9 computer science placement terms rendered cleanly.

---

## 6. Practice Sets (CRUD & Web Storage)
- [ ] **Empty State**:
  - [ ] Opening Practice Sets with empty storage displays polished empty state card and "Create Your First Practice Set" CTA button.
- [ ] **CREATE Operation**:
  - [ ] Clicking **New Practice Set** opens accessible modal with focused name input.
  - [ ] Quick fill presets (`5, 3, 8, 1, 2`, `10, 25, 42, 68, 90`, `Random 7`) populate the array input correctly.
  - [ ] Array item counter dynamically updates as user enters comma-separated numbers.
  - [ ] Validation prevents submitting empty name, short name (<2 chars), duplicate names, empty array, or non-numeric tokens with red inline error alerts.
  - [ ] Submitting valid data saves record, closes modal, displays success toast, and immediately shows new card at top of grid.
- [ ] **READ Operation**:
  - [ ] Saved practice sets load persistently from `algosphere_practice_sets` in `localStorage`.
  - [ ] Card header displays set name, algorithm name badge, and item count.
  - [ ] Array preview renders values as styled monospace chips that wrap gracefully without horizontal overflow.
  - [ ] Search bar filters cards in real-time as user types.
  - [ ] Algorithm dropdown filters cards by category/algorithm.
- [ ] **UPDATE Operation**:
  - [ ] Clicking **Edit** opens modal pre-filled with the existing record's name, algorithm, and array.
  - [ ] Editing values and saving updates only that record while preserving its unique ID and original creation timestamp.
  - [ ] Toast notification confirms successful update.
- [ ] **DELETE Operation**:
  - [ ] Clicking **Delete** opens a confirmation dialog stating the exact name of the practice set.
  - [ ] Clicking Cancel dismisses dialog without deleting.
  - [ ] Clicking **Confirm Delete** removes only that specific item, updates `localStorage`, and triggers confirmation toast.
  - [ ] Deleting the last remaining set gracefully returns the UI to the empty state.
- [ ] **VISUALIZE Operation**:
  - [ ] Clicking **Visualize** on a Sorting set (e.g. Bubble Sort) navigates to `#/sorting` with the selected algorithm and custom array pre-loaded.
  - [ ] Clicking **Visualize** on a Searching set (e.g. Binary Search) navigates to `#/searching` with the algorithm, array, and target pre-loaded.
- [ ] **Data Persistence & Hygiene**:
  - [ ] Refreshing the browser preserves all created/updated practice sets.
  - [ ] No passwords, API keys, or sensitive data are stored in `localStorage`.

---

## 7. Studio Settings
- [ ] **Color Tokens**: Swatch cards render all 13 starting CSS variables with hex values.
- [ ] **Speed Selector**: Clicking Slow / Normal / Fast updates default speed and shows toast.
- [ ] **Reduced Motion**: Toggling checkbox enables/disables animations and applies `.reduce-motion` class.
- [ ] **Reset Preferences / Clear Data**: Resets localStorage and triggers confirmation toast.

---

## 8. Responsive & Cross-Browser Integrity
- [ ] **Desktop ($>1200\text{px}$)**: Persistent 240px sidebar, 2-column visualizer layout, multi-column practice sets grid.
- [ ] **Tablet ($768\text{px} - 1024\text{px}$)**: Single column visualizer workspace, compact sidebar, 2-column practice sets grid.
- [ ] **Mobile ($<768\text{px}$)**: Collapsed drawer navigation, controls stack vertically, modal fits screen comfortably with scrollable body, no horizontal page overflow.
- [ ] **Console**: Browser DevTools console is 100% free of JavaScript errors or missing module warnings.
