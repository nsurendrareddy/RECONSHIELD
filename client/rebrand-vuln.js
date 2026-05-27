const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// Replacements that specifically avoid hyphens/paths
const replacements = [
  { regex: /vulnerability intelligence/gi, replacement: "exposure intelligence" },
  { regex: /vulnerability detection/gi, replacement: "exposure detection" },
  { regex: /vulnerability scanning/gi, replacement: "exposure assessment" },
  { regex: /Vulnerability Scanning/gi, replacement: "Exposure Assessment" },
  { regex: /vulnerability assessment/gi, replacement: "exposure assessment" },
  { regex: /Vulnerability Assessment/gi, replacement: "Exposure Assessment" },
  { regex: /vulnerability exposures/gi, replacement: "configuration exposures" },
  { regex: /Vulnerability Exposure/gi, replacement: "Configuration Exposure" },
  { regex: /vulnerabilities/gi, replacement: "configuration risks" },
  { regex: /Vulnerabilities/gi, replacement: "Configuration Risks" },
  { regex: /vulnerability scanner/gi, replacement: "exposure assessment tool" }, // catch any remaining
  { regex: /Vulnerability Analyzers/gi, replacement: "Exposure Analyzers" },
  { regex: /low-hanging clickjacking vulnerability/gi, replacement: "clickjacking exposure risk" },
  { regex: /exposed vulnerabilities/gi, replacement: "exposed configurations" },
  { regex: /Vulnerability distribution/gi, replacement: "Risk distribution" },
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
        content = content.replace(regex, replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Second pass rebranding complete.');
