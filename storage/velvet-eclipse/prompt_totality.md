# MASTER PROMPT: VELVET ECLIPSE - TOTALITY

**Objective:** Create a high-fidelity visual component simulating a total solar eclipse with a Cinematic, Dramatic aesthetic.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "TOTALITY." The moment of total coverage, deep contrasts.
- **Palette:**
  - **Background:** Deep Space Black (#000000)
  - **Accent:** Solar Orange (#FF9066)
  - **Highlights:** White Corona
- **Motion:** Breathing corona, orbital rotation

## 2. Technical Implementation

- **Framework:** React 18 (Functional Components, Hooks).
- **Styling:** Tailwind CSS + Custom CSS Animations (@keyframes).
- **Animation:** 
    - CSS Transitions for hover states.
    - React `useEffect` or `requestAnimationFrame` for particle systems (if applicable).
    - SVG Filters for glow/liquid effects.

## 3. Key Features

- **Responsive Design:** Fluid layout that fits parent container.
- **Interactive Elements:**
    - Mouse movement tracking (parallax).
    - Hover effects on cards/buttons.
- **Performance:** Optimized rendering (will-change, transform: translate3d).

## 4. Interaction

- **Mouse:** Mouse moves the light source/shadow.
- **Scroll:** Parallax stars.

## Output

A standalone HTML file containing the React component, styles, and initialization code.
