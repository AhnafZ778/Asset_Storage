# 🍂 UI Component: Autumn Display Card

**Category**: Cards / Display
**Theme**: Autumn (Harvest & Decay)

## 📖 Component Overview

COZY autumn aesthetic featuring falling leaves, rich amber/orange tones, and tree silhouettes. Captures the warmth of harvest and the nostalgia of the season.

## 💻 Usage Instructions

### 1. Extraction Strategy

To use the **Autumn** theme exclusively:

1.  **CSS**: Keep the block labeled `[THEME 3] AUTUMN`.
2.  **Animations**: Keep `[ANIMATION] AUTUMN`.
3.  **Cleanup**: Remove other theme blocks to optimize.

### 2. HTML Setup

- Set `<body>` class to `theme-autumn`.
- Include the `<!-- [THEME SEGMENT] AUTUMN DECORATIONS -->` block (contains unicode leaves and SVG trees).

### 3. Animation Logic

- The leaves float using `@keyframes leaf-fall` which includes rotation and swaying.
- Mouse movement creates a subtle parallax effect on the background trees.

### 4. Standalone Card Usage (Component Only)

To use **only** the cards without the full webpage:

1.  **CSS**:
    - Copy `body.theme-autumn` definitions.
    - Copy classes starting with `.display-card`, `.card-1`, `.card-2`, `.card-3`.
    - Copy the expanded card modal styles.
2.  **HTML**:
    - Extract the `.cards-container` div.
    - Extract the `.expanded-card` elements.
    - Wrap them in a parent with `class="theme-autumn"`.

## 🎨 Palette

- **Primary**: `#D2691E` (Burnt Orange)
- **Accent**: `#8B4513` (Saddle Brown)
- **Atmosphere**: Warm, rustic, inviting.
