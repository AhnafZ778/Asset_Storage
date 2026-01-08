# MASTER PROMPT: ABSTRACT MESH - MERCURY

**Objective:** Create a high-fidelity WebGL shader simulating liquid chrome or molten metal.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Mercury." Liquid metal, clean, sterile, high-tech, T-1000.
- **Palette:**
  - **Background:** Dark Silver (`#111111`) to White (`#ffffff`).
  - **Finish:** Highly reflective, specular, monochromatic.
- **Motion:** Fluid, viscous flow. Smooth ease-in/out.

## 2. Technical Implementation (GLSL)

- **Folding Logic:** Smooth folding. The ridges should be rounded, not sharp.
- **Specular Highlights:** calculate `pow(fold, 8.0)` to create tight, bright highlights that simulate reflection on a shiny surface.
- **Contrast:** High contrast. It relies on the interplay of pure white highlights against dark grey valleys.
- **Chromatic Aberration:** (Optional) Very subtle RGB split on the edges of the chrome to add realism.

## 3. Key Shader Functions

- `fold(vec2 p)`: Smooth ridges.
- `specular(float v)`: `pow(v, high_exponent)`.
- `tonemap(vec3 c)`: Desaturate and crush blacks.

## 4. Interaction

- **Mouse:** Ripples the surface like touching water/mercury.

## Output

A single HTML file with a full-screen WebGL canvas. The look must be "Metallic" and "Liquid."
