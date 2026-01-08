# MASTER PROMPT: SOLARIS ROSE UI

**Objective:** Create a divine, high-fidelity UI landing page theme titled "Solaris Rose".

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Solaris Rose." Celestial, divine, elegant, warm, premium fashion/luxury.
- **Palette:**
  - **Background:** Deep Warm Black/Brown (`radial-gradient(circle at top left, #1c1917 0%, #0c0a09 100%)`).
  - **Accent:** Rose Gold / Pink (`#fb7185`) to Amber.
  - **Elements:** Soft glowing orbs, embers, rose-tinged veils.
- **Fonts:**
  - _Headings:_ 'Cormorant Garamond' (Serif, Elegant).
  - _Body:_ 'Tenor Sans' (Clean, Humanist).

## 2. Key UI Elements

1.  **Corona Flare:** A central, rotating, breathing glow behind the main content.
2.  **Ember Rise:** small particles floating upwards from the bottom, simulating heat or rose petals.
3.  **Typography:** Large, tracked-out titles ("CELESTIAL"). Subtle reveal animations.
4.  **Vignette & Grain:** Essential for that "film" look.

## 3. Technical Implementation (React/Tailwind)

- **Framework:** React 18, Tailwind CSS.
- **Animations:** CSS Keyframes (`@keyframes`).
  - `corona-flare`: scaling and opacity pulse.
  - `ember-rise`: upward drift with fade out.
  - `text-reveal`: translate Y + blur reveal.
- **Structure:**
  - `Background Layers` (z-0 to z-10)
  - `Content Layer` (z-20)
  - `Overlay Effects` (Grain/Vignette, z-30, pointer-events-none)

## 4. Interaction

- **Mouse:** Subtle parallax on the background layers (optional).
- **Load:** Staggered reveal of text elements.

## Output

A single HTML file with embedded React/Babel/Tailwind CDN links.
