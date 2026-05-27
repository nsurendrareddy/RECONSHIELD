const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { createClient } = require('@sanity/client');

const app = express();
app.use(cors());

// Initialize Sanity Client for uploading
const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'etmnx6kx',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN, // Requires write token for uploads
  apiVersion: '2023-05-03',
  useCdn: false
});

const tempDir = path.join(__dirname, 'temp_uploads');
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Multer config for temporary storage before processing
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG and WEBP are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image uploaded or invalid file format.' });
  }

  const baseFilename = path.parse(req.file.filename).name;
  const webpFilename = `${baseFilename}.webp`;

  try {
    // 1. Sharp Preprocessing: Strip EXIF, resize max 1200px, WebP quality 80
    const optimizedBuffer = await sharp(req.file.path)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .withMetadata(false)
      .toBuffer();

    // 2. Upload directly to Sanity CDN
    const asset = await sanityClient.assets.upload('image', optimizedBuffer, {
      filename: webpFilename,
      contentType: 'image/webp'
    });

    // 3. Generate Responsive Sanity CDN URLs
    // Using Sanity's URL builder pattern manually to return the required URLs
    const baseAssetUrl = asset.url;
    
    const urls = {
      thumbnail: `${baseAssetUrl}?w=400&q=80&fm=webp`,
      medium: `${baseAssetUrl}?w=800&q=80&fm=webp`,
      large: `${baseAssetUrl}?w=1200&q=80&fm=webp`,
      original: baseAssetUrl
    };

    // 4. Cleanup temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Error deleting temp file:', err);
    });

    res.json({
      success: true,
      message: 'Image optimized and uploaded to Sanity CDN successfully.',
      assetId: asset._id,
      urls: urls
    });

  } catch (error) {
    console.error('Sanity upload/processing error:', error);
    
    // Cleanup temp file on failure
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ error: 'Failed to process and upload image to Sanity.' });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Sanity Image Upload API running on port ${PORT}`);
});
