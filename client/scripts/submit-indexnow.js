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
const SITEMAP_INDEX = `https://${HOST}/sitemap.xml`;

async function submitToIndexNow(urls, batchIndex, totalBatches) {
  if (!urls || urls.length === 0) return true;
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
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
        return true;
      } else {
        console.error(`[IndexNow] Batch ${batchIndex}/${totalBatches} failed (Attempt ${attempt + 1}/${MAX_RETRIES}). Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`[IndexNow] Network error on Batch ${batchIndex}/${totalBatches} (Attempt ${attempt + 1}/${MAX_RETRIES}):`, error.message);
    }
    
    attempt++;
    if (attempt < MAX_RETRIES) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  console.error(`[IndexNow] Failed to submit Batch ${batchIndex}/${totalBatches} after ${MAX_RETRIES} attempts. URLs failed:`, urls);
  return false;
}

async function fetchSitemap(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`Failed to fetch sitemap ${url}: ${response.status} ${response.statusText}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn(`Network error fetching sitemap ${url}: ${error.message}`);
    return null;
  }
}

function extractLocs(xml) {
  const locs = [];
  // Use a global regex to find all <loc> contents
  const matches = xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi);
  for (const match of matches) {
    let locUrl = match[1].trim();
    // Sometimes URLs contain CDATA or escaped entities, clean if necessary
    // Simple decoding
    locUrl = locUrl.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    locs.push(locUrl);
  }
  return locs;
}

async function processSitemaps(url = SITEMAP_INDEX, sitemapFilesFound = new Set(), allUrls = new Set()) {
  if (sitemapFilesFound.has(url)) return { sitemapFilesFound, allUrls: Array.from(allUrls) };
  
  sitemapFilesFound.add(url);
  const xml = await fetchSitemap(url);
  
  if (!xml) {
    return { sitemapFilesFound, allUrls: Array.from(allUrls) };
  }

  const isSitemapIndex = /<sitemapindex/i.test(xml);
  const locs = extractLocs(xml);
  
  if (isSitemapIndex) {
    for (const childUrl of locs) {
      await processSitemaps(childUrl, sitemapFilesFound, allUrls);
    }
  } else {
    locs.forEach(loc => allUrls.add(loc));
  }

  return { sitemapFilesFound, allUrls: Array.from(allUrls) };
}

async function main() {
  const { sitemapFilesFound, allUrls } = await processSitemaps();
  
  console.log(`Found ${sitemapFilesFound.size} sitemap files`);
  console.log(`Found ${allUrls.length} URLs`);
  
  if (allUrls.length > 0) {
    const chunkSize = 100;
    const totalBatches = Math.ceil(allUrls.length / chunkSize);
    let successCount = 0;
    
    for (let i = 0; i < allUrls.length; i += chunkSize) {
      const batchIndex = Math.floor(i / chunkSize) + 1;
      const chunk = allUrls.slice(i, i + chunkSize);
      
      console.log(`Submitting batch ${batchIndex}/${totalBatches}`);
      const success = await submitToIndexNow(chunk, batchIndex, totalBatches);
      
      if (success) {
        successCount += chunk.length;
      }
      
      // Delay between batches to avoid rate limiting
      if (batchIndex < totalBatches) {
        await new Promise(r => setTimeout(r, 500));
      }
    }
    
    console.log(`Submitted ${successCount} URLs`);
  }
  
  console.log("IndexNow submission complete");
}

main();
