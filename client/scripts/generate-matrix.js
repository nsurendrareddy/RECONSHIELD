const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outputPath = path.join(__dirname, '..', 'public', 'matrix-bg.png');

// Ensure public directory exists
const publicDir = path.dirname(outputPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create a transparent 64x64 PNG image
sharp({
  create: {
    width: 64,
    height: 64,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  }
})
.png()
.toFile(outputPath)
.then(() => {
  console.log(`Success: Generated transparent PNG at ${outputPath}`);
})
.catch(err => {
  console.error('Error generating image:', err);
  process.exit(1);
});
