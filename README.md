# AlgoSphere 🌐
> **"Explore algorithms beyond the code."**

AlgoSphere is an interactive algorithm-learning studio designed for computer science students and SDE interview candidates. It transforms abstract sorting and searching algorithms into intuitive, step-by-step visual experiences with synchronized pseudocode, live comparison/swap counters, and asymptotic complexity analysis.

Built specifically to demonstrate strong frontend engineering skills, clean architecture, and modern UI/UX design in software engineering placement interviews.

---

## 📋 Project Proposal

### 1. Problem Statement
Many computer science students and software engineering job candidates struggle to develop an intuitive mental model for how fundamental algorithms manipulate memory, traverse data structures, and compare elements. Traditional textbooks and static code snippets fail to capture the dynamic time-evolution of algorithms, leading to rote memorization rather than deep conceptual comprehension.

### 2. Project Goal & Educational Value
**AlgoSphere** bridges this gap by creating an interactive, browser-native algorithm studio where learners can:
- Observe algorithm state transitions with deterministic, step-by-step time-travel.
- Connect runtime behavior directly to synchronized line-by-line pseudocode.
- Inspect exact asymptotic complexities ($O(n)$, $O(n^2)$, $O(\log n)$) and see how optimizations (such as early-exit flags) operate in practice.
- Experiment with customized datasets, duplicates, edge cases, and inverted distributions.

### 3. Target Audience
- Computer Science undergraduate and graduate students.
- Coding bootcamp participants and self-taught developers.
- Software Development Engineer (SDE) interview candidates preparing for technical rounds.

### 4. Technical Scope & Architecture
- **Strict Web Fundamentals**: Built with pure HTML5, vanilla CSS3, and modern ES6+ JavaScript modules. No external JavaScript libraries, frameworks, build tools, or backend servers.
- **Responsive Architecture**: Fluid layout supporting mobile, tablet, and widescreen desktop displays.
- **Client Persistence**: Web Storage (`localStorage`) integration for user settings, animation preferences, and learning progress tracking.
- **Event-Driven Visualizer**: Clean decoupling between pure algorithm generators (`generateBubbleSortSteps`) and the DOM renderer, supporting $O(1)$ time-travel stepping without re-execution artifacts.

---

## 📅 Development Roadmap & Milestone Status

- [x] **Day 1 — Bubble Sort Visualizer**:
  - Implemented decoupled Bubble Sort step generator with complete event snapshots.
  - Full playback controls (Play, Pause, Step Next, Step Prev, Reset Visualization, Speed adjustment).
  - Custom dataset input with bounds validation (1–25 elements, integers 1–100, duplicates, edge cases).
  - Vertical bar visualization with standard AlgoSphere developer-studio color states.
  - Live 5-metric telemetry (Algorithm, Array Size, Step Progress, Comparisons, Swaps).
  - Synchronized pseudocode highlighting.
  - Theory card with $O(n)$ best-case early-exit optimization documentation.
- [x] **Day 2 — Selection Sort Visualizer**:
  - Pure event-driven Selection Sort step generator (`generateSelectionSortSteps`) adhering strictly to the shared step schema.
  - Interactive visualization tracking the current boundary position, current minimum candidate (Amber), comparison elements (Violet), swaps (Pink), and sorted section (Green).
  - Synchronized 9-line pseudocode highlighting matching algorithm execution steps.
  - Accurate theoretical complexity cards displaying strict $O(n^2)$ best/average/worst runtime, $O(1)$ space, and instability notice.
  - Full playback controls (Play, Pause, Step Next, Step Prev, Reset, Scrubber, Speed Slider, Keyboard shortcuts).
  - Automated test suite with 79 assertions covering standard, sorted, reverse, duplicates, single-element, empty array, and engine integration.
- [x] **Day 3 — Insertion Sort Visualizer**:
  - Pure event-driven Insertion Sort step generator (`generateInsertionSortSteps`) adhering strictly to the shared step schema.
  - Interactive visualization tracking current key element (Amber), sorted prefix comparisons (Violet), rightward element shifts (Pink), and sorted boundary (Green).
  - Synchronized 10-line pseudocode highlighting matching algorithm execution phases.
  - Accurate theoretical complexity cards displaying adaptive $O(n)$ best runtime, $O(n^2)$ average/worst runtime, $O(1)$ space, and stability.
  - Full playback controls (Play, Pause, Step Next, Step Prev, Reset, Scrubber, Speed Slider, Keyboard shortcuts).
