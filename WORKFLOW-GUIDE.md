# Gallery Workflow Guide

## 🎯 Three Ways to Add Art

### Method 1: GitHub Web UI (Easiest)
1. Go to your repository on GitHub.com
2. Navigate to `assets/images/art-page-auto/[category]/`
3. Click "Add file" → "Upload files"
4. Drag and drop your images
5. Commit changes
6. Wait ~30 seconds for GitHub Action to run
7. Edit `gallery-data.json` online to add titles/descriptions
8. Commit again

### Method 2: Local Git (Most Control)
```bash
# 1. Add images to folders
cp ~/my-art/*.jpg assets/images/art-page-auto/paintings/

# 2. Run sync script
npm run sync-gallery

# 3. Edit gallery-data.json to add metadata
# (use your text editor)

# 4. Commit and push
git add .
git commit -m "Add new paintings"
git push
```

### Method 3: GitHub Desktop (Visual)
1. Drag images into `assets/images/art-page-auto/[category]/`
2. Open GitHub Desktop - it will detect changes
3. Commit with a message like "Add new artworks"
4. Push to origin
5. GitHub Action will auto-sync
6. Edit metadata via GitHub web UI or locally

## 📋 Complete Workflow Example

**Scenario**: Adding 5 new paintings

```bash
# Step 1: Create folder if needed
mkdir -p assets/images/art-page-auto/paintings

# Step 2: Add images
cp ~/Desktop/painting*.jpg assets/images/art-page-auto/paintings/

# Step 3: Sync (auto-populates JSON with blanks)
npm run sync-gallery

# Output:
# 🎨 Scanning art-page-auto folder...
# Found 3 sections:
#   - Paintings (5 images)
# ...
# ✅ Gallery data synced successfully!
```

Now `gallery-data.json` contains:

```json
{
  "artworks": [
    {
      "filename": "painting1.jpg",
      "path": "assets/images/art-page-auto/paintings/painting1.jpg",
      "title": "",           ← Fill this in
      "medium": "",          ← Fill this in
      "description": "",     ← Fill this in
      "section": "paintings"
    }
  ]
}
```

**Step 4**: Edit the blank fields:

```json
{
  "filename": "painting1.jpg",
  "path": "assets/images/art-page-auto/paintings/painting1.jpg",
  "title": "Sunset Over Mountains",
  "medium": "Oil on Canvas",
  "description": "A vibrant exploration of warm tones and atmospheric perspective",
  "section": "paintings"
}
```

**Step 5**: Commit and push:

```bash
git add .
git commit -m "Add paintings with metadata"
git push
```

Done! Your art page now shows the new section with all metadata.

## 🎨 Metadata Best Practices

### Titles
- Be descriptive but concise
- Capitalize properly: "Midnight Dreams" not "midnight dreams"
- Leave blank if untitled (filename will be used)

### Medium
- Be specific: "Oil on Canvas" not just "Oil"
- Include dimensions if relevant: "Acrylic on Wood Panel, 24x36""
- List techniques: "Digital (Procreate)"

### Descriptions
- 1-2 sentences ideal
- Focus on concept, mood, or inspiration
- Avoid redundancy with title

## 🔄 Updating Existing Art

The sync script **never overwrites** existing metadata. To update:

1. Find the artwork in `gallery-data.json`
2. Edit the fields directly
3. Commit changes

To replace an image:
1. Delete old image file
2. Add new image with same filename
3. Sync runs - path stays the same
4. Metadata preserved

## 🗂️ Organizing Categories

### Good folder names:
- `core-works` → "Core Works"
- `digital-art` → "Digital Art"
- `figure-studies` → "Figure Studies"
- `murals-2024` → "Murals 2024"

### Avoid:
- Spaces: `my art` ❌
- Special chars: `art&design` ❌
- CamelCase: `MyArt` ❌ (use `my-art` ✅)

## ⚡ Quick Reference

```bash
# Sync gallery
npm run sync-gallery

# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub (triggers deployment)
git push

# View sync logs (GitHub)
# → Go to Actions tab in repository
```

## 🐛 Common Issues

**"Gallery shows no artworks"**
- Run `npm run sync-gallery` locally
- Check `gallery-data.json` is not empty
- Verify images are in correct folder structure

**"My edits were overwritten!"**
- The sync ONLY adds new entries
- Check git history: `git log gallery-data.json`
- Restore from previous commit if needed

**"New folder not appearing as tab"**
- Folder must contain at least one image
- Run sync after adding images
- Check folder name uses hyphens, not spaces

**"GitHub Action not running"**
- Must push changes to `assets/images/art-page-auto/**` path
- Check Actions tab for workflow runs
- Manually trigger from Actions tab if needed

---

**Tip**: Bookmark `gallery-data.json` in your editor for quick metadata updates!
