# AlgoSphere 🌐
> **"Explore algorithms beyond the code."**

---

## Project Overview

**AlgoSphere** is an interactive, browser-native algorithm-learning studio built specifically for computer science students and software engineering placement candidates. It transforms abstract sorting and searching algorithms into intuitive, deterministic visual experiences. Learners can inspect memory operations, element comparisons, recursive divide-and-conquer boundaries, and pointer adjustments in real time, connecting dynamic visual changes directly to line-by-line synchronized pseudocode.

Designed with a focus on web engineering craftsmanship, AlgoSphere runs entirely on native web standards—HTML5, CSS3, and modern ECMAScript modules (ESM). It operates 100% on the client side with zero external JavaScript frameworks, zero third-party UI libraries, and zero server-side dependencies. It provides deterministic time-travel playback ($O(1)$ stepping forwards and backwards), dynamic runtime telemetry counters, and asymptotic complexity analysis.

In addition to visualization, AlgoSphere features an integrated **Practice Sets Studio** backed by native browser Web Storage (`localStorage`). Users can create, inspect, update, delete (CRUD), filter, and launch custom test arrays directly into the visualization engines to test edge cases, sorted distributions, inverted orders, and duplicate-heavy datasets.

---

## Problem Statement

Computer science students and software development job candidates frequently struggle to construct accurate mental models for fundamental algorithms when studying from static textbook diagrams, pseudocode blocks, or monochrome terminal traces. Traditional study methods fail to convey:
1. **Dynamic state evolution**: How pointers, pivots, partitions, and sorted boundaries shift across memory during runtime.
2. **Execution-to-code mapping**: Which exact line of pseudocode corresponds to a specific comparison, swap, shift, or overwrite.
3. **Edge-case behavior**: How algorithms behave on inverted arrays, nearly sorted inputs, identical values, and single-element distributions.
4. **Complexity in practice**: The practical impact of algorithmic optimizations (such as early-exit flags in Bubble Sort or adaptive scanning in Insertion Sort) versus strictly quadratic algorithms like Selection Sort.

AlgoSphere solves these challenges by providing an interactive studio where abstract operations become observable, predictable, and measurable.

---

## Project Goals

### Educational Goals
- Foster intuitive visual comprehension of comparison-based sorting and divide-and-conquer techniques.
- Bridge the gap between algorithmic theory (Big-O asymptotic bounds) and practical operation counts (comparisons, swaps, shifts, overwrites).
- Provide immediate, interactive feedback for edge cases (duplicate keys, inverted sequences, already-sorted inputs).
- Prepare computer science students for technical interview rounds through interactive visualization and placement glossary definitions.

### Technical Goals
- Adhere strictly to **Web Fundamentals**: 100% pure HTML5, vanilla CSS3, and ES6+ modules with zero external dependencies.
- Implement an **event-driven, snapshot-based visualizer architecture** supporting instant $O(1)$ backward/forward time-travel without recalculation glitches.
- Provide a robust **client-side Web Storage (`localStorage`) CRUD system** with complete error handling, validation, and schema resilience.
- Deliver a modern **Dark Developer Studio** design system with responsive layouts across desktop, tablet, and mobile viewports.
- Maintain high software quality verified by automated test suites.

---

## Project Proposal

### 1. Project Description
AlgoSphere is an educational web application that delivers real-time, interactive visualizations of fundamental sorting and searching algorithms alongside step-by-step pseudocode tracing, empirical telemetry metrics, and custom practice dataset management.

### 2. Objectives
- Enable users to visualize 5 sorting algorithms (Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort) and 2 searching algorithms (Linear Search, Binary Search).
- Synchronize visual state transitions with line-by-line pseudocode highlighting.
- Implement full client-side CRUD workflows for practice datasets using browser Web Storage.
- Enforce strict validation rules on all user inputs with actionable, accessible error messaging.

### 3. Specifications & Architecture
- **Client Architecture**: Single-page application (SPA) architecture utilizing native hash routing (`#/dashboard`, `#/sorting`, `#/searching`, `#/practice`, `#/learn`, `#/settings`).
- **Visualizer Engine**: Decoupled step generator functions (`generateBubbleSortSteps`, `generateQuickSortSteps`, etc.) produce immutable event snapshots consumed by a unified `StepEngine`, `AnimationController`, and `VisualizerRenderer`.
- **Data Persistence**: Native browser `localStorage` under the storage key `algosphere_practice_sets`, serialized as JSON with corruption recovery.
- **Design System**: Curated "Dark Developer Studio" aesthetic featuring deep navy canvas (`#0B1020`), slate panels (`#121A30`), violet brand accents (`#8B5CF6`), and semantic state tokens.