- [x] **Day 4 — Merge Sort Visualizer**:
  - Pure event-driven Merge Sort step generator (`generateMergeSortSteps`) adhering strictly to the shared step schema.
  - Interactive divide-and-conquer visualization tracking recursive splits (Amber midpoint), sorted halves comparison (Violet), overwrites into merged positions (Pink), and completed merged regions (Green).
  - Synchronized 11-line pseudocode highlighting matching split, recursion, compare, overwrite, and remaining copy phases.
  - Guaranteed $O(n \log n)$ asymptotic runtime across best, average, and worst cases with $O(n)$ auxiliary space and stable ordering.
  - Comprehensive automated test suite with 77 assertions covering edge cases, stability, arbitrary random arrays, time-travel, and engine integration.
- [x] **Day 5 — Quick Sort Visualizer**:
  - Pure event-driven Quick Sort step generator (`generateQuickSortSteps`) with deterministic Lomuto partition scheme and in-place swapping.
  - Interactive visualization highlighting pivot selection (Amber), partition scanning comparisons (Violet), boundary adjustments and element swaps (Pink), and finalized pivot/single-element sorted states (Green).
  - Synchronized 13-line pseudocode highlighting corresponding to function recursion, pivot selection, comparison passes, and pivot placement.
  - Accurate theoretical complexity cards displaying $O(n \log n)$ best/average runtime, $O(n^2)$ worst-case on unbalanced partitions, $O(\log n)$ recursive call stack auxiliary space, in-place categorization, and standard instability explanation.
  - Comprehensive automated test suite with 105+ assertions covering standard, already-sorted (0 swaps), reverse-sorted, duplicate-heavy, equal-value arrays, edge cases, time-travel engine, and algorithm switching.
- [x] **Day 6 — Searching Visualizers**:
  - Linear Search ($O(n)$) sequential inspection with instant found/missing alerts.
  - Binary Search ($O(\log n)$) logarithmic divide-and-conquer with Low, Mid, High pointer tracking.
  - Unsorted array detection and 1-click in-place sorting helper.
- [x] **Day 7 — Practice Sets (CRUD & Web Storage)**:
  - Complete Create, Read, Update, Delete (CRUD) operations backed by browser `localStorage`.
  - Storage key `algosphere_practice_sets` with safe JSON parsing and corruption recovery.
  - Direct integration with Sorting and Searching visualizers via "Visualize" action.
  - Real-time search by name, algorithm category filter, and modal-based dialogs.
  - Automated test suite with 73 assertions covering all CRUD operations, unique IDs, and edge cases.

---

## 🎨 Design Direction: Dark Developer Studio
AlgoSphere is styled as a modern developer tool with a focused, professional SaaS aesthetic:
- **Canvas Background**: Deep navy (`#0B1020`)
- **Navigation Sidebar**: Dark slate navy (`#0E1428`)
- **Surfaces & Panels**: Elevated navy (`#121A30`, `#18223B`)
- **Structural Borders**: Subtle blue-gray (`#28324D`)
- **Brand Accent**: Restrained violet (`#8B5CF6`) and violet hover (`#A78BFA`)
- **Secondary Highlights**: Soft blue (`#60A5FA`)
- **Semantic State Tokens**:
  - `Default Array Elements`: Secondary Blue (`#60A5FA`)
  - `Active Comparison`: Violet (`#8B5CF6`)
  - `Current Index / Midpoint`: Amber (`#FBBF24`)
  - `Moving / Swapping / Overwrite`: Pink (`#FB7185`)
  - `Permanently Sorted`: Emerald Green (`#34D399`)
  - `Eliminated Search Space`: Dimmed Slate (`#1E293B`)
- **Typography**: Inter for interface elements; JetBrains Mono for pseudocode, numeric metadata, and array indices.

---

## 🚀 Key Features

