const fs = require('fs');
const path = require('path');

// Configuration
const GALLERY_FOLDER = path.join(__dirname, 'assets', 'images', 'art-page-auto');
const DATA_FILE = path.join(__dirname, 'gallery-data.json');
const BACKUP_FILE = path.join(__dirname, 'gallery-data.backup.json');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

/**
 * Convert folder name to display label
 * Example: 'core-works' -> 'Core Works'
 */
function folderToLabel(folderName) {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all image files from a directory
 */
function getImageFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  return fs.readdirSync(dirPath)
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_EXTENSIONS.includes(ext);
    })
    .map(file => ({
      filename: file,
      fullPath: path.join(dirPath, file)
    }));
}

/**
 * Scan the art-page-auto folder and get all sections and images
 */
function scanGalleryFolder() {
  if (!fs.existsSync(GALLERY_FOLDER)) {
    console.log(`Creating gallery folder: ${GALLERY_FOLDER}`);
    fs.mkdirSync(GALLERY_FOLDER, { recursive: true });
    return { sections: [], images: [] };
  }

  const sections = [];
  const images = [];

  // Read all subdirectories
  const entries = fs.readdirSync(GALLERY_FOLDER, { withFileTypes: true });
  
  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const sectionId = entry.name;
      const sectionLabel = folderToLabel(sectionId);
      const sectionPath = path.join(GALLERY_FOLDER, entry.name);
      
      sections.push({
        id: sectionId,
        label: sectionLabel
      });

      // Get all images in this section
      const imageFiles = getImageFiles(sectionPath);
      imageFiles.forEach(({ filename }) => {
        images.push({
          filename,
          section: sectionId,
          relativePath: `assets/images/art-page-auto/${sectionId}/${filename}`
        });
      });
    }
  });

  return { sections, images };
}

/**
 * Load existing gallery data
 */
function loadGalleryData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { sections: [], artworks: [], archivedArtworks: [] };
  }

  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(content);
    return {
      sections: Array.isArray(parsed.sections) ? parsed.sections : [],
      artworks: Array.isArray(parsed.artworks) ? parsed.artworks : [],
      archivedArtworks: Array.isArray(parsed.archivedArtworks) ? parsed.archivedArtworks : []
    };
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return { sections: [], artworks: [], archivedArtworks: [] };
  }
}

/**
 * Merge scanned data with existing data (preserve user edits)
 */
function mergeGalleryData(existing, scanned) {
  const merged = {
    sections: [...scanned.sections],
    artworks: [],
    archivedArtworks: []
  };

  // Include archived records in matching so metadata can be restored if files return.
  const allExisting = [
    ...(existing.artworks || []),
    ...(existing.archivedArtworks || [])
  ];

  // Path is the primary key for metadata to avoid filename collisions across sections.
  const existingByPath = new Map(
    allExisting
      .filter(art => art && art.path)
      .map(art => [art.path, art])
  );

  // Keep filename fallback so older metadata can still be matched after this update.
  const existingByFilename = new Map(
    allExisting
      .filter(art => art && art.filename)
      .map(art => [art.filename, art])
  );

  // Process each scanned image
  scanned.images.forEach(image => {
    const existingArt = existingByPath.get(image.relativePath) || existingByFilename.get(image.filename);
    
    if (existingArt) {
      // Keep existing data but update section if file moved
      merged.artworks.push({
        ...existingArt,
        section: image.section,
        path: image.relativePath
      });
    } else {
      // New image - add with defaults
      merged.artworks.push({
        filename: image.filename,
        path: image.relativePath,
        title: '',
        displayTitle: true,
        medium: '',
        description: '',
        displayDescription: true,
        section: image.section
      });
    }
  });

  // Keep metadata for missing files in an archive instead of dropping it.
  const scannedPaths = new Set(scanned.images.map(image => image.relativePath));
  const archivedByPath = new Map();
  allExisting.forEach(art => {
    if (!art || !art.path) return;
    if (!scannedPaths.has(art.path)) {
      archivedByPath.set(art.path, art);
    }
  });
  merged.archivedArtworks = Array.from(archivedByPath.values());

  return merged;
}

/**
 * Save gallery data to JSON file
 */
function saveGalleryData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Save a backup snapshot of gallery metadata before overwrite.
 */
function saveGalleryBackup(data) {
  fs.writeFileSync(BACKUP_FILE, JSON.stringify(data, null, 2), 'utf8');
}

/**
 * Main sync function
 */
function syncGallery() {
  console.log('🎨 Scanning art-page-auto folder...\n');
  
  const scanned = scanGalleryFolder();
  console.log(`Found ${scanned.sections.length} sections:`);
  scanned.sections.forEach(section => {
    const count = scanned.images.filter(img => img.section === section.id).length;
    console.log(`  - ${section.label} (${count} images)`);
  });
  console.log(`\nTotal images: ${scanned.images.length}\n`);

  const existing = loadGalleryData();
  saveGalleryBackup(existing);
  const merged = mergeGalleryData(existing, scanned);

  const newImages = merged.artworks.filter(art => !art.title);
  
  saveGalleryData(merged);
  
  console.log('✅ Gallery data synced successfully!');
  console.log(`   - ${merged.sections.length} sections`);
  console.log(`   - ${merged.artworks.length} total artworks`);
  console.log(`   - ${merged.archivedArtworks.length} archived metadata records`);
  if (newImages.length > 0) {
    console.log(`   - ${newImages.length} new artworks need metadata (title, medium, description)`);
  }
  console.log(`\n📄 Updated: ${DATA_FILE}`);
  console.log(`📄 Backup: ${BACKUP_FILE}`);
}

// Run the sync
syncGallery();