### 4. Educational Value
- **Asymptotic Theory Reinforcement**: Live counters verify theoretical best-, average-, and worst-case complexities in real time.
- **Placement Preparation**: Integrated CS placement guide covers algorithmic stability, in-place vs. out-of-place memory allocation, comparison lower bounds ($\Omega(n \log n)$), and Big-O efficiency ratings.

### 5. Web Fundamentals Constraints
- **HTML**: Semantic HTML5 markup, accessible form controls, ARIA landmark regions, and modal dialogs.
- **CSS**: Vanilla CSS3, custom CSS properties (variables), flexbox, grid, and fluid media queries. Zero CSS frameworks (no Tailwind, Bootstrap, or Sass).
- **JavaScript**: Pure ES6+ modules (`import`/`export`), object-oriented controllers, native DOM APIs, and zero npm runtime dependencies.

---

## Features

- **Sorting Visualizer Studio**:
  - 5 core sorting algorithms: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort.
  - Proportional vertical bar stage with dynamic height scaling and value badges.
  - Snapshot-based time travel: Play, Pause, Step Next, Step Previous, Reset, and arbitrary Step Scrubbing.
  - Dynamic playback speed control (30ms to 1000ms delay).
  - Synchronized line-by-line pseudocode highlighting.
  - Live 5-metric telemetry: Active Algorithm, Array Size, Step Progress, Comparisons, and Swaps/Shifts/Writes.
  - Presets: Random, Nearly Sorted, Reverse Sorted, Few Unique, and Already Sorted.
  - Custom dataset input with bounds and type validation (1–25 elements, integers 1–100).
- **Searching Visualizer Studio**:
  - Linear Search ($O(n)$) sequential scanning with pointer tracking.
  - Binary Search ($O(\log n)$) logarithmic divide-and-conquer with dynamic pointer markers (`Low`, `Mid`, `High`).
  - Real-time eliminated search space dimming (`state-eliminated`).
  - Unsorted array detection with immediate warning banner and 1-click in-place sort helper.
  - Search result announcement banner confirming target found index or absence with total comparisons made.
- **Practice Sets Studio (CRUD + Web Storage)**:
  - Complete Create, Read, Update, Delete (CRUD) workflow for custom datasets.
  - Persistent storage via browser `localStorage` (`algosphere_practice_sets`).
  - 1-click **Visualize** bridge loading custom practice arrays directly into Sorting or Searching studios.
  - Real-time live search by practice set name and filter by target algorithm.
  - Quick-fill preset pills (`5, 3, 8, 1, 2`, `10, 25, 42, 68, 90`, `Random 7`).
  - Accessible modal dialogs with keyboard Escape support and validation alerts.
- **Learn Studio**:
  - Theoretical sorting fundamentals (comparison lower bounds, stability, in-place categorization).
  - Searching fundamentals (sequential scan vs. divide-and-conquer, midpoint overflow prevention).
  - Comprehensive Big-O reference cheat sheet table ($O(1)$ through $O(n^2)$).
  - Side-by-side algorithm comparison matrix with direct visualizer launch buttons.
  - Compact CS Placement Glossary with essential interview definitions.
- **Studio Settings**:
  - Theme palette inspector with all 13 core CSS variables and hex codes.
  - Playback speed defaults (Slow 650ms, Normal 350ms, Fast 120ms).
  - Accessibility toggle for reduced-motion mode (`.reduce-motion`).
  - Default dataset size slider (6 to 20 elements).
  - Local studio preferences reset with toast notifications.
- **Responsive Layout**:
  - Fluid mobile drawer navigation for small viewports ($<768\text{px}$).
  - Full support across Desktop (1920x1080), Tablet (768x1024), and Mobile (390x844).
  - Zero horizontal overflow and touch-friendly controls.

---

## Algorithms Implemented

### Sorting Algorithms
1. **Bubble Sort**:
   - **Type**: Comparison-based, in-place, stable.
   - **Time Complexity**: Best $O(n)$ (with early-exit optimization), Average $O(n^2)$, Worst $O(n^2)$.
   - **Space Complexity**: Auxiliary $O(1)$.
   - **Mechanism**: Iteratively steps through adjacent element pairs, bubbling the largest unsorted value to the end. Halts in $O(n)$ if a complete pass occurs with zero swaps.
