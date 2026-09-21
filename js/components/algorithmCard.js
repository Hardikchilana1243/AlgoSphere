/**
 * AlgoSphere - Algorithm Card Component
 * Reusable card rendering algorithm metrics, complexity badges, and visualizer launch buttons.
 */

export function createAlgorithmCard(algo) {
  const isSorting = algo.category === 'sorting';
  const targetRoute = isSorting ? `#sorting?algo=${algo.id}` : `#searching?algo=${algo.id}`;

  return `
    <article class="panel algorithm-card" data-algo-id="${algo.id}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
      <div class="panel-header" style="background: rgba(255, 255, 255, 0.015);">
        <div>
          <h3 style="font-size: var(--text-md); font-weight: 700; color: var(--text);">${algo.name}</h3>
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--primary-hover); font-weight: 600;">
            ${isSorting ? 'Sorting Algorithm' : 'Searching Algorithm'}
          </span>
        </div>
        <span class="badge ${isSorting ? 'badge-primary' : 'badge-secondary'} badge-mono">
          ${algo.complexities.worst}
        </span>
      </div>

      <div class="panel-body" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between; gap: var(--space-4);">
        <p style="font-size: var(--text-sm); color: var(--muted); line-height: 1.5;">
          ${algo.shortSummary}
        </p>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); background: rgba(0, 0, 0, 0.2); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div>
              <span style="font-size: 10px; text-transform: uppercase; color: var(--muted-dark); display: block;">Avg Time</span>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--text);">${algo.complexities.average}</span>
            </div>
            <div>
              <span style="font-size: 10px; text-transform: uppercase; color: var(--muted-dark); display: block;">Space</span>
              <span style="font-family: var(--font-mono); font-size: 12px; font-weight: 600; color: var(--text);">${algo.complexities.space}</span>
            </div>
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            ${algo.tags.map(t => `<span class="badge badge-muted">${t}</span>`).join('')}
          </div>
        </div>

        <div style="margin-top: var(--space-2); border-top: 1px solid var(--border-subtle); padding-top: var(--space-3);">
          <a href="${targetRoute}" class="btn btn-secondary btn-sm" style="width: 100%; justify-content: center;" id="card-btn-${algo.id}">
            <span>Launch Visualizer</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </article>
  `;
}
