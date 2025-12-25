# Liquid-Toon-Nav

A high-impact, cartoon-inspired navigation bar that feels heavy, expensive, and elastic.

## Features

- **"Butter" Spring Physics**: Uses high damping and mass (Stiffness: 280, Damping: 24, Mass: 1.1) to create a satisfying, non-jittery "thud" effect.
- **Latent-Render Text**: Labels reveal only _after_ expansion has started, preventing layout thrashing.
- **Liquid Blobs**: Active backgrounds squash and stretch (scaleX/Y) on entry.
- **Stabilized Typography**: Uses `layout="position"` on text elements to lock their relative coordinates during the parent's expansion, ensuring sub-pixel sharpness.
- **Hard Shadows**: Custom box-shadows for a crisp, sticker-like aesthetic.

## Dependencies

- React 18
- Framer Motion 11
- Tailwind CSS 4 (Browser CDN)
- Lucide React (Icons)
- Nunito Font (Google Fonts)

## Usage

Include `LiquidToonIsland` as your main navigation component. Data is managed via the `items` array. Custom icons use the internal `IconBase` wrapper for consistent 3px stroke widths.
