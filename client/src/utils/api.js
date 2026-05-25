export const BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '')
console.log(`>>> API INITIALIZED: BASE_URL='${BASE_URL}'`);
export const API_BASE = `${BASE_URL}/api`

export async function startScan(domain, consent) {
  let res;
  try {
    res = await fetch(`${API_BASE}/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain, consent }),
    });
  } catch (err) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Server unreachable. The backend may be waking up from sleep (takes ~50s) or your ad-blocker is blocking it. Please wait and retry.');
    }
    throw err;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    let errorMessage = 'Scan failed';
    if (Array.isArray(err.detail)) {
      errorMessage = err.detail[0].msg || JSON.stringify(err.detail);
    } else if (err.detail) {
      errorMessage = err.detail;
    } else if (err.error) {
      errorMessage = err.error;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function getScan(id) {
  const res = await fetch(`${API_BASE}/scan/${id}`)
  if (!res.ok) throw new Error('Failed to fetch scan')
  return res.json()
}

export async function getScanStatus(id) {
  const res = await fetch(`${API_BASE}/scan/${id}/status`)
  if (!res.ok) throw new Error('Failed to fetch status')
  return res.json()
}

export async function getHistory(limit = 50, offset = 0) {
  const res = await fetch(`${API_BASE}/history?limit=${limit}&offset=${offset}`)
  if (!res.ok) throw new Error('Failed to fetch history')
  return res.json()
}

export async function deleteScan(id) {
  const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete scan')
  return res.json()
}

export function getExportUrl(id, format) {
  return `${API_BASE}/export/${id}/${format}`
}

export async function downloadExport(id, format, token) {
  const res = await fetch(getExportUrl(id, format), {
    headers: { 'Authorization': `Bearer ${token}` }
  })
  if (!res.ok) throw new Error('Failed to download file')
  
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  
  // Extract filename from Content-Disposition header if available
  const disposition = res.headers.get('Content-Disposition')
  let filename = `reconshield_export_${id}.${format}`
  if (disposition && disposition.includes('filename=')) {
    const match = disposition.match(/filename="?([^"]+)"?/)
    if (match && match[1]) filename = match[1]
  }
  
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

export async function scanDiff(scanIdA, scanIdB) {
  const res = await fetch(`${API_BASE}/scan/${scanIdA}/diff/${scanIdB}`)
  if (!res.ok) throw new Error('Failed to compare scans')
  return res.json()
}

export async function askAboutScan(scanId, question) {
  const res = await fetch(`${API_BASE}/scan/${scanId}/ask?q=${encodeURIComponent(question)}`)
  if (!res.ok) throw new Error('Failed to get answer')
  return res.json()
}

export async function watchDomain(domain, token) {
  const res = await fetch(`${API_BASE}/monitor/watch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ domain }),
  })
  if (!res.ok) throw new Error('Failed to watch domain')
  return res.json()
}

export async function getWatchedDomains(token) {
  const res = await fetch(`${API_BASE}/monitor/watched`, {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Failed to fetch watched domains')
  return res.json()
}

export async function scanIp(target) {
  let res;
  try {
    res = await fetch(`${API_BASE}/ip-scanner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ target }),
    });
  } catch (err) {
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error('Server unreachable. The backend may be waking up from sleep (takes ~50s). Please wait and retry.');
    }
    throw err;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    let errorMessage = 'IP scan failed';
    if (Array.isArray(err.detail)) {
      errorMessage = err.detail[0].msg || JSON.stringify(err.detail);
    } else if (err.detail) {
      errorMessage = err.detail;
    } else if (err.error) {
      errorMessage = err.error;
    }
    throw new Error(errorMessage);
  }
  return res.json();
}
