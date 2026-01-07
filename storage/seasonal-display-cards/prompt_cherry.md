# 🌸 UI Component: Cherry Blossom Display Card

**Category**: Cards / Display
**Theme**: Cherry Blossom (Sakura & Wind)

## 📖 Component Overview

ELEGANT cherry blossom aesthetic with floating petal particles, swaying branches, and a soft pink/magenta palette. Ideal for spring promotions, lifestyle content, or serene user interfaces.

## 🛠️ Dependencies

- **Tailwind CSS**
- **Google Fonts**: `Cormorant Garamond`, `Spectral`

## 💻 Usage Instructions

### 1. Extraction Strategy

This asset is part of the "Seasonal Display" pack. To extract the **Cherry Blossom** theme:

1.  **CSS**: Locate the comment `[THEME 2] CHERRY BLOSSOM`. Keep this block.
2.  **Animations**: Locate `[ANIMATION] CHERRY BLOSSOM`. Keep this block.
3.  **Cleanup**: You may delete the Solarpunk, Autumn, Winter, Summer, and Rainy CSS blocks.

### 2. HTML Setup

- Set `<body>` class to `theme-cherry`.
- Include the decoration block labeled: `<!-- [THEME SEGMENT] CHERRY BLOSSOM DECORATIONS -->`.
- This includes the SVG branches and Unicode petals.

### 3. Particle Effects

The `body.theme-cherry .particle` CSS rule creates the specific "asymmetric petal" falling effect. Ensure this CSS is preserved.

### 4. Standalone Card Usage (Component Only)

To use **only** the UI cards (and petal effects) without the full page layout:

1.  **CSS**:
    - Copy `body.theme-cherry` (variables).
    - Copy `/* ========== CARD STYLING ========== */` and `/* ========== EXPANDED CARD VIEW ========== */`.
    - Copy the `.particle` and `@keyframes petal-particle` styles if you want the effect.
2.  **HTML**:
    - Copy `.cards-container` and `#expandedCard`.
    - **Crucial**: Wrap your section in `<div class="theme-cherry">` to activate the colors.
3.  **JS**:
    - Copy the Card Click Handling logic (`setupCardClickHandlers` etc.).

## 🎨 Aesthetic Details

- **Primary Color**: `#FFB7C5` (Sakura Pink)
- **Vibe**: Gentle, floating, ethereal.
- **Motion**: Uses specific `@keyframes petal-float` for organic movement.
