# ⚙️ UI Bundle: The Punk Collection

**Category**: Cards / Display
**Themes**: Solarpunk (currently), ready for Steampunk/Cyberpunk expansion.

## 📖 Bundle Overview

A dedicated collection for industrial, mechanical, and sci-fi aesthetics. Currently features the flagship **Solarpunk** theme.

## 💻 Usage Instructions

### 1. The Solarpunk Aesthetic

- **Visuals**: Rotating gears, copper gradients, verdigris accents, and vine integration.
- **Vibe**: Optimistic futurism, high-tech ecology.

### 2. Extraction

To isolate the Punk collection:

1.  **Keep** CSS block `[THEME 1] SOLARPUNK`.
2.  **Delete** the seasonal blocks (Themes 2-6) to remove nature/weather themes.
3.  **HTML**: Keep only the `#deco-solarpunk` container.

### 3. Future Proofing

This prompts serves as the entry point for future "Punk" variants (e.g., adding `theme-cyberpunk` or `theme-steampunk`). The CSS architecture allows you to easily add a `[THEME 7]` block following the existing pattern.

### 4. Standalone Card Usage (Component Only)

To extract the Solarpunk cards for use in an existing dashboard:

1.  **CSS**:
    - Copy `body.theme-solarpunk` variables.
    - Copy all card-related styles.
2.  **HTML**:
    - Copy `.cards-container` + `#expandedCard`.
    - Wrap in `<div class="theme-solarpunk">`.
3.  **JS**:
    - Copy the card interaction scripts.