### 1. Unified Algorithm Dashboard
- Clean hero section with clear value proposition and primary CTAs.
- Key telemetry metrics (7 algorithms, 100% deterministic stepping, line-by-line code tracking).
- Filterable Algorithm Catalog (`All`, `Sorting`, `Searching`) with complexity tags and direct launcher links.
- 3-step beginner onboarding guide and local learning progress tracking.

### 2. Practice Sets Studio (CRUD Operations + Web Storage)
- Full **CRUD** workflow for custom algorithm practice arrays.
- Persistent client storage using browser **`localStorage`** (`algosphere_practice_sets`).
- **Create**: Add custom named arrays with algorithm targeting and input validation.
- **Read**: View saved arrays formatted as monospace chips with item counts and timestamps.
- **Update**: Edit existing practice sets in-place while preserving IDs and creation dates.
- **Delete**: Remove sets with explicit confirmation modal protection.
- **Visualize**: 1-click bridge loading any saved practice set directly into the corresponding visualizer.
- Real-time search and filter controls.

### 2. Sorting Visualizer
- **Algorithms Implemented**:
  - **Bubble Sort**: Adjacent-element comparison and swap, largest value bubbles to end of unsorted section, $O(n)$ best-case early-exit optimization, stable.
  - **Selection Sort**: Unsorted subarray linear scan to identify minimum element, minimum candidate tracking (Amber), comparisons (Violet), in-place swaps (Pink), sorted boundary (Green), strict $O(n^2)$ best/average/worst runtime, not stable in-place.
  - **Insertion Sort**: Incremental sorted subarray construction, current key tracking (Amber), comparisons against sorted prefix (Violet), rightward shifts (Pink), in-place insertion, adaptive $O(n)$ best-case runtime on sorted data, $O(n^2)$ worst-case, $O(1)$ space, stable.
  - **Merge Sort**: Divide-and-conquer splitting down to single-element subarrays, linear-time two-way merging, comparison of front elements (Violet), in-place overwrites (Pink), guaranteed $O(n \log n)$ best/average/worst runtime, $O(n)$ auxiliary space, stable.
  - **Quick Sort**: Partition-based divide-and-conquer using deterministic Lomuto partitioning, pivot selection (Amber), comparisons (Violet), in-place swaps (Pink), finalized pivot placement (Green), $O(n \log n)$ average runtime, $O(n^2)$ worst-case, $O(\log n)$ stack space, in-place, not stable.
- **Vertical Bar Visualization**: Dynamic height scaling, value badges, and index numbers.
- **Full Playback Controls**: Play, Pause, Previous Step, Next Step, Reset, and arbitrary Step Scrubbing.
- **Step Engine**: Snapshot-based architecture guaranteeing instant, bug-free backwards and forwards time travel without recalculation bugs.
- **Synchronized Pseudocode**: Line-by-line highlighting synchronized with the current execution phase.
- **Real-Time Telemetry**: Comparison counters, swap/overwrite counters, and active operation explanation banners.
- **Dataset Generation**: Custom comma-separated input (with bounds validation), plus presets: *Random*, *Nearly Sorted*, *Reverse Sorted*, *Few Unique*.

### 3. Searching Visualizer
- **Supported Algorithms**: Linear Search ($O(n)$) and Binary Search ($O(\log n)$).
- **Horizontal Cell Stage**: Value boxes with index numbers and dynamic pointer badges (`Low`, `Mid`, `High`, `Current`).
- **Eliminated Search Space**: Dimmed cells show active narrowing of the search space in real-time.
- **Sorted Array Guard**: If an unsorted array is loaded into Binary Search, a warning banner alerts the user and provides a 1-click `[Sort Array Now]` button.
- **Result Announcement Banner**: Instant visual confirmation of target found/not-found status with total comparisons.

### 4. Learn Studio
- **Sorting Fundamentals**: In-place vs. out-of-place, stability, and comparison-based lower bounds ($\Omega(n \log n)$).
- **Searching Fundamentals**: Sequential scan vs. divide-and-conquer, integer overflow prevention in midpoint calculation.
- **Big-O Reference Cheat Sheet**: Full table covering $O(1)$ through $O(n^2)$ with efficiency ratings and canonical examples.
- **CS Placement Glossary**: Concise definitions for comparison, swap, inversion, pivot, partition, search space, and stability.
- **Matrix Table**: Side-by-side complexity comparison with instant visualizer launching.