2. **Selection Sort**:
   - **Type**: Comparison-based, in-place, not stable (standard swap).
   - **Time Complexity**: Best $O(n^2)$, Average $O(n^2)$, Worst $O(n^2)$.
   - **Space Complexity**: Auxiliary $O(1)$.
   - **Mechanism**: Scans the unsorted subarray to locate the minimum element, then performs a single swap placing it into the sorted boundary. Fixed $n(n - 1)/2$ comparisons on all inputs.
3. **Insertion Sort**:
   - **Type**: Comparison-based, in-place, stable, adaptive.
   - **Time Complexity**: Best $O(n)$ (on pre-sorted inputs), Average $O(n^2)$, Worst $O(n^2)$.
   - **Space Complexity**: Auxiliary $O(1)$.
   - **Mechanism**: Incrementally constructs the sorted prefix by picking each key and shifting greater elements rightward to insert the key into its sorted slot.
4. **Merge Sort**:
   - **Type**: Divide-and-conquer, out-of-place, stable.
   - **Time Complexity**: Best $O(n \log n)$, Average $O(n \log n)$, Worst $O(n \log n)$.
   - **Space Complexity**: Auxiliary $O(n)$.
   - **Mechanism**: Recursively splits arrays down to single-element subarrays, then merges adjacent sorted lists in linear time with stable tie-breaking.
5. **Quick Sort**:
   - **Type**: Divide-and-conquer, partitioning, in-place, not stable.
   - **Time Complexity**: Best $O(n \log n)$, Average $O(n \log n)$, Worst $O(n^2)$ (unbalanced partitions).
   - **Space Complexity**: Call stack $O(\log n)$ average, $O(n)$ worst.
   - **Mechanism**: Deterministic Lomuto partitioning selects the last element as pivot, rearranges smaller elements to the left and larger elements to the right, and recursively sorts sub-partitions.

### Searching Algorithms
1. **Linear Search**:
   - **Type**: Sequential search, in-place.
   - **Time Complexity**: Best $O(1)$, Average $O(n)$, Worst $O(n)$.
   - **Space Complexity**: Auxiliary $O(1)$.
   - **Requirement**: Operates on arbitrary, unsorted or sorted arrays.
   - **Mechanism**: Examines elements sequentially from index 0 until the target is located or the array is exhausted.
2. **Binary Search**:
   - **Type**: Divide-and-conquer, logarithmic search, in-place.
   - **Time Complexity**: Best $O(1)$, Average $O(\log n)$, Worst $O(\log n)$.
   - **Space Complexity**: Auxiliary $O(1)$.
   - **Requirement**: Requires monotonically sorted array.
   - **Mechanism**: Evaluates the midpoint element. If equal to target, search terminates; if smaller, searches the right half; otherwise searches the left half, halving candidate space at each step.

---

## CRUD Operations

AlgoSphere implements complete **CRUD (Create, Read, Update, Delete)** operations on practice datasets, fulfilling the mandatory Web Storage and state management curriculum requirements:

- **Create**:
  - Click **"New Practice Set"** from the Practice Sets workspace or Dashboard hero.
  - Enter a descriptive dataset name (2–50 characters).
  - Select any of the 7 supported sorting or searching algorithms.
  - Provide a custom comma-separated integer array (1–25 elements, values 1–100) or click quick-fill presets (`5, 3, 8, 1, 2`, `10, 25, 42, 68, 90`, `Random 7`).
  - Validation ensures name uniqueness (case-insensitive), bounds compliance, and integer integrity.
  - Upon submission, a unique collision-free ID is generated, ISO timestamps (`createdAt`, `updatedAt`) are assigned, the record is prepended to `localStorage`, and the UI updates immediately with toast confirmation.
- **Read**:
  - Saved datasets load persistently from `localStorage` whenever navigating to `#/practice`.
  - Cards display the dataset name, target algorithm badge, array formatted as monospace value chips, item count, and formatted date.
  - Real-time search filters datasets by name as the user types.
  - Algorithm dropdown filters cards by category or specific algorithm.
  - If no practice sets exist, an empty state panel provides an onboarding message and direct creation trigger.
