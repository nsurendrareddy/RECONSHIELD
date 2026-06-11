const { spawn } = require('child_process');
const http = require('http');

const PORT = 3095;
const BASE_URL = `http://localhost:${PORT}`;
const MAX_CONCURRENT_REQUESTS = 5;

// Pages that might have dynamic components or rely on external APIs that are not active during build
const IGNORED_PATHS = [
  '/api/revalidate',
  '/feed.xml',
  '/rss.xml',
  '/whois-lookup',
  '/dns-lookup',
  '/reverse-dns',
  '/ssl-checker',
  '/asn-lookup'
];

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to poll local server status
async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise((resolve, reject) => {
        const req = http.get(url, (res) => {
          if (res.statusCode === 200) resolve();
          else reject(new Error(`Status: ${res.statusCode}`));
        });
        req.on('error', reject);
        req.end();
      });
      console.log('Server is ready and responding!');
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

// Extracts URLs from XML sitemap format
function extractUrlsFromSitemap(xml) {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/gi)];
  return matches.map(m => m[1].trim());
}

// Extracts internal links from HTML body
function extractInternalLinks(html) {
  const links = [];
  const hrefMatches = [...html.matchAll(/href=["'](\/[^"']*)["']/gi)];
  for (const match of hrefMatches) {
    const path = match[1];
    // Exclude static assets, external links, anchor targets, ignored paths
    if (
      !path.startsWith('/_next') &&
      !path.startsWith('/static') &&
      !path.includes('#') &&
      !path.includes('.') &&
      !IGNORED_PATHS.some(ignored => path.startsWith(ignored))
    ) {
      links.push(path);
    }
  }
  return [...new Set(links)];
}

async function run() {
  console.log(`Starting production Next.js server on port ${PORT}...`);
  const serverProcess = spawn('npx', ['next', 'start', '-p', PORT.toString()], {
    shell: true,
    cwd: process.cwd(),
    stdio: 'inherit'
  });

  let hasErrors = false;
  
  try {
    // Wait for Next.js to start
    await waitForServer(BASE_URL);

    const visited = new Set();
    const toVisit = ['/'];
    const brokenLinks = [];
    const sitemapUrls = new Set();

    // 1. Fetch Sitemap Index
    console.log('Fetching sitemap.xml...');
    const sitemapIndexRes = await fetchUrl(`${BASE_URL}/sitemap.xml`);
    if (sitemapIndexRes.status !== 200) {
      throw new Error(`Sitemap index returned status code ${sitemapIndexRes.status}`);
    }

    const subSitemaps = extractUrlsFromSitemap(sitemapIndexRes.body);
    console.log(`Discovered ${subSitemaps.length} sub-sitemaps.`);

    // 2. Fetch all URLs from sub-sitemaps
    for (const subSitemapUrl of subSitemaps) {
      const localSubSitemapUrl = subSitemapUrl.replace('https://rreconshield.in', BASE_URL).replace('https://reconshield.in', BASE_URL);
      console.log(`Processing sub-sitemap: ${localSubSitemapUrl}`);
      try {
        const subSitemapRes = await fetchUrl(localSubSitemapUrl);
        if (subSitemapRes.status === 200) {
          const urls = extractUrlsFromSitemap(subSitemapRes.body);
          urls.forEach(u => sitemapUrls.add(u));
        } else {
          console.error(`Sitemap chunk ${localSubSitemapUrl} returned non-200 status: ${subSitemapRes.status}`);
          hasErrors = true;
        }
      } catch (err) {
        console.error(`Failed to process sub-sitemap ${localSubSitemapUrl}:`, err.message);
        hasErrors = true;
      }
    }

    console.log(`Discovered ${sitemapUrls.size} unique sitemap URLs to validate.`);

    // 3. Validate all sitemap URLs
    const sitemapUrlList = Array.from(sitemapUrls);
    for (let i = 0; i < sitemapUrlList.length; i++) {
      const externalUrl = sitemapUrlList[i];
      const localUrl = externalUrl.replace('https://rreconshield.in', BASE_URL).replace('https://reconshield.in', BASE_URL);
      const pathname = new URL(localUrl).pathname;
      
      if (IGNORED_PATHS.some(ignored => pathname.startsWith(ignored))) {
        console.log(`[Sitemap Check] Skipping ignored path: ${pathname}`);
        continue;
      }
      
      console.log(`[Sitemap Check] Validating: ${pathname}`);
      try {
        const res = await fetchUrl(localUrl);
        if (res.status !== 200) {
          const redirectLocation = res.headers['location'] ? ` -> ${res.headers['location']}` : '';
          console.error(`❌ Sitemap URL ${pathname} returned non-200 status: ${res.status}${redirectLocation}`);
          brokenLinks.push({ url: pathname, source: 'Sitemap', status: res.status + redirectLocation });
          hasErrors = true;
        }
      } catch (err) {
        console.error(`❌ Sitemap URL ${pathname} failed to fetch:`, err.message);
        brokenLinks.push({ url: pathname, source: 'Sitemap', error: err.message });
        hasErrors = true;
      }
    }

    // 4. Crawl HTML pages recursively
    console.log('Crawling internal links starting from homepage...');
    const referrers = new Map();
    
    while (toVisit.length > 0) {
      const path = toVisit.shift();
      if (visited.has(path)) continue;
      visited.add(path);

      console.log(`[Link Check] Crawling: ${path}`);
      try {
        const res = await fetchUrl(`${BASE_URL}${path}`);
        if (res.status !== 200) {
          const redirectLocation = res.headers['location'] ? ` -> ${res.headers['location']}` : '';
          console.error(`❌ Broken link detected: ${path} returned status ${res.status}${redirectLocation}`);
          brokenLinks.push({ url: path, source: 'Crawl', status: res.status + redirectLocation });
          hasErrors = true;
        } else if (res.headers['content-type']?.includes('text/html')) {
          const newLinks = extractInternalLinks(res.body);
          for (const link of newLinks) {
            if (!referrers.has(link)) {
              referrers.set(link, new Set());
            }
            referrers.get(link).add(path);

            if (!visited.has(link) && !toVisit.includes(link)) {
              toVisit.push(link);
            }
          }
        }
      } catch (err) {
        console.error(`❌ Failed to crawl page ${path}:`, err.message);
        brokenLinks.push({ url: path, source: 'Crawl', error: err.message });
        hasErrors = true;
      }
    }

    console.log('--- CRAWL AND SITEMAP VALIDATION COMPLETE ---');
    console.log(`Total Pages Visited: ${visited.size}`);
    console.log(`Total Sitemap URLs Validated: ${sitemapUrls.size}`);
    console.log(`Broken Links / Issues Found: ${brokenLinks.length}`);

    if (brokenLinks.length > 0) {
      console.error('\nList of broken URLs:');
      brokenLinks.forEach(b => {
        const refs = referrers.has(b.url) ? Array.from(referrers.get(b.url)).join(', ') : 'unknown';
        console.error(`- ${b.url} (${b.source}) -> ${b.status || b.error} (Linked from: ${refs})`);
      });
      hasErrors = true;
    }

  } catch (error) {
    console.error('Validation failure:', error);
    hasErrors = true;
  } finally {
    console.log('Shutting down local production server...');
    serverProcess.kill('SIGINT');
    await sleep(2000); // Allow server to release port
  }

  if (hasErrors) {
    console.error('Build verification FAILED due to broken links/sitemap entries.');
    process.exit(1);
  } else {
    console.log('Build verification PASSED successfully!');
    process.exit(0);
  }
}

run();