### 5. Studio Settings
- Palette swatch inspector displaying all exact CSS variables and hex codes.
- Default animation speed selector (Slow 650ms, Normal 350ms, Fast 120ms).
- Reduced-motion accessibility toggle with system media query integration.
- Default dataset size slider.
- 1-click localStorage reset with toast notification.

---

## 🛠️ Strict Technology Constraints
AlgoSphere is intentionally built with **100% pure vanilla web technologies**:
- **HTML5**: Semantic tags (`<aside>`, `<header>`, `<main>`, `<article>`, `<section>`, `<table>`).
- **CSS3**: Native CSS custom properties, flexbox, CSS grid, backdrop filters, and responsive media queries.
- **Vanilla JavaScript**: Modern ES6+ modules (`import`/`export`), classes, and event dispatching.
- **Zero External Dependencies**: No React, Vue, Angular, Svelte, Tailwind, or jQuery.
- **Zero Build Tools**: No Webpack, Vite, Rollup, Babel, or npm scripts needed to run.
- **Zero Backend / Server APIs**: Runs entirely client-side as a static web application.

---

## 📁 Directory Structure

```
algosphere/
├── index.html                   # HTML5 entry point & semantic shell
├── README.md                    # Project documentation & architectural guide
├── css/
│   ├── variables.css            # Dark Developer Studio design tokens
│   ├── reset.css                # Base reset, typography, and scrollbar styling
│   ├── layout.css               # Sidebar (240px), header, main viewport layout
│   ├── components.css           # Reusable panels, buttons, badges, alerts, toasts
│   ├── visualizer.css           # Vertical bars, horizontal cells, pointers, pseudocode
│   └── responsive.css           # Tablet & mobile drawers, stacked layouts
├── js/
│   ├── app.js                   # Application bootstrap and module orchestration
│   ├── router.js                # Hash-based SPA router with query parameters
│   ├── state.js                 # Global application state and toast dispatching
│   ├── data/
│   │   ├── algorithmMetadata.js # Metadata, complexities, tags, and pseudocode
│   │   └── learningContent.js   # Guides, Big-O table, and glossary terms
│   ├── components/
│   │   ├── sidebar.js           # Navigation links and mobile drawer controller
│   │   ├── header.js            # Breadcrumbs, quick links, and mobile menu button
│   │   └── algorithmCard.js     # Reusable catalog and matrix card component
│   ├── pages/
│   │   ├── dashboard.js         # Dashboard page controller
│   │   ├── sorting.js           # Sorting visualizer controller
│   │   ├── searching.js         # Searching visualizer controller
│   │   ├── practiceSets.js      # Practice sets CRUD & localStorage controller
│   │   ├── learn.js             # Learn studio page controller
│   │   └── settings.js          # Settings page controller
│   ├── algorithms/
│   │   ├── sorting/
│   │   │   ├── bubbleSort.js    # Bubble sort event generator
│   │   │   ├── selectionSort.js # Selection sort event generator
│   │   │   ├── insertionSort.js # Insertion sort event generator
│   │   │   ├── mergeSort.js     # Merge sort event generator
│   │   │   └── quickSort.js     # Quick sort event generator
│   │   └── searching/
│   │       ├── linearSearch.js  # Linear search event generator
│   │       └── binarySearch.js  # Binary search event generator
│   ├── visualizer/
│   │   ├── renderer.js          # DOM updater for bars, cells, pointers, code
│   │   ├── stepEngine.js        # Deterministic step cursor and snapshot manager
│   │   ├── animationController.js # Timer coordination and race-condition prevention
│   │   └── controls.js          # UI button bindings and keyboard shortcuts
│   └── utils/
│       ├── validation.js        # Array string parsing, bounds & CRUD checking
│       ├── arrayUtils.js        # Dataset generators and sorted checker
│       └── storage.js           # Safe localStorage persistence & CRUD layer
└── tests/
    ├── manual-test-checklist.md # Structured verification protocol
    ├── test-day1.js             # Bubble sort automated verification
    ├── test-selectionSort.js    # Selection sort automated verification
    ├── test-insertionSort.js    # Insertion sort automated verification
    ├── test-mergeSort.js        # Merge sort automated verification
    ├── test-quickSort.js        # Quick sort automated verification
    └── test-practiceSets.js     # Practice sets CRUD & storage verification
```