- **Update**:
  - Click **"Edit"** on any practice card to open the modal preloaded with the existing values.
  - Validation enforces name uniqueness (allowing the same record to keep its existing name), algorithm validity, and array limits.
  - Upon saving, only the selected record is updated in `localStorage`:
    - The record's unique `id` and initial `createdAt` timestamp remain unchanged.
    - The `updatedAt` timestamp is updated to the current time.
    - All other practice sets remain unmutated.
  - The cards grid re-renders immediately without requiring a full page refresh.
- **Delete**:
  - Click **"Delete"** on any card to display a dedicated confirmation modal naming the specific dataset.
  - Clicking Cancel dismisses the dialog with zero state mutations.
  - Clicking Confirm permanently removes that record from `localStorage`, displays an informational toast, and updates the grid.
  - If the last remaining set is deleted, the interface transitions gracefully back to the empty state.

---

## Web Storage

AlgoSphere utilizes the browser's native **`localStorage`** API because the studio is architected intentionally as a frontend-only client web application:
- **Zero Latency**: Data access and mutations occur synchronously on the client.
- **Offline Capable**: Works completely offline without internet connectivity or database infrastructure.
- **Data Hygiene & Security**: No passwords, API keys, tokens, or sensitive personal information are ever requested or stored.
- **Defensive Error Handling**: Safe `getItem` and `setItem` wrappers catch `QuotaExceededError` and `SyntaxError` exceptions. Corrupted or invalid JSON data recovers gracefully to an empty array rather than crashing the client.

**Primary Storage Keys**:
```
algosphere_practice_sets       # Practice sets array (CRUD records)
algosphere_user_preferences   # Playback speed, reduced motion, default array size
algosphere_completed_algos    # Explored algorithm tracking IDs
```

---

## Technology Stack

- **HTML5**: Semantic elements (`<aside>`, `<header>`, `<main>`, `<article>`, `<section>`, `<table>`, `<dialog>`), form accessibility, and ARIA landmarks.
- **CSS3**: Vanilla CSS with native CSS custom properties (variables), flexbox, grid, backdrop filters, keyframe animations, and media queries.
- **Vanilla JavaScript**: Modern ES6+ modules (`import`/`export`), class-based controllers, closures, array methods, and event dispatchers.
- **Web Storage**: Browser `localStorage` for persistent client data management.
- **Zero Frameworks / Libraries**: Pure vanilla code with zero external runtime dependencies.

---

## HTML Concepts Used

