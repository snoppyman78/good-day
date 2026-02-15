const API_URL = 'https://www.githubstatus.com/api/v2/summary.json';

const summaryStatusEl = document.getElementById('summaryStatus');
const summaryDescriptionEl = document.getElementById('summaryDescription');
const componentsGrid = document.getElementById('componentsGrid');
const updatedAtEl = document.getElementById('updatedAt');
const refreshBtn = document.getElementById('refreshBtn');

function statusToClass(status) {
  return String(status || '').toLowerCase().replace(/\s+/g, '_');
}

function formatTime(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleString();
}

function renderComponents(components = []) {
  componentsGrid.innerHTML = '';

  components
    .filter(c => c.name && c.status)
    .slice(0, 12)
    .forEach(component => {
      const statusClass = statusToClass(component.status);
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h4>${component.name}</h4>
        <span class="badge ${statusClass}">${component.status.replace('_', ' ')}</span>
        <p><small>Updated: ${formatTime(component.updated_at)}</small></p>
      `;
      componentsGrid.appendChild(card);
    });
}

async function loadStatus() {
  summaryStatusEl.textContent = 'Loading...';
  summaryDescriptionEl.textContent = 'Fetching latest status';

  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    summaryStatusEl.textContent = data.status?.indicator?.replace('_', ' ') || 'Unknown';
    summaryDescriptionEl.textContent = data.status?.description || 'No description available';
    renderComponents(data.components || []);
    updatedAtEl.textContent = `Last updated: ${formatTime(new Date().toISOString())}`;
  } catch (err) {
    summaryStatusEl.textContent = 'Error';
    summaryDescriptionEl.textContent = `Could not load GitHub status (${err.message})`;
    componentsGrid.innerHTML = '<p>Try again in a moment.</p>';
  }
}

refreshBtn.addEventListener('click', loadStatus);
loadStatus();
