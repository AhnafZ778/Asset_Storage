# MASTER PROMPT: ETHEREAL MIST - LUMINOUS

**Objective:** Create a high-fidelity visual component simulating shifting fog and auroras with a Dreamy, Calm aesthetic.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "LUMINOUS." Soft cyan lights in a dark void.
- **Palette:**
  - **Background:** Dark Slate (#0F172A)
  - **Accent:** Luminous Cyan (#22D3EE)
  - **Highlights:** White Motes
- **Motion:** Slow drifting fog, shimmering lights

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

- **Mouse:** Mouse disperses the mist slightly.
- **Scroll:** Vertical fog density shift.

## Output

A standalone HTML file containing the React component, styles, and initialization code.
