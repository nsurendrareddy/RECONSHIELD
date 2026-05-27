const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  { regex: /Website Vulnerability Scanner/g, replacement: "Security Exposure Assessment Tool" },
  { regex: /website vulnerability scanner/g, replacement: "security exposure assessment tool" },
  { regex: /Vulnerability Scanner/g, replacement: "Exposure Assessment Tool" },
  { regex: /vulnerability scanner/g, replacement: "exposure assessment tool" },
  { regex: /HTTPS vulnerability scanner/g, replacement: "HTTPS security exposure tool" },
  { regex: /HTTPS Vulnerability Scanner/g, replacement: "HTTPS Security Exposure Tool" },
  { regex: /vulnerability scanners/g, replacement: "automated exposure assessment tools" },
  { regex: /deep-packet inspection/gi, replacement: "security configuration analysis" },
  { regex: /Deep packet inspection/gi, replacement: "Security configuration analysis" },
  { regex: /attackers exploit them/gi, replacement: "issues impact operations" },
  { regex: /built for ethical hackers/gi, replacement: "built for security professionals and IT teams" },
  { regex: /Ethical hackers only/gi, replacement: "Authorized security professionals only" },
  { regex: /ethical hackers/gi, replacement: "authorized security professionals" },
  { regex: /attack vectors/gi, replacement: "configuration risks" },
  { regex: /Attack vectors/gi, replacement: "Configuration risks" },
  { regex: /enumerate targets/gi, replacement: "audit infrastructure" },
  { regex: /offensive scanning/gi, replacement: "defensive analysis" },
  { regex: /penetration attack/gi, replacement: "compliance auditing" },
  { regex: /breach simulation/gi, replacement: "authorized testing" },
  { regex: /intrusion mapping/gi, replacement: "infrastructure visibility" },
  { regex: /aggressive scanning/gi, replacement: "authorized testing" },
  { regex: /target enumeration/gi, replacement: "infrastructure monitoring" },
  { regex: /reconnaissance engine/gi, replacement: "infrastructure visibility engine" },
  { regex: /Reconnaissance Engine/gi, replacement: "Infrastructure Visibility Engine" },
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
console.log('Rebranding complete.');
