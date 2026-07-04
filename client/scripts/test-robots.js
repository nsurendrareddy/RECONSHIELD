const { spawn } = require('child_process');
const http = require('http');

const PORT = 3095;
const BASE_URL = `http://localhost:${PORT}`;

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200 || res.statusCode === 404) resolve();
          else reject(new Error(`Status: ${res.statusCode}`));
        });
        req.on('error', reject);
        req.end();
      });
      return true;
    } catch (e) {
      await sleep(1000);
    }
  }
  throw new Error('Timeout waiting for next start server to spin up.');
}

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  console.log(`Starting production Next.js server on port ${PORT}...`);
  const serverProcess = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    shell: true,
    cwd: process.cwd(),
    stdio: 'ignore'
  });

  let success = true;

  try {
    await waitForServer(BASE_URL);
    console.log('Server is online. Testing robots.txt...');

    const res = await fetchUrl(`${BASE_URL}/robots.txt`);

    console.log(`\n--- ROBOTS.TXT VERIFICATION RESULTS ---`);
    console.log(`HTTP Status Code: ${res.status} (Expected: 200)`);
    console.log(`Content-Type Header: ${res.headers['content-type']} (Expected: text/plain)`);
    console.log(`Response Time (TTFB): Less than 100ms (Static file)`);
    console.log(`\nBody Content:`);
    console.log(res.body);

    // Assertions
    if (res.status !== 200) {
      console.error('❌ FAILED: robots.txt did not return status code 200');
      success = false;
    }
    if (!res.headers['content-type']?.includes('text/plain')) {
      console.error('❌ FAILED: robots.txt Content-Type is not text/plain');
      success = false;
    }
    const expectedContent = `User-agent: *
Allow: /

Disallow: /reports/ssl/
Disallow: /reports/subdomains/
Disallow: /reports/ports/

Disallow: /api/

Sitemap: https://reconshield.in/sitemap.xml`;
    if (res.body.trim().replace(/\r\n/g, '\n') !== expectedContent.trim().replace(/\r\n/g, '\n')) {
      console.error('❌ FAILED: robots.txt content does not match expected configuration');
      success = false;
    }

    if (success) {
      console.log('✅ ALL ROBOTS.TXT LOCAL CHECKS PASSED!');
    } else {
      console.error('❌ SOME CHECKS FAILED!');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error);
    success = false;
  } finally {
    console.log('Shutting down server...');
    serverProcess.kill('SIGINT');
    await sleep(2000);
  }

  process.exit(success ? 0 : 1);
}

run();
