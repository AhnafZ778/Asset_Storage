# 🗓️ UI Bundle: The Seasons Collection

**Category**: Cards / Display
**Themes**: Cherry Blossom, Summer, Autumn, Winter, Rainy
**Components**: 5 Distinct Aesthetics

## 📖 Bundle Overview

This bundle contains **ALL 5 seasonal themes** in a single file, complete with a theme switcher. It allows users to toggle between seasons dynamically, offering a year-round visual experience.

## 💻 Usage Instructions

### 1. Integrated Switcher

The code includes a built-in `theme-selector` dropdown script.

- **Logic**: The script listens for clicks on `.theme-option` and swaps the `<body>` class (e.g., `theme-winter` -> `theme-spring`).
- **Decorations**: It automatically toggles the visibility (`.active` class) of the corresponding decoration container (`#deco-winter`, etc.).

### 2. Customization

If you want to keep ALL seasons:

- **Keep ALL CSS** blocks labeled [THEME 2] through [THEME 6].
- **Keep ALL HTML** decoration blocks.
- **JS**: Ensure the `themeContent` object retains data for all seasonal keys.

### 3. Exclusion

If you wish to remove the "Solarpunk" / Industrial theme from this bundle:

- Delete the `[THEME 1] SOLARPUNK` CSS block.
- Delete the `<!-- [THEME SEGMENT] SOLARPUNK -->` HTML block.
- Remove 'solarpunk' from the JS `themeContent` and the HTML dropdown menu.

### 4. Standalone Card Usage (Component Only)

To use the seasonal cards without the full webpage layout/backgrounds:

1.  **CSS**:
    - Keep all `body.theme-*` variable definitions (Themes 2-6).
    - Keep `/* CARD STYLING */` and `/* EXPANDED CARD VIEW */`.
2.  **HTML**:
    - Copy only `.cards-container` and `#expandedCard`.
    - **Crucial**: Wrap the component in a container that has the active theme class (e.g., `<div class="theme-winter">...</div>`).
    - You will need your own logic to toggle this class if you want to switch themes.
3.  **JS**:
    - Copy the click handler and modal logic.

## 🌟 Perfect For

- Seasonal marketing campaigns.
- Dynamic dashboards that reflect real-world weather/time.
- storytelling interfaces.
