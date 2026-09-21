/**
 * AlgoSphere - Dashboard Page Controller
 * Hero banner, metric cards, filterable algorithm catalog, and beginner getting-started guide.
 */

import { ALGORITHM_METADATA } from '../data/algorithmMetadata.js';
import { createAlgorithmCard } from '../components/algorithmCard.js';
import { Storage } from '../utils/storage.js';

export function renderDashboard(container) {
  const completedList = Storage.getCompletedAlgorithms();
  const allAlgos = Object.values(ALGORITHM_METADATA);
  const completedCount = completedList.length;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <!-- Hero Section -->
      <section class="panel-elevated" style="padding: var(--space-8); border-radius: var(--radius-xl); background: radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.12), transparent 70%), var(--panel-elevated); border: 1px solid var(--border);">
        <div style="max-width: 800px; display: flex; flex-direction: column; gap: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <span class="badge badge-primary">AlgoSphere Studio</span>
            <span style="font-size: var(--text-xs); color: var(--muted); font-family: var(--font-mono);">SDE Placement Project</span>
          </div>

          <h1 class="hero-title" style="font-size: var(--text-3xl); font-weight: 700; color: #FFFFFF; line-height: 1.2; letter-spacing: -0.02em;">
            Understand algorithms, <span style="color: var(--primary-hover);">one step at a time</span>
          </h1>

          <p style="font-size: var(--text-md); color: var(--text-secondary); line-height: 1.6;">
            Explore algorithms beyond the code. AlgoSphere is an interactive algorithm-learning studio designed for computer science students and SDE interview candidates to visually grasp sorting mechanisms, divide-and-conquer boundaries, and asymptotic complexities.
          </p>

          <div style="display: flex; align-items: center; gap: var(--space-4); margin-top: var(--space-2); flex-wrap: wrap;">
            <a href="#sorting" class="btn btn-primary btn-lg" id="hero-start-btn">
              <span>Start Visualizing</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <a href="#learn" class="btn btn-secondary btn-lg" id="hero-learn-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              <span>Explore Big-O & Guides</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Key Metrics Strip -->
      <section class="stat-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-4);">
        <div class="stat-card">
          <span class="stat-label">Supported Algorithms</span>
          <span class="stat-value" style="color: var(--primary-hover);">7 Core</span>
          <span style="font-size: 11px; color: var(--muted);">5 Sorting + 2 Searching</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Step Execution</span>
          <span class="stat-value" style="color: var(--secondary);">100% Deterministic</span>
          <span style="font-size: 11px; color: var(--muted);">Instant forward & back stepping</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Code Synchronization</span>
          <span class="stat-value" style="color: var(--warning);">Line-by-Line</span>
          <span style="font-size: 11px; color: var(--muted);">Real-time pseudocode lighting</span>
        </div>

        <div class="stat-card">
          <span class="stat-label">Studio Progress</span>
          <span class="stat-value" style="color: var(--success);">${completedCount} / 7 Explored</span>
          <span style="font-size: 11px; color: var(--muted);">Saved in local browser state</span>
        </div>
      </section>

      <!-- Getting Started Walkthrough -->
      <section class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">How to Use AlgoSphere</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">Three intuitive steps to build algorithmic intuition before your technical interviews.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: var(--space-4);">
          <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--primary); margin-bottom: var(--space-2);">01 / Select & Customise</div>
            <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text); margin-bottom: var(--space-1);">Choose Your Dataset</h3>
            <p style="font-size: var(--text-xs); color: var(--muted); line-height: 1.5;">Pick an algorithm, generate random numbers, or type your own edge-case input array.</p>
          </div>

          <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--secondary); margin-bottom: var(--space-2);">02 / Step & Inspect</div>
            <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text); margin-bottom: var(--space-1);">Inspect Every Comparison</h3>
            <p style="font-size: var(--text-xs); color: var(--muted); line-height: 1.5;">Use Play, Pause, or Step Forwards/Backwards to watch swaps and pointers change in real-time.</p>
          </div>

          <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 700; color: var(--success); margin-bottom: var(--space-2);">03 / Connect to Theory</div>
            <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--text); margin-bottom: var(--space-1);">Master Pseudocode & Big-O</h3>
            <p style="font-size: var(--text-xs); color: var(--muted); line-height: 1.5;">Watch pseudocode execute line by line while counters verify the theoretical time complexities.</p>
          </div>
        </div>
      </section>

      <!-- Algorithm Catalog Grid with Category Filter -->
      <section>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3);">
          <div>
            <h2 style="font-size: var(--text-xl); font-weight: 700; color: var(--text);">Algorithm Catalog</h2>
            <p style="font-size: var(--text-sm); color: var(--muted);">Select an algorithm to jump directly into the visual execution studio.</p>
          </div>

          <div class="segmented-control" id="catalog-filter">
            <button class="segment-btn active" data-filter="all">All (7)</button>
            <button class="segment-btn" data-filter="sorting">Sorting (5)</button>
            <button class="segment-btn" data-filter="searching">Searching (2)</button>
          </div>
        </div>

        <div id="algorithm-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-5);">
          ${allAlgos.map(algo => createAlgorithmCard(algo)).join('')}
        </div>
      </section>
    </div>
  `;

  // Bind filter tabs
  const filterContainer = container.querySelector('#catalog-filter');
  const cardsGrid = container.querySelector('#algorithm-cards-grid');

  if (filterContainer && cardsGrid) {
    const filterButtons = filterContainer.querySelectorAll('.segment-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        const filtered = filter === 'all' 
          ? allAlgos 
          : allAlgos.filter(a => a.category === filter);

        cardsGrid.innerHTML = filtered.map(algo => createAlgorithmCard(algo)).join('');
      });
    });
  }
}
