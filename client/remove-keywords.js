const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remove lines matching `keywords:` 
      const lines = content.split('\n');
      const filtered = lines.filter(line => !line.trim().startsWith('keywords:'));
      
      if (filtered.length !== lines.length) {
        fs.writeFileSync(fullPath, filtered.join('\n'), 'utf8');
        console.log(`Removed keywords from: ${fullPath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Keywords removal complete.');