---

# CRUD Operations

AlgoSphere implements full **CRUD (Create, Read, Update, Delete)** operations on saved algorithm practice sets, fulfilling the mandatory Web Storage and data management requirement for the Web Fundamentals curriculum.

### Create
Users can create saved practice sets:
- Click **"New Practice Set"** from the Practice Sets workspace or Dashboard hero.
- Enter a unique, human-readable dataset name (e.g., `"My Sorting Test"`, `"Binary Search Edge Cases"`).
- Select a target algorithm from any of the 7 supported sorting or searching algorithms.
- Provide a custom comma-separated integer array (1–25 elements, values 1–100) or choose from quick presets (`5, 3, 8, 1, 2`, `10, 25, 42, 68, 90`, or `Random 7`).
- Form validation verifies name uniqueness, character length, element counts, integer validity, and bounds.
- Upon submission, the practice set is assigned a collision-free unique identifier, stamped with ISO timestamps (`createdAt`, `updatedAt`), persisted to browser storage, and immediately rendered at the top of the dataset grid with feedback.

### Read
Saved practice sets are loaded from `localStorage`:
- When navigating to the Practice Sets workspace (`#/practice`), all saved datasets are read and parsed from client storage.
- Each practice set is presented in a card displaying:
  - Dataset name
  - Target algorithm badge (e.g. `Bubble Sort` or `Binary Search`)
  - Array preview formatted as monospace value chips
  - Total item count and last updated timestamp
  - Direct action triggers: **Visualize**, **Edit**, and **Delete**
- **Search & Filter**: Users can filter practice sets in real-time by dataset name and target algorithm category.
- **Empty State**: When no practice sets exist, a polished empty state banner explains the feature and provides an immediate creation button.
- **Corruption Resilience**: If storage data is missing or corrupted, the system catches the syntax error gracefully and recovers with an empty state rather than crashing.

### Update
Users can edit saved practice sets:
- Clicking the **"Edit"** button on any practice set opens the modal dialog preloaded with existing values (name, algorithm, array).
- Validation executes upon submission to ensure updated data remains strictly compliant.
- The update operation modifies **only** the selected practice set in `localStorage`:
  - The record's unique `id` and initial `createdAt` timestamp are strictly preserved.
  - The `updatedAt` timestamp is updated to the current time.
  - Unrelated practice sets are completely unmutated.
- The UI refreshes immediately without requiring a full page reload.

### Delete
Users can remove saved practice sets:
- Clicking the **"Delete"** button on any card opens a confirmation dialog clearly naming the targeted dataset to prevent accidental deletion.
- Upon confirmation, only that specific record is removed from `localStorage`.
- Immediate UI synchronization updates the grid and displays a confirmation toast.
- Deleting the last remaining practice set returns the view to the empty state cleanly.

---

### Web Storage

AlgoSphere uses browser **`localStorage`** because the application is built intentionally as a frontend-only, client-side web application. It does not require a backend server, database (such as MongoDB or Firebase), or external API keys.

Using native Web Storage ensures:
- **Zero latency**: Data operations execute synchronously on the client.
- **Offline availability**: The studio operates completely offline without internet connectivity.
- **Data hygiene**: No passwords, API keys, or sensitive personal data are ever stored.

**Primary LocalStorage Key**:
```
algosphere_practice_sets
```

