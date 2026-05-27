const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We found the keyword property like:
      // keywords: ["cybersecurity", "vulnerability scanner", "IP intelligence", "threat detection", "SSL checker", "DNS lookup"],
      // keywords: [`${domain} ssl`, ...],
      
      // Match keywords property accurately
      const newContent = content.replace(/\s*keywords:\s*\[[\s\S]*?\],?/g, '');
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log('Removed keywords from:', fullPath);
      }
    }
  }
}

processDir(path.join(__dirname, 'src', 'app'));
console.log('Done');
