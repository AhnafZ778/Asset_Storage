# Eden-Glass-Nav

A biomimetic interface where crystalline glassmorphism meets organic, breathing motion.

## Features

- **"Breeze" Physics Engine**: Softened springs (Stiffness: 180) that sync container collapse with a misty text dissolve effect.
- **Organic Asymmetry**: Active indicators change border-radius dynamically (e.g., leaf shapes) based on index, breaking the grid.
- **Spore Float Effect**: Hovered icons float gently using CSS keyframes for a continuous, low-power organic feel.
- **Glassmorphism 2.0**: Uses multi-layered box-shadows, inner bevels (`inset 0 1px 0`), and SVG noise overlays for tactile depth.
- **Vine Entrance**: Elements grow and scale in sequence like organic vines.

## Dependencies

- React 18
- Framer Motion 11
- Tailwind CSS 4 (Browser CDN)
- Outfit Font (Google Fonts)

## Usage

Include `EdenNav` as the primary component. Customize the `items` array with gradients (`bgGradient`) and shadow colors (`shadowColor`) to match your theme. The `BiomimeticItem` handles all the interaction logic.
