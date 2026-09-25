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
- [ ] **Day 2 — Selection & Insertion Sort Visualizers** (Upcoming)
- [ ] **Day 3 — Divide-and-Conquer Sorting (Merge & Quick Sort)** (Upcoming)
- [ ] **Day 4 — Searching Visualizers (Linear & Binary Search)** (Upcoming)
- [ ] **Day 5+ — Practice Sets, CRUD Module & Advanced Features** (Upcoming)

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

### 2. Sorting Visualizer
- **Supported Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.
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
│       ├── validation.js        # Array string parsing and bounds checking
│       ├── arrayUtils.js        # Dataset generators and sorted checker
│       └── storage.js           # Safe localStorage persistence wrapper
└── tests/
    └── manual-test-checklist.md # Structured verification protocol
```

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
