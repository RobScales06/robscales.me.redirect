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
