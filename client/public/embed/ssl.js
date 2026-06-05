(function() {
  const container = document.getElementById('reconshield-ssl-widget');
  if (!container) return;

  const style = document.createElement('style');
  style.innerHTML = `
    .rs-widget-card {
      background: #0d1117;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #ffffff;
      max-width: 400px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .rs-widget-title {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #00ff88;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .rs-widget-desc {
      font-size: 11px;
      color: #8b949e;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    .rs-widget-form {
      display: flex;
      gap: 8px;
    }
    .rs-widget-input {
      flex: 1;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 8px 12px;
      color: #ffffff;
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }
    .rs-widget-input:focus {
      border-color: #00ff88;
    }
    .rs-widget-btn {
      background: #00ff88;
      color: #05080f;
      border: none;
      border-radius: 8px;
      padding: 8px 16px;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .rs-widget-btn:hover {
      opacity: 0.9;
    }
    .rs-widget-footer {
      margin-top: 14px;
      font-size: 9px;
      color: #484f58;
      text-align: right;
    }
    .rs-widget-footer a {
      color: #00ff88;
      text-decoration: none;
    }
    .rs-widget-footer a:hover {
      text-decoration: underline;
    }
  `;
  document.head.appendChild(style);

  container.innerHTML = `
    <div class="rs-widget-card">
      <div class="rs-widget-title">
        <span>🛡️ ReconShield SSL Audit</span>
      </div>
      <div class="rs-widget-desc">
        Verify SSL expiration dates, TLS versions, and cipher suites for any web domain.
      </div>
      <form class="rs-widget-form" id="rs-ssl-form">
        <input type="text" class="rs-widget-input" id="rs-ssl-input" placeholder="example.com" required />
        <button type="submit" class="rs-widget-btn">Verify</button>
      </form>
      <div class="rs-widget-footer">
        Powered by <a href="https://reconshield.in/tools/ssl-checker" target="_blank">ReconShield SSL Checker</a>
      </div>
    </div>
  `;

  document.getElementById('rs-ssl-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const domain = document.getElementById('rs-ssl-input').value.trim().toLowerCase();
    if (domain) {
      window.open('https://reconshield.in/reports/ssl/' + encodeURIComponent(domain), '_blank');
    }
  });
})();
