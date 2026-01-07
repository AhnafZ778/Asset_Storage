# 🌧️ UI Component: Rainy Display Card

**Category**: Cards / Display
**Theme**: Rainy (Storm & Calm)

## 📖 Component Overview

ATMOSPHERIC rainy aesthetic with drifting dark clouds, CSS-generated raindrops, and rippling puddles. A moodier, calmer theme suitable for lo-fi aesthetics or serious content.

## 💻 Usage Instructions

### 1. Extraction Strategy

For the **Rainy** theme:

1.  **CSS**: Keep `[THEME 6] RAINY`.
2.  **Animations**: Keep `[ANIMATION] RAINY`.
3.  **Cleanup**: Delete other theme blocks.

### 2. HTML Setup

- Set `<body>` class to `theme-rainy`.
- Include `<!-- [THEME SEGMENT] RAINY DECORATIONS -->`.

### 3. Technical Detail

- **Raindrops**: Created using pure CSS (`div.raindrop`) with linear gradients and animation delays to simulate random fall patterns.
- **Puddles**: Scaled ellipses that animate to simulate ripples on the ground.

### 4. Standalone Card Usage (Component Only)

To grab just the cards:

1.  **CSS**:
    - Keep `body.theme-rainy` variables.
    - Keep `.display-card` and `.expanded-card` styles.
2.  **HTML**:
    `html
    <div class="theme-rainy">
       <!-- Paste .cards-container here -->
       <!-- Paste #expandedCard here -->
    </div>
    `

## 🎨 Palette

- **Primary**: `#6B8E9F` (Slate Blue)
- **Background**: Dark, stormy gradient.
- **Vibe**: Melancholic, soothing, wet.
