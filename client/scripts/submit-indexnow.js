import fs from 'fs';
import path from 'path';

// Define __dirname for ES modules
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const HOST = 'reconshield.in';
const KEY = 'a2c327dc26b44456abd5baa2b5786ce4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const MAX_RETRIES = 3;

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) return;
  
  const urlList = Array.isArray(urls) ? urls : [urls];
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urlList
  };

  let attempt = 0;
  
  while (attempt < MAX_RETRIES) {
    try {
      const response = await fetch(INDEXNOW_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log(`[IndexNow] Successfully submitted ${urlList.length} URLs (Status: ${response.status})`);
        return true;
      } else {
        console.error(`[IndexNow] Submission failed (Attempt ${attempt + 1}/${MAX_RETRIES}). Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`[IndexNow] Network error (Attempt ${attempt + 1}/${MAX_RETRIES}):`, error.message);
    }
    
    attempt++;
    if (attempt < MAX_RETRIES) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  console.error(`[IndexNow] Failed to submit URLs after ${MAX_RETRIES} attempts.`);
  return false;
}

// Function to parse the sitemap and get all URLs
async function parseSitemap() {
  const BASE_URL = 'https://reconshield.in';
  let urls = [BASE_URL, `${BASE_URL}/contact`, `${BASE_URL}/terms`];

  try {
    // We can import the logic from sitemaps/[type]/route.js or just fetch the live one
    console.log("Fetching live sitemaps...");
    
    const types = ['tools', 'blog', 'learning', 'pages'];
    for (const type of types) {
      try {
        const response = await fetch(`${BASE_URL}/sitemaps/${type}/sitemap.xml`);
        if (response.ok) {
            const xml = await response.text();
            // simple regex extraction
            const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
            for (const match of matches) {
                urls.push(match[1]);
            }
        }
      } catch (err) {
          console.warn(`Failed to fetch sitemap for ${type}: ${err.message}`);
      }
    }
    
    // Deduplicate
    urls = [...new Set(urls)];
    
    console.log(`Found ${urls.length} unique URLs in sitemaps.`);
    return urls;
    
  } catch (error) {
    console.error("Error parsing sitemap:", error);
    return [];
  }
}

async function main() {
  console.log("Starting IndexNow batch submission...");
  const urls = await parseSitemap();
  
  if (urls.length > 0) {
    // Submit in chunks of 50 to avoid overloading the API
    const chunkSize = 50;
    for (let i = 0; i < urls.length; i += chunkSize) {
      const chunk = urls.slice(i, i + chunkSize);
      console.log(`Submitting chunk ${Math.floor(i/chunkSize) + 1} of ${Math.ceil(urls.length/chunkSize)}...`);
      await submitToIndexNow(chunk);
      // Small delay between chunks
      await new Promise(r => setTimeout(r, 1000));
    }
    console.log("Batch submission complete.");
  } else {
    console.log("No URLs found to submit.");
  }
}

main();
