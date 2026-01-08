# MASTER PROMPT: CHRONO-VISCERA [CELESTIAL 95+]

**Objective:** Create a high-fidelity "Horological Simulation" web component using Three.js, simulating a luxury watch movement deconstructed in a zero-gravity environment.

## 1. Visual Aesthetics ("The Vibe")

- **Theme:** "Swiss Void." High-tech horology meets cosmic horror. Elegant, precise, but slightly sentient.
- **Materials:**
  - **Rose Gold (18k):** High polish, anisotropy (radial brushing), warm reflection.
  - **Synthetic Ruby:** Physical transmission, internal refraction (IOR 1.76), deep red.
  - **Nebula Silk:** A central organic core that replaces the main watch plate. Translucent, iridescent, flowing with GLSL noise.
  - **Sapphire Crystal:** A meniscus lens cap over the assembly. Pure transmission, high gloss.
- **Lighting:** "Rembrandt Studio" setup.
  - Key: Warm (3200K) softbox from top-left.
  - Rim: Cool (6500K) hard light from back-right (creating silhouette).
  - Environment: Procedural noise texturing on the environment map to simulate "micro-scratches" and break up plastic reflections.

## 2. Geometry & Engineering

- **DO NOT use primitives (Box/Cylinder) for gears.**
- **Requirements:**
  - **Involute Gear Profile:** Custom `THREE.Shape` with proper tooth taper and involute curve.
  - **Beveled Extrusion:** Gears must have bevels (`bevelEnabled: true`) to catch light highlights.
  - **Jewel Bearings:** Modeled "Cup" shape (Torus bezel + shaped Ruby center).

## 3. Motion Mechanics ("The Beat")

- **Escapement Logic:** The animation must NOT be linear.
- **120 BPM:** Simulate a mechanical heartbeat (2 beats/sec).
- **Elastic Snap:** Use an inertial equation for movement: `Tick -> Overshoot -> Snapback`.
  - Math: `sin(t * PI * 5) * decay`.
- **Scroll Interaction:**
  - **Deconstruction:** Scrolling expands the Z-axis space between gears ("Exploded View").
  - **Fluid Drag:** Use Lerp with low friction (`0.05`) for a heavy, oily feel.

## 4. Technical Stack

- **Engine:** Three.js (Module version).
- **Post-Processing:**
  - **FXAA:** Essential for crisp metal edges.
  - **UnrealBloom:** Soft, threshold `0.2`, radius `1.0`.
  - **Chromatic Aberration:** Subtle lens dispersion on edges.
  - **Lenis:** For smooth DOM-to-WebGL scroll sync.

## 5. Shader Implementation (Nebula)

Inject the following logic into `MeshPhysicalMaterial`:

- **Vertex:** Simplex noise displacement (`snoise`) driven by time.
- **Fragment:** Emissive pulse based on noise peaks (`smoothstep`).

## Output

A single HTML file containing:

1.  Import map for Three.js.
2.  CSS for "Cinematic" UI overlay (Inter/Courier font).
3.  Full Module script with Scene, Camera, Composers, and Animation Loop.
