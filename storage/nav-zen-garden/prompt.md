# Zen Garden Navbar

A tranquil, nature-inspired navigation bar featuring procedural "Bush" buttons and physics-based "Soot Sprite" interaction.

## Features

- **Procedural Bushes**: Cel-shaded bush elements with CSS animations for sway, rustle, and squash/stretch physics.
- **Soot Sprite Companion**: An interactive sprite that follows the active navigation state, peeking out from behind bushes.
- **Wind Physics**: Mouse movement imparts specific "Wind Velocity" to the bushes, causing them to sway directionally.
- **Atmospheric Effects**: Includes canvas grain, god rays, and floating particles (leaves, dust).
- **Responsive Layout**: Centered layout with stone texture container.

## Dependencies

- **Tailwind CSS** (CDN)
- **Google Fonts**: Nunito (Rounded), Caveat (Hand-drawn).
- **Vanilla JS**: No framework required.

## Usage

Include the entire `code.html` in an iframe. The component handles its own physics loop via `requestAnimationFrame`. Use `window.showPage('id')` to programmatically switch tabs.
