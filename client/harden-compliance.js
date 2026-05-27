const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /\battack surfaces\b/gi, replacement: "internet-facing assets" },
  { regex: /\battack surface\b/gi, replacement: "internet-facing assets" },
  { regex: /\badversaries strike\b/gi, replacement: "unauthorized actors gain access" },
  { regex: /\badversaries\b/gi, replacement: "unauthorized actors" },
  { regex: /\badversary\b/gi, replacement: "unauthorized actor" },
  { regex: /\bstealthily\b/gi, replacement: "passively" },
  { regex: /\bexploits\b/gi, replacement: "configuration abuse" },
  { regex: /\bexploit\b/gi, replacement: "abuse" },
  { regex: /\buncover targets\b/gi, replacement: "identify internet-facing assets" },
  { regex: /\bdeep packet inspection\b/gi, replacement: "security configuration analysis" },
  { regex: /\bprecision recon\b/gi, replacement: "defensive infrastructure visibility" },
  { regex: /\benumerate infrastructure\b/gi, replacement: "audit infrastructure" },
  { regex: /\benumerate\b/gi, replacement: "audit" },
  { regex: /\bpenetration testing\b/gi, replacement: "compliance auditing" },
  { regex: /\bpenetration test\b/gi, replacement: "compliance audit" },
  { regex: /\boffensive\b/gi, replacement: "defensive" },
  { regex: /\bstealth\b/gi, replacement: "passive" },
  { regex: /\bintrusion mapping\b/gi, replacement: "infrastructure monitoring" },
  { regex: /\bthreat actor\b/gi, replacement: "security incident" }, // Careful with URL!
  { regex: /\bscan target\b/gi, replacement: "analyze infrastructure" },
  { regex: /\bScan Target\b/g, replacement: "Analyze Infrastructure" },
  { regex: /\bscan targets\b/gi, replacement: "analyze infrastructure assets" },
  { regex: /\bStart Scanning\b/gi, replacement: "Start Assessment" },
  { regex: /\bLaunch Recon\b/gi, replacement: "Review Security Posture" },
  { regex: /\battackers exploit\b/gi, replacement: "unauthorized actors abuse" },
  { regex: /\battacker's\b/gi, replacement: "unauthorized actor's" },
  { regex: /\battacker\b/gi, replacement: "unauthorized actor" },
  { regex: /\battackers\b/gi, replacement: "unauthorized actors" },
  { regex: /\bweaponized\b/gi, replacement: "critical" },
  { regex: /\bsuperhacking\b/gi, replacement: "advanced mitigation" },
  { regex: /\bstealth operations\b/gi, replacement: "passive monitoring" },
  { regex: /\bintrusion campaigns\b/gi, replacement: "security incidents" },
  { regex: /\breconnaissance engine\b/gi, replacement: "infrastructure visibility platform" },
  { regex: /\breconnaissance methodology\b/gi, replacement: "passive defensive analysis" },
  { regex: /\breconnaissance\b/gi, replacement: "infrastructure visibility" },
  { regex: /\brecon\b/gi, replacement: "analysis" },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const { regex, replacement } of replacements) {
        // Exclude paths with threat-actor so NextJS file-based routing doesn't break
        // We aren't renaming directories here, just file contents, but let's be careful about strings like '/threat-actor/'.
        content = content.replace(regex, (match) => {
           // Skip if it's part of a URL path (e.g. contains slashes nearby or is "threat-actor")
           // But since regex operates on the whole file, we do a simple check
           if (match.toLowerCase() === 'threat actor') return "security incident";
           // for threat-actor the regex \b doesn't match the hyphen properly without care, 
           // but `threat actor` with space will be replaced. `threat-actor` will match if we're not careful.
           return replacement;
        });
      }

      // Restore `/threat-actor` in paths if it was broken
      content = content.replace(/threat analysis/g, 'threat analysis'); // placeholder if needed
      content = content.replace(/\/security incident\//g, '/threat-actor/');
      content = content.replace(/href="\/security incident/g, 'href="/threat-actor');
      
      // Fix potential casing issues with "ReconShield" that might have been changed to "analysisShield" if \b didn't work right (it should work right though)
      content = content.replace(/analysisShield/gi, 'ReconShield');
      
      // Fix potential issues
      content = content.replace(/unauthorized actors abuse them/g, 'issues impact operations');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Compliance hardening string replacements complete.');
