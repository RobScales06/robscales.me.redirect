# Dynamic Art Gallery System

An automated system for managing your art portfolio that syncs images from folders to your website automatically.

## 🎨 How It Works

1. **Add images** to subfolders in `assets/images/art-page-auto/`
2. **Run sync** (manually or via GitHub Action)
3. **Edit metadata** in `gallery-data.json`
4. **Deploy** - your art page updates automatically!

## 📁 Folder Structure

```
assets/images/art-page-auto/
├── core-works/          → "Core Works" tab
├── paintings/           → "Paintings" tab
└── figure-portraiture/  → "Figure Portraiture" tab
```

Each subfolder becomes a separate tab/section on your art page. Folder names are automatically converted to display labels (e.g., `core-works` → "Core Works").

## 🚀 Quick Start

### Option 1: GitHub Action (Automatic)

1. Add images to `assets/images/art-page-auto/[category]/` via:
   - GitHub web UI
   - Git commit & push
   - GitHub Desktop

2. The GitHub Action automatically:
   - Detects new images
   - Updates `gallery-data.json`
   - Commits changes back to your repo

3. Edit `gallery-data.json` to add titles, mediums, and descriptions

### Option 2: Manual Sync (Local)

```bash
# Run the sync script
npm run sync-gallery

# Then commit and push
git add .
git commit -m "Add new artworks"
git push
```

## 📝 Editing Metadata

After sync, edit `gallery-data.json` to add details:

```json
{
  "sections": [
    { "id": "core-works", "label": "Core Works" }
  ],
  "artworks": [
    {
      "filename": "my-artwork.jpg",
      "path": "assets/images/art-page-auto/core-works/my-artwork.jpg",
      "title": "Midnight Dreams",
      "displayTitle": true,
      "medium": "Oil on Canvas",
      "description": "An exploration of nocturnal themes",
      "displayDescription": true,
      "section": "core-works"
    }
  ]
}
```

### Visibility Flags

- `displayTitle`: if `false`, caption title/medium are hidden for that artwork
- `displayDescription`: if `false`, the lightbox description is hidden

Both flags default to `true` for newly added artworks.

Recommended workflow:

1. Keep metadata in JSON for long-term organization
2. Use visibility flags to control what appears publicly
3. Avoid filename-based display rules to keep auto-sync simple and predictable

## ✨ Features

- **Auto-detection**: New images are automatically found and added
- **Metadata preservation**: Your titles/descriptions are never overwritten
- **Safe sync backup**: A `gallery-data.backup.json` snapshot is written before each sync
- **Archive retention**: Missing-file metadata is moved to `archivedArtworks` instead of being dropped
- **Flexible organization**: Create any subfolder structure you want
- **GitHub integration**: Works seamlessly with GitHub Pages
- **No database needed**: Everything is file-based and static

## 🖼️ Supported Formats

- `.jpg` / `.jpeg`
- `.png`
- `.gif`
- `.webp`
- `.svg`

## 🔧 Advanced

### Adding New Categories

Just create a new folder in `assets/images/art-page-auto/`:

```bash
mkdir assets/images/art-page-auto/digital-art
# Add images, then sync
npm run sync-gallery
```

### Testing Locally

The sync script can be run anytime:

```bash
node sync-gallery.js
```

### Workflow Triggers

The GitHub Action runs when:
- Files are pushed to `assets/images/art-page-auto/**`
- Manually triggered from the Actions tab

## 📦 Files Created

- `gallery-data.json` - Artwork metadata database
- `gallery-data.backup.json` - Pre-sync backup snapshot of metadata
- `sync-gallery.js` - Folder scanner & JSON updater
- `.github/workflows/sync-gallery.yml` - GitHub Action config
- `package.json` - NPM scripts
- `assets/images/art-page-auto/` - Image storage folder

## 🛡️ Data Safety Notes

- Sync no longer drops metadata for missing files; it moves those records to `archivedArtworks` in `gallery-data.json`.
- If a file returns later (same path or filename), its metadata can be restored by sync matching.
- To permanently remove metadata, delete the record from `archivedArtworks` manually.

## 💡 Tips

- Use descriptive filenames - they become default titles
- Group similar works in the same folder/category
- Keep original, high-quality images
- The sync never deletes entries, only adds new ones
- You can manually edit the JSON anytime

## 🐛 Troubleshooting

**Gallery shows "Loading..." forever**
- Check browser console for errors
- Ensure `gallery-data.json` exists and is valid JSON

**New images not appearing**
- Run `npm run sync-gallery` locally to test
- Check that images are in the correct folder structure
- Verify file extensions are supported

**GitHub Action not running**
- Check that files were pushed to `assets/images/art-page-auto/**`
- View the Actions tab in GitHub for logs

---

**Created**: February 2026
**Compatible with**: GitHub Pages, Static Hosting
