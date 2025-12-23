# 🏗️ Architecture: Technical Details

## Viewer Application (`viewer/`)

The viewer is a static HTML/JS application. It does NOT require a backend API.

### `catalog.json` Schema

The single source of truth for the gallery.

```json
[
  {
    "id": "unique-kebab-case-id",
    "name": "Glassmorphism Card",
    "description": "A frosted glass card with hover tilt effect.",
    "path": "../storage/glass-card/code.html",
    "preview": "../storage/glass-card/preview.png",
    "promptPath": "../storage/glass-card/prompt.md",
    "tags": ["card", "glassmorphism", "3d"],
    "dateCreated": "2024-05-20"
  }
]
```

### Smart Copy Logic

The `script.js` fetches the content of `code.html` AND `prompt.md` to construct a clipboard payload:

```javascript
const payload = `
*** UI ASSET: ${asset.name} ***
${promptContent}

*** CODE ***
${codeContent}
`;
navigator.clipboard.writeText(payload);
```

### Security Note

Modern browsers block `fetch()` requests to `file://` URLs.
**Requirement**: The user _must_ run a local server (e.g., `python3 -m http.server`, `npx http-server`, or the Live Server extension) to view the gallery properly.
