# 💎 UI Master Asset: Seasonal & Punk Display Cards (Complete)

**Category**: Cards / Display
**Contains**: 6 Fully Realized Themes + Theme Switcher

## 📖 Asset Overview

This is the **COMPLETE** master file containing the entire design system. It includes:

1.  **Solarpunk** (Industrial/Nature)
2.  **Cherry Blossom** (Spring)
3.  **Summer** (Radiance)
4.  **Autumn** (Harvest)
5.  **Winter/Glacier** (Ice)
6.  **Rainy** (Storm)

## 🚀 Features

- **Universal Theme Switcher**: Fully functional JS dropdown to swap themes instantly.
- **Dynamic Content**: Text, titles, and dates update dynamically based on the selected theme.
- **Shared Architecture**: All themes share the same premium "3D Stacked Card" layout and "Expanded View" modal logic, ensuring consistency while changing aesthetics.

## 💻 Integration Guide

1.  **Copy the entire file**.
2.  **Tailwind**: Ensure Tailwind is running (CDN included).
3.  **Fonts**: Ensure Google Fonts (Spectral, Cormorant) are loaded.
4.  **Plug & Play**: The file is self-contained.

### 5. Component-Only Extraction

If you want the **entire functionality** (all 6 themes + switcher) but as a standalone component inside a larger app:

1.  **Container**:
    - Instead of `<body>` having the theme class, wrap the `.cards-container`, `#expandedCard`, and `.decorations` inside a main wrapper: `<div id="card-component-wrapper" class="theme-solarpunk relative overflow-hidden">...</div>`.
2.  **JS Adjustment**:
    - Change `document.body.className = ...` to targeted updates on your wrapper ID.
    - Change `document.body.classList.add('card-open')` to apply to your wrapper.
3.  **CSS**:
    - Ensure `.decorations` has `position: absolute` relative to your wrapper, not `fixed`.

## 🧠 Architecture API

- **`currentTheme`**: Global variable tracking the active state.
- **`updateDecorations(theme)`**: Helper function that controls which background elements are visible.
- **`themeContent`**: JSON object storing the text content for every card in every theme. Modify this to change the displayed data.
