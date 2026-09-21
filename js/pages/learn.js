/**
 * AlgoSphere - Learn Studio Page Controller
 * Educational fundamentals, Big-O reference matrix, glossary, and direct visualizer links.
 */

import { LEARNING_CONTENT } from '../data/learningContent.js';
import { ALGORITHM_METADATA } from '../data/algorithmMetadata.js';

export function renderLearn(container) {
  const { sortingBasics, searchingBasics, bigOReference, glossary } = LEARNING_CONTENT;
  const algos = Object.values(ALGORITHM_METADATA);

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: var(--space-8);">
      <!-- Header -->
      <div>
        <div style="display: flex; align-items: center; gap: var(--space-2);">
          <h1 style="font-size: var(--text-2xl); font-weight: 700; color: var(--text);">Learn Studio</h1>
          <span class="badge badge-primary">CS Placement Guide</span>
        </div>
        <p style="font-size: var(--text-sm); color: var(--muted); margin-top: 4px;">
          Master theoretical foundations, asymptotic efficiency bounds, and interview terminology.
        </p>
      </div>

      <!-- Quick Jump Navigation Pills -->
      <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
        <a href="#section-sorting-theory" class="btn btn-secondary btn-sm">Sorting Theory</a>
        <a href="#section-searching-theory" class="btn btn-secondary btn-sm">Searching Theory</a>
        <a href="#section-big-o" class="btn btn-secondary btn-sm">Big-O Reference</a>
        <a href="#section-glossary" class="btn btn-secondary btn-sm">CS Glossary</a>
        <a href="#section-algo-matrix" class="btn btn-secondary btn-sm">Algorithm Cheat Sheet</a>
      </div>

      <!-- Sorting Fundamentals -->
      <section id="section-sorting-theory" class="panel" style="padding: var(--space-6);">
        <div class="panel-header" style="padding: 0 0 var(--space-4) 0; margin-bottom: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">${sortingBasics.title}</h2>
            <p style="font-size: var(--text-sm); color: var(--muted);">${sortingBasics.summary}</p>
          </div>
          <a href="#sorting" class="btn btn-primary btn-sm">
            <span>Try Sorting Visualizer</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4);">
          ${sortingBasics.keyPoints.map(pt => `
            <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--primary-hover); margin-bottom: var(--space-2);">${pt.title}</h3>
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;">${pt.content}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Searching Fundamentals -->
      <section id="section-searching-theory" class="panel" style="padding: var(--space-6);">
        <div class="panel-header" style="padding: 0 0 var(--space-4) 0; margin-bottom: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">${searchingBasics.title}</h2>
            <p style="font-size: var(--text-sm); color: var(--muted);">${searchingBasics.summary}</p>
          </div>
          <a href="#searching" class="btn btn-secondary btn-sm">
            <span>Try Searching Visualizer</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4);">
          ${searchingBasics.keyPoints.map(pt => `
            <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <h3 style="font-size: var(--text-base); font-weight: 600; color: var(--secondary); margin-bottom: var(--space-2);">${pt.title}</h3>
              <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.5;">${pt.content}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Big-O Reference Table -->
      <section id="section-big-o" class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">${bigOReference.title}</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">${bigOReference.summary}</p>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm); text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border); background: var(--panel-elevated);">
                <th style="padding: 10px 14px; font-weight: 600; color: var(--muted);">Notation</th>
                <th style="padding: 10px 14px; font-weight: 600; color: var(--muted);">Name</th>
                <th style="padding: 10px 14px; font-weight: 600; color: var(--muted);">Efficiency Rating</th>
                <th style="padding: 10px 14px; font-weight: 600; color: var(--muted);">Canonical Example</th>
              </tr>
            </thead>
            <tbody>
              ${bigOReference.notations.map(row => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 12px 14px; font-family: var(--font-mono); font-weight: 700; color: var(--text);">${row.complexity}</td>
                  <td style="padding: 12px 14px; color: var(--text-secondary);">${row.name}</td>
                  <td style="padding: 12px 14px;">
                    <span class="badge ${row.ratingClass}">${row.rating}</span>
                  </td>
                  <td style="padding: 12px 14px; color: var(--muted);">${row.example}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Algorithm Cheat Sheet Matrix -->
      <section id="section-algo-matrix" class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">Comprehensive Algorithm Matrix</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">Direct side-by-side comparison with instant visualizer launching.</p>
        </div>

        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; font-size: var(--text-sm); text-align: left;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border); background: var(--panel-elevated);">
                <th style="padding: 10px 14px; color: var(--muted);">Algorithm</th>
                <th style="padding: 10px 14px; color: var(--muted);">Best Time</th>
                <th style="padding: 10px 14px; color: var(--muted);">Avg Time</th>
                <th style="padding: 10px 14px; color: var(--muted);">Worst Time</th>
                <th style="padding: 10px 14px; color: var(--muted);">Space</th>
                <th style="padding: 10px 14px; color: var(--muted);">Stability</th>
                <th style="padding: 10px 14px; color: var(--muted);">Action</th>
              </tr>
            </thead>
            <tbody>
              ${algos.map(a => {
                const targetUrl = a.category === 'sorting' ? `#sorting?algo=${a.id}` : `#searching?algo=${a.id}`;
                return `
                  <tr style="border-bottom: 1px solid var(--border-subtle);">
                    <td style="padding: 12px 14px; font-weight: 600; color: var(--text);">
                      ${a.name}
                      <span style="display: block; font-size: 11px; font-weight: 400; color: var(--muted-dark); text-transform: uppercase;">${a.category}</span>
                    </td>
                    <td style="padding: 12px 14px; font-family: var(--font-mono); color: var(--success);">${a.complexities.best}</td>
                    <td style="padding: 12px 14px; font-family: var(--font-mono); color: var(--warning);">${a.complexities.average}</td>
                    <td style="padding: 12px 14px; font-family: var(--font-mono); color: var(--danger);">${a.complexities.worst}</td>
                    <td style="padding: 12px 14px; font-family: var(--font-mono); color: var(--secondary);">${a.complexities.space}</td>
                    <td style="padding: 12px 14px; color: var(--text-secondary);">${a.complexities.stability}</td>
                    <td style="padding: 12px 14px;">
                      <a href="${targetUrl}" class="btn btn-outline btn-sm">Try It →</a>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- CS Placement Glossary -->
      <section id="section-glossary" class="panel" style="padding: var(--space-6);">
        <div style="margin-bottom: var(--space-5);">
          <h2 style="font-size: var(--text-lg); font-weight: 700; color: var(--text);">Compact CS Placement Glossary</h2>
          <p style="font-size: var(--text-sm); color: var(--muted);">Essential terminology asked in SDE technical interview rounds.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-4);">
          ${glossary.map(item => `
            <div style="background: var(--panel-elevated); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--border-subtle); display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-2);">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                  <h3 style="font-size: var(--text-base); font-weight: 700; color: var(--text);">${item.term}</h3>
                  <span class="badge badge-primary badge-mono">${item.category}</span>
                </div>
                <p style="font-size: var(--text-xs); color: var(--muted); line-height: 1.5;">${item.definition}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}
