const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const forbiddenTerms = [
  "passive reconnaissance engine",
  "attack surface",
  "adversaries strike",
  "stealthily",
  "exploit",
  "precision recon",
  "deep packet inspection",
  "ethical hacker",
  "reconnaissance platform",
  "penetration attack",
  "intrusion mapping",
  "target enumeration",
  "offensive",
  "scan any website instantly",
  "adversary",
  "attackers rely on",
  "attack vectors"
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let found = false;
      for (const term of forbiddenTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(content)) {
          console.log(`Found "${term}" in ${fullPath}`);
          found = true;
        }
      }
    }
  }
}

processDirectory(srcDir);
console.log('Search complete.');
