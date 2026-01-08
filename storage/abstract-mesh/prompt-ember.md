# MASTER PROMPT: ABSTRACT MESH - EMBER

**Objective:** Create a high-fidelity WebGL shader simulating organic "micro-folding" structures with a fiery, energetic aesthetic.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Ember." High energy, heat, kinetic motion.
- **Palette:**
  - **Background:** Deep reddish-black (`#1a0a00`).
  - **Accent:** Burning Orange (`#ff5722`) to Gold (`#ffca28`).
  - **Highlights:** Intense white-hot peaks.
- **Motion:** pulsing, breathing, aggressive but smooth.

## 2. Technical Implementation (GLSL)

- **Folding Logic:** Use domain warping (`fbm`) combined with iterative "folding" (a rotational folding function) to create intricate, ridge-like structures.
- **Lighting:** Simulate self-illumination based on the "height" of the folds. Higher folds = hotter/brighter.
- **Grain:** Add subtle film grain to prevent banding and add texture.
- **Post-Process:** Use tone mapping (ACES) to handle high dynamic range colors without clipping.

## 3. Key Shader Functions

- `fold(vec2 p, float t)`: Iterative rotation and displacement (5 octaves).
- `fbm(vec2 p)`: Fractal Brownian Motion for base noise.
- `tonemap(vec3 color)`: Standard filmic curve.

## 4. Interaction

- **Mouse:** Subtle parallax or distortion based on mouse position.
- **Scroll/Time:** Continuous gentle evolution.

## Output

A single HTML file with a full-screen WebGL canvas, no external CSS framework dependencies (inline styles only).
