# MASTER PROMPT: ABSTRACT MESH - DUNE

**Objective:** Create a high-fidelity WebGL shader simulating wind-blown sand dunes.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Dune." Arrakis, mystery, wind, sand.
- **Palette:**
  - **Background:** Deep Brown (`#1a1500`).
  - **Sand:** Warm Beige (`#f4a460`) to Shadow (`#c4a484`).
  - **Texture:** Gritty, granular.
- **Motion:** Drifting, blowing wind.

## 2. Technical Implementation (GLSL)

- **Folding Logic:** Sharp,ridged dunes.
- **Drift:** Use `fbm` to bias the coordinates over time (`p.x += fbm(time)`), simulating wind pushing the sand.
- **Grain:** Heavy film grain to simulate individual sand particles.

## 3. Key Shader Functions

- `fold(vec2 p)`: Sharp ridges.
- `fbm(vec2 p)`: Wind bias.
- `filmGrain(vec2 uv)`: High intensity.

## Output

A single HTML file with a full-screen WebGL canvas.