- **Semantic Layout Elements**: `<header>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>` providing clear landmark structure.
- **Form Controls & Inputs**: Text inputs, numeric inputs, range sliders (`<input type="range">`), select dropdowns (`<select>`, `<optgroup>`), buttons, and checkboxes.
- **Form Validation Attributes**: `required`, `maxlength`, `min`, `max`, `step`.
- **Accessible ARIA Attributes**: `aria-label`, `aria-hidden`, `aria-live="polite"`, `role="dialog"`, `aria-labelledby`.
- **Tabular Data Markup**: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` for Big-O reference and complexity matrix tables.
- **Dynamic DOM Containers**: Dedicated mounting viewports for SPA route controllers, modals, and toasts.

---

## CSS Concepts Used

- **CSS Custom Properties (Variables)**: Centralized design token system (`--bg`, `--panel`, `--primary`, `--border`, `--font-mono`, `--space-4`, etc.).
- **CSS Flexbox**: One-dimensional alignment for navigation bars, button toolbars, header breadcrumbs, and card headers.
- **CSS Grid**: Two-dimensional layouts for dashboard metrics (`.stat-grid`), practice sets (`.practice-sets-grid`), algorithm catalog cards, and complexity grids.
- **Responsive Media Queries**: Breakpoints at `1024px` (tablet), `768px` (mobile drawer, stacked toolbar), and `480px` (small mobile, condensed labels).
- **Glassmorphism & Surface Elevation**: `backdrop-filter: blur()`, semi-transparent navy surfaces, and subtle box shadows.
- **Transitions & Keyframe Animations**: Smooth hover transitions, pointer bounce animations (`@keyframes pointer-bounce`), and toast entry transitions (`@keyframes toast-in`).
- **Accessibility Modes**: `@media (prefers-reduced-motion)` and `.reduce-motion` utility classes disabling animations for sensitive users.

---

## JavaScript Concepts Used

- **ES6 Modules**: Modular architecture with explicit `import` and `export` statements across components, pages, algorithms, and utilities.
- **DOM Manipulation & Traversal**: Dynamic element creation, template string interpolation with HTML escaping, class toggling, and query selectors.
- **Event Handling & Delegation**: `click`, `input`, `change`, `keydown` (Space, Left/Right arrows, R, Enter, Escape), `DOMContentLoaded`, and `hashchange`.
- **Asynchronous Execution & Timers**: Deterministic timer management using `setTimeout` and `clearTimeout` guarded by generation counters to prevent race conditions.
- **Data Structures**: Arrays, Sets, Maps, and immutable object snapshots.
- **JSON Serialization**: `JSON.stringify()` and `JSON.parse()` with try/catch error handling.
- **Clean Architecture & Separation of Concerns**: Decoupled pure algorithm logic (zero DOM dependencies) from visualization rendering and animation scheduling.

---

## Project Structure

```
algosphere/
├── .gitignore                   # Version control ignore rules (IDE, logs, env, dependencies)
├── index.html                   # HTML5 semantic entry point shell
├── LICENSE                      # MIT Open Source License
├── package.json                 # Project metadata & test scripts
├── package-lock.json            # Lockfile
├── README.md                    # Project documentation & architectural guide
├── css/
│   ├── components.css           # Panels, buttons, badges, alerts, modals, toasts
│   ├── layout.css               # Shell layout, sticky header, sidebar navigation
│   ├── reset.css                # Base reset, typography, and scrollbar styling
│   ├── responsive.css           # Breakpoints for tablet (1024px) & mobile (768px/480px)
│   ├── variables.css            # Dark Developer Studio design tokens & color variables
│   └── visualizer.css           # Vertical bars, horizontal cells, pointers, pseudocode
├── js/
│   ├── app.js                   # Application bootstrap and module initialization
│   ├── router.js                # Hash-based SPA client router
│   ├── state.js                 # Global application state and toast notifications
│   ├── algorithms/
│   │   ├── searching/
│   │   │   ├── binarySearch.js  # Binary search step generator
│   │   │   └── linearSearch.js  # Linear search step generator
│   │   └── sorting/
│   │       ├── bubbleSort.js    # Bubble sort step generator
│   │       ├── insertionSort.js # Insertion sort step generator
│   │       ├── mergeSort.js     # Merge sort step generator
│   │       ├── quickSort.js     # Quick sort step generator
│   │       └── selectionSort.js # Selection sort step generator
│   ├── components/
│   │   ├── algorithmCard.js     # Reusable algorithm catalog card
│   │   ├── header.js            # Top header breadcrumbs and mobile menu trigger
│   │   └── sidebar.js           # Desktop & mobile drawer navigation sidebar
│   ├── data/
│   │   ├── algorithmMetadata.js # Algorithm metadata, complexities, and pseudocode
│   │   └── learningContent.js   # Educational guides, Big-O reference, and glossary
│   ├── pages/
│   │   ├── dashboard.js         # Dashboard page controller
│   │   ├── learn.js             # Learn studio page controller
│   │   ├── practiceSets.js      # Practice sets CRUD & Web Storage controller
│   │   ├── searching.js         # Searching visualizer controller
│   │   ├── settings.js          # Studio settings page controller
│   │   └── sorting.js           # Sorting visualizer controller
│   ├── utils/
│   │   ├── arrayUtils.js        # Dataset generators and isSorted helper
│   │   ├── storage.js           # Safe localStorage persistence and CRUD utility
│   │   └── validation.js        # Array and practice set validation utilities
│   └── visualizer/
│       ├── animationController.js # Timer coordination and race-condition prevention
│       ├── controls.js          # UI button bindings and keyboard shortcuts
│       ├── renderer.js          # DOM updater for bars, cells, pointers, code
│       └── stepEngine.js        # Deterministic step cursor and snapshot manager
└── tests/
    ├── manual-test-checklist.md # Structured end-to-end verification checklist
    ├── test-day1.js             # Bubble sort automated tests (44 assertions)
    ├── test-selectionSort.js    # Selection sort automated tests (79 assertions)
    ├── test-insertionSort.js    # Insertion sort automated tests (73 assertions)
    ├── test-mergeSort.js        # Merge sort automated tests (77 assertions)
    ├── test-quickSort.js        # Quick sort automated tests (105 assertions)
    ├── test-searching.js        # Searching visualizers automated tests (100 assertions)
    └── test-practiceSets.js     # Practice sets CRUD & storage tests (73 assertions)
```

---

## Prerequisites

Because AlgoSphere is built with pure web technologies and native ES Modules:
- A modern web browser supporting ES6 modules (Chrome, Edge, Firefox, Safari).
- A local HTTP static file server (ES Modules require HTTP/HTTPS protocol due to browser CORS policies on `file:///` URLs).
- Optional: Node.js (v16+) to run the automated test suite.

