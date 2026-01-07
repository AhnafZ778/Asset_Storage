# ❄️ UI Component: Winter Display Card

**Category**: Cards / Display
**Theme**: Winter (Ice & Silence)

## 📖 Component Overview

SHARP, crystalline aesthetic with falling snow, glistening ice crystals, and a cool blue/cyan palette. Perfect for holiday themes, winter sales, or clean, minimalist sci-fi interfaces.

## 💻 Usage Instructions

### 1. Extraction Strategy

To use the **Winter** theme:

1.  **CSS**: Preserve `[THEME 4] WINTER/GLACIER`.
2.  **Animations**: Preserve `[ANIMATION] WINTER`.
3.  **Cleanup**: Delete other theme blocks.

### 2. HTML Setup

- Set `<body>` class to `theme-winter`.
- Include `<!-- [THEME SEGMENT] WINTER DECORATIONS -->`.
- The background pattern uses a specific `radial-gradient` that simulates glowing frost.

### 3. Interactive Elements

- The "Expanded Card" view (click any card) uses a frosted glass backdrop (`backdrop-filter: blur(20px)`) which looks especially effective with the high-contrast winter palette.

### 4. Standalone Card Usage (Component Only)

To use only the cards in your own layout:

1.  **CSS**:
    - Retain `body.theme-winter` for variables.
    - Retain all `.display-card`, `.expanded-card`, and shadow/glow utilities.
2.  **HTML**:
    - Copy `.cards-container` and `#expandedCard`.
    - **Note**: Ensure the parent container has `class="theme-winter"`.
3.  **JS Integration**:
    - You only need the `openExpandedCard` functions. You can discard the `updateDecorations` logic if you aren't using the background animations.

## 🎨 Palette

- **Primary**: `#87CEEB` (Sky Blue)
- **Highlight**: `#00CED1` (Cyan)
- **Vibe**: Cold, sharp, precise.
