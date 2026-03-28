# Art Page Auto-Sync System

This folder contains subfolders for organizing your artwork. Each subfolder automatically becomes a section/tab on the art page.

## How it works:

1. **Create a subfolder** for each category (e.g., `core-works`, `paintings`, `sketches`)
2. **Add images** to the folders
3. **Run the sync** (locally or push to GitHub)
4. **Edit metadata** in `gallery-data.json` to add titles, mediums, and descriptions

## Folder naming:

- Folder names become tab labels
- Use lowercase with hyphens: `figure-portraiture` → "Figure Portraiture"
- Subfolders are auto-detected

## Supported formats:

.jpg, .jpeg, .png, .gif, .webp, .svg

## Metadata visibility controls

The gallery is metadata-first. Filenames are not shown as captions by default.

Use `gallery-data.json` to control what appears:

- `title`: text for caption/lightbox title
- `medium`: optional short line shown next to title in caption
- `description`: longer lightbox description
- `displayTitle`: set to `false` to hide title/medium for this artwork
- `displayDescription`: set to `false` to hide lightbox description for this artwork

Example artwork entry:

```json
{
    "filename": "piece1.jpg",
    "path": "assets/images/art-page-auto/core-works/piece1.jpg",
    "title": "Untitled Figure Study",
    "displayTitle": true,
    "medium": "Acrylic on panel",
    "description": "Explores gesture and compression in seated poses.",
    "displayDescription": true,
    "section": "core-works"
}
```

Tip: Keep `title`/`description` filled in for archival purposes, then use display flags to decide what is visible on the site.

## Example structure:

```
art-page-auto/
├── core-works/
│   ├── piece1.jpg
│   └── piece2.png
├── paintings/
│   └── landscape.jpg
└── sketches/
    └── study.jpg
```