---

## How to Run

### Step 1: Obtain the Project
Clone or download the repository to your local computer:
```bash
git clone https://github.com/Hardikchilana1243/AlgoSphere.git
cd AlgoSphere
```

### Step 2: Start a Local Server
Start any lightweight local static server in the project directory:

**Using Python (pre-installed on most systems)**:
```bash
python -m http.server 8000
```

**Using Node.js `npx serve`**:
```bash
npx -y serve .
```

**Using VS Code Live Server**:
Right-click `index.html` and select **"Open with Live Server"**.

### Step 3: Open in Browser
Navigate to the local server URL in your browser:
```
http://localhost:8000
```

### Step 4: Run the Automated Tests (Optional)
To execute the automated verification test suite:
```bash
npm test
```

---

## Testing

AlgoSphere incorporates both automated verification suites and a structured manual checklist:

### Automated Test Suite Results
All test suites execute natively in Node.js (`type: module`) without requiring heavy testing frameworks. Every assertion is verified:

| Test File | Target Component | Assertions | Status |
|---|---|:---:|:---:|
| `tests/test-day1.js` | Bubble Sort & Base Validation | 44 | **PASSED** |
| `tests/test-selectionSort.js` | Selection Sort & Engine Integration | 79 | **PASSED** |
| `tests/test-insertionSort.js` | Insertion Sort & Key Shifts | 73 | **PASSED** |
| `tests/test-mergeSort.js` | Merge Sort & Divide-and-Conquer | 77 | **PASSED** |
| `tests/test-quickSort.js` | Quick Sort & Lomuto Partitioning | 105 | **PASSED** |
| `tests/test-searching.js` | Linear & Binary Search, Pointers, Bounds | 100 | **PASSED** |
| `tests/test-practiceSets.js` | Practice Sets CRUD, Storage & Corruption | 73 | **PASSED** |
| **TOTAL** | **Full Application Verification** | **551** | **551 / 551 PASSED (100%)** |

### Manual Testing Verification
- **Functional Testing**: Validated across all 5 sorting algorithms and 2 searching algorithms with custom arrays, randomized datasets, preset distributions, step scrubbing, speed adjustments, and keyboard shortcuts.
- **CRUD Operations**: Verified Create, Read, Update, Delete, and persistence across browser refreshes with zero duplicate records or unintended deletions.
- **Responsive Testing**: Verified layout integrity, touch targets, and navigation drawer on Desktop (1920x1080), Tablet (768x1024), and Mobile (390x844).
- **Console / Runtime**: 0 unexpected JavaScript console errors during navigation, visualization, sorting, searching, or storage operations.

---

## Screenshots

The AlgoSphere application interface is styled using a custom CSS-rendered **Dark Developer Studio** design system with inline SVG iconography, eliminating dependencies on external image assets:
- **Dashboard Studio**: Unified hero section, key telemetry metrics, and filterable algorithm catalog.
- **Sorting Visualizer**: Vertical bar stage with dynamic color states (Blue: Normal, Violet: Comparing, Amber: Key, Pink: Swapping/Moving, Green: Sorted), synchronized pseudocode, and live operation counters.
- **Searching Visualizer**: Horizontal cell stage with animated pointer badges (`Low`, `Mid`, `High`, `Current`) and real-time eliminated space dimming.
- **Practice Sets Studio**: Monospace array chip previews, filter toolbar, responsive cards grid, and accessible modal dialogs.
- **Learn Studio**: Complexity tables, Big-O reference matrix, and placement glossary cards.

---

## Future Enhancements

1. **Additional Data Structures**: Tree traversal visualizers (Binary Search Trees, AVL balance rotations) and Graph algorithms (BFS, DFS, Dijkstra's shortest path).
2. **Audio Frequency Synthesizer**: Web Audio API tone synthesis mapped to element values during comparison and swap passes.
3. **Dual Algorithm Comparison**: Side-by-side visualization running two sorting algorithms simultaneously on identical input data to compare empirical operation counts.
4. **Custom Code Editor**: User-editable pseudocode editor allowing custom algorithm experiments.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## Author

**Hardik Chilana**  
GitHub: [@Hardikchilana1243](https://github.com/Hardikchilana1243)  
Email: `h2154678@gmail.com`  
*AlgoSphere — Web Fundamentals Project*
