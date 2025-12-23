# Usage Guide: Glassmorphism Card

## Description

A premium card component featuring a frosted glass effect (backdrop-filter), ideal for dark-themed dashboards or landing pages.

## Dependencies

- **Parent Container**: Should have a dark or gradient background for the effect to be visible.
- **Fonts**: Works best with sans-serif fonts (e.g., Inter, Roboto).

## How to Use

1.  **Paste**: Insert the HTML structure where you want the card.
2.  **Style**: The `<style>` block is scoped to `.glass-card`. You can move it to your main CSS file.
3.  **Customize**:
    - Adjust `backdrop-filter: blur(10px)` for more/less frost.
    - Change `background: rgba(...)` opacity to control transparency.

## Context for Agents

When integrating this, ensure the `z-index` is handled properly if it overlays other elements.
