# MASTER PROMPT: ABSTRACT MESH - COSMIC

**Objective:** Create a high-fidelity WebGL shader simulating a deep-space nebula with "spatial folding" distortion.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Cosmic." Vast, deep, mysterious, premium SaaS.
- **Palette:**
  - **Background:** Deep Void (`#0d0015`).
  - **Accent:** Vibrant Magenta (`#d500f9`) to Deep Blue (`#2962ff`).
  - **Nebula:** Soft, gaseous purples and pinks.
- **Motion:** Slow, majestic drifting. Like watching a galaxy rotate.

## 2. Technical Implementation (GLSL)

- **Folding Logic:** "Spatial Folding." The folds should look like ripples in spacetime or gravity waves.
- **Nebula Fog:** Use `fbm` to generate soft, cloud-like noise that sits _behind_ the sharp folds.
- **Lighting:** Deep ambient occlusion in the crevices, bright neon highlights on the ridges.
- **Grain:** Very fine film grain (simulates sensor noise).

## 3. Key Shader Functions

- `fold(vec2 p)`: Lower frequency folding than Ember, smoother ease.
- `nebula(vec2 p)`: High-persistence FBM for clouds.
- `mix(colorA, colorB, fold)`: Blend colors based on folding depth.

## 4. Interaction

- **Mouse:** Drags the "fabric" of space slightly.
- **Scroll/Time:** Warps the domain slowly.

## Output

A single HTML file with a full-screen WebGL canvas. Focus on "Deep Depth" perception.
