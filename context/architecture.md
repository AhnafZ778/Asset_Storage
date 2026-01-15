# 🏗️ Architecture: Technical Details

## Viewer Application (`viewer/`)

The viewer is a static HTML/JS application. It does NOT require a backend API.

### `catalog.json` Schema

The single source of truth for the gallery.

```json
[
  {
    "id": "unique-kebab-case-id",
    "name": "Display Name",
    "category": "Category Name",
    "description": "Brief description of the component.",
    "path": "../storage/component-name/code.html",
    "codePath": "../storage/component-name/fragment.html", // Optional: for smart copy
    "preview": "https://placehold.co/400x300/bg/fg?text=Preview",
    "tags": ["tag1", "tag2", "tag3"],
    "dateCreated": "YYYY-MM-DD",
    "variants": [
      {
        "name": "Default",
        "class": "",
        "promptPath": "../storage/component-name/prompt.md"
      },
      {
        "name": "Variant Name",
        "class": "variant-class",
        "promptPath": "../storage/component-name/prompt_variant.md"
      }
    ]
  }
]
```

### Current Categories

| Category       | Description                                  | Example Assets                                     |
| -------------- | -------------------------------------------- | -------------------------------------------------- |
| **Cursors**    | Custom cursor effects with canvas/WebGL      | Synaptic-Impulse, Quantum Navigator, Void Drifter  |
| **Navigation** | Navbars, sidebars, and navigation components | Elemental Slider, Island-Flex-Nav, Liquid-Toon-Nav |
| **UI Cards**   | Card components with glass effects           | Glassmorphism Card                                 |
| **Hero**       | Hero section backgrounds and animations      | Neural Cluster Background                          |

### Smart Copy Logic

The `main.js` fetches the content of `code.html` AND `prompt.md` to construct a clipboard payload:

```javascript
const payload = `
*** UI ASSET: ${asset.name} ***
${promptContent}

*** CODE ***
${codeContent}
`;
navigator.clipboard.writeText(payload);
```

### Adding a New Asset

1. Create folder: `storage/{asset-name}/`
2. Add `code.html` (demo with sample content)
3. Add `prompt.md` (comprehensive LLM-friendly instructions)
4. Register in `viewer/catalog.json`
5. Run local server from `viewer/` directory to test

### Security Note

Modern browsers block `fetch()` requests to `file://` URLs.
**Requirement**: The user _must_ run a local server (e.g., `python3 -m http.server`, `npx http-server`, or the Live Server extension) to view the gallery properly.

**Note**: Run the server from the project root, not `/viewer/`, if you want to preview assets that reference `../storage/` paths.

## ☁️ Deployment Architecture

To support the split structure (`viewer/` app + `storage/` assets) on Vercel:

1.  **`vercel.json` Rewrites**:
    - Requests to `/` and other paths are rewritten to `/viewer/$1`.
    - This makes the `viewer` directory act as the public root.
2.  **CORS Headers**:
    - Added explicitly to allow `viewer` (served from root) to fetch JSON and HTML from `storage/` if needed, though they are on the same domain in this setup.

### Live URLs

- **Preview**: Run `vercel`
- **Production**: Run `vercel --prod`
