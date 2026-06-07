import fs from 'fs';
import path from 'path';

const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const HOST = 'reconshield.in';
const KEY = 'a2c327dc26b44456abd5baa2b5786ce4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const MAX_RETRIES = 3;

export async function submitToIndexNow(urls) {
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
