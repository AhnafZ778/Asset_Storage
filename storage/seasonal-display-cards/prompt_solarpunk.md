# ⚙️ UI Component: Solarpunk Display Card

**Category**: Cards / Display
**Theme**: Solarpunk (Nature Meets Industry)

## 📖 Component Overview

HIGH-FIDELITY solarpunk aesthetic card with 3D stacking animations, rotating gear backgrounds, and rich copper/bronze visuals. Perfect for highlighting technology, eco-futurism, or industrial innovations.

## 🛠️ Dependencies

- **Tailwind CSS** (via CDN or build)
- **Google Fonts**: `Cormorant Garamond` (Headings), `Spectral` (Body)
- **Icons**: Lucide Icons (SVGs included inline)

## 💻 Usage Instructions

### 1. CSS Integration

The provided code contains **ALL** themes. To use **ONLY** the Solarpunk theme:

1.  **Keep** the `SHARED BACKGROUND UTILITIES` and `THEME DEFINITIONS` sections.
2.  **Keep** the `[THEME 1] SOLARPUNK` block.
3.  **Delete** other theme blocks (Cherry, Autumn, Winter, Summer, Rainy) to reduce file size.
4.  **Keep** the `[ANIMATION] SOLARPUNK` block.
5.  **Delete** other animation blocks.

### 2. HTML Structure

- Ensure your `<body>` has the class: `theme-solarpunk`.
- Copy the `<!-- [THEME SEGMENT] SOLARPUNK DECORATIONS -->` block.
- You can remove the `theme-selector` dropdown if you are hardcoding this theme.

### 3. JavaScript

- The `themeContent` object contains data for all themes. You can strip out non-solarpunk data if desired, or keep it as is.
- Ensure `currentTheme` is initialized to `'solarpunk'`.

### 4. Standalone Card Usage (Component Only)

To use **only** the 3D stacked cards without the full page background or settings:

1.  **CSS**:
    - Copy the `body.theme-solarpunk` block (for variables).
    - Copy all styles under `/* ========== CARD STYLING ========== */`.
    - Copy all styles under `/* ========== EXPANDED CARD VIEW ========== */`.
2.  **HTML**:
    - Copy the `.cards-wrapper` > `.cards-container` block.
    - Copy the `#expandedCard` modal block.
    - Wrap them in a container with class `theme-solarpunk` to apply variables.
3.  **JS**:
    - Copy `setupCardClickHandlers`, `openExpandedCard`, and `closeExpandedCard`.

## 🎨 customizable Variables

```css
/* Core Colors */
--primary: #b87333; /* Copper */
--secondary: #cd7f32; /* Bronze */
--accent: #2f847c; /* Verdigris */
--card-bg: linear-gradient(...); /* Glass Panel */
```

## ✨ Features

- **3D Stack Effect**: Cards hover and stack with `perspective` and `skew`.
- **Parallax Gears**: Background gears rotate and respond to mouse movement.
- **Glassmorphism**: Premium frosted glass effects on cards.
