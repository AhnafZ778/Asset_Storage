# Island-Flex-Nav

A premium, Apple-inspired "Dynamic Island" navigation bar built with React and Framer Motion.

## Features

- **Hover-to-Expand Labels**: Icons-only by default, text labels smoothly reveal on hover.
- **Sliding Active Indicator**: A glowing pill slides between items using `layoutId`.
- **Flex-Anchor Centering**: Uses a full-width flex container to ensure pixel-perfect symmetric expansion without transform conflicts.
- **Staggered Animations**: Each label fades in with a slight delay for a premium cascading effect.
- **Accessibility**: Full `aria-label` and keyboard focus support.

## Dependencies

- React 18
- Framer Motion 11
- Tailwind CSS 4 (Browser CDN)
- Inter Font (Google Fonts)

## Usage

Include the entire HTML file as a standalone component demo. Extract the `DynamicIsland` and `IslandItem` React components for integration into a larger React project. Customize `navItems` array for different menu items.