All practice set records are serialized and parsed using centralized, fault-tolerant utilities in [js/utils/storage.js](file:///c:/Users/pc/Desktop/Frontend%20Project/js/utils/storage.js).

---

### Visualize Integration
The **"Visualize"** button bridges Practice Sets with AlgoSphere's visualizer studios:
- Clicking **Visualize** inspects the dataset's selected algorithm.
- If the algorithm is a sorting algorithm (Bubble, Selection, Insertion, Merge, Quick Sort), AlgoSphere routes to `#/sorting` with the selected algorithm and practice array loaded into the bar visualizer.
- If the algorithm is a searching algorithm (Linear or Binary Search), AlgoSphere routes to `#/searching` with the algorithm, custom array, and search target loaded into the pointer visualizer.
- The step engine immediately builds deterministic execution steps, allowing learners to click Play or step forwards/backwards instantly.

---

## ⚙️ How to Run the Project

Because AlgoSphere uses native JavaScript ES Modules (`type="module"`), modern browsers require it to be served over HTTP/HTTPS rather than `file:///` (due to browser CORS rules on local modules).

### Option 1: Python HTTP Server (Recommended)
```bash
# In the project directory:
python -m http.server 8000
```
Then open: [http://localhost:8000](http://localhost:8000)

### Option 2: Node npx serve
```bash
npx -y serve .
```

### Option 3: VS Code / IDE Live Server
Right-click `index.html` and select **"Open with Live Server"**.

---

## 🏛️ Architecture Overview

```
 [ User Action: Play / Step / Input ]
                 │
                 ▼
     ┌──────────────────────┐
     │   Algorithm Logic    │  Pure functions, zero DOM dependencies.
     │  (e.g. bubbleSort)   │  Takes array, returns immutable Step[] array.
     └───────────┬──────────┘
                 │ Step[]
                 ▼
     ┌──────────────────────┐
     │     Step Engine      │  Maintains currentIndex.
     │   (Immutable State)  │  Enables O(1) instant back/forward jumping.
     └───────────┬──────────┘
                 │ currentStep
                 ├───────────────────────────────┐
                 ▼                               ▼
     ┌──────────────────────┐        ┌──────────────────────┐
     │ Animation Controller │        │ Visualizer Renderer  │
     │  (Generation-token   │        │  - Scaled Bars/Cells │
     │   timer management)  │        │  - Pointers          │
     └──────────────────────┘        │  - Pseudocode Line   │
                                     │  - Telemetry Counter │
                                     └──────────────────────┘
```

### Snapshot-Based Step Model
Traditional algorithm visualizers often use async `await sleep()` loops inside the sorting algorithm itself, causing hard-to-fix bugs with pause/resume and making "Previous Step" virtually impossible.

AlgoSphere uses an **event-and-snapshot engine**:
1. Algorithms execute synchronously to produce a lightweight array of step objects.
2. Each step contains a complete snapshot of the array at that moment, the indices being compared/swapped, the active line number in pseudocode, and a human-readable explanation.
3. Stepping backwards or scrubbing to any arbitrary step is simply index movement: `arr = steps[i].array`. It is 100% deterministic, instant, and impossible to desynchronize.
4. An incrementing `generation` token ensures that clicking Pause or Reset immediately invalidates any pending timeout callbacks, preventing overlapping timers.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>→</kbd> (Right Arrow) | Next Step |
| <kbd>←</kbd> (Left Arrow) | Previous Step |
| <kbd>R</kbd> | Reset to initial array state |

---

## 🔍 Known Limitations & Edge Cases Handled
- **Mobile Widths**: On screens narrower than 480px, bar numeric labels above the vertical bars are hidden to prevent text collisions, while the index labels underneath remain visible.
- **Binary Search on Unsorted Data**: Binary search strictly requires sorted input. AlgoSphere actively tests whether the input array is sorted and displays a prominent warning banner with an immediate 1-click `[Sort Array Now]` helper button.
- **Array Bounds**: User array input is validated to ensure between 5 and 25 numbers within the range $[1, 100]$. Floating-point values are safely rounded and malformed input displays clear feedback.

---

## 🔮 Future Improvements
1. **Additional Data Structures**: Trees (Binary Search Tree traversals) and Graphs (BFS / DFS / Dijkstra).
2. **Audio Frequency Synthesizer**: Web Audio API tone synthesis pitched to element values during sorting passes.
3. **Algorithm Comparison Dual-View**: Running two sorting algorithms side-by-side with identical inputs to compare operation counts.
