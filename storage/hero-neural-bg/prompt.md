# Master Prompt: Neural Cluster Background

## Objective

Replicate the **Neural Cluster Background** animation with 100% fidelity. This is a premium, scroll-responsive 3D background for hero sections using Three.js with selective bloom post-processing.

## Technical Specifications

- **Renderer**: Three.js WebGL with post-processing pipeline
- **Physics**: Lenis smooth scroll provides velocity for rotation speed
- **Visuals**: 150 glowing spheres with connecting lines + bloom effect
- **Performance**: Instanced meshes, context loss handling, respects reduced motion

## Core Behavior

1. **Scroll-Responsive Rotation**: The neural network rotates faster when the user scrolls
2. **Breathing Pulse**: Subtle scale animation creates a living, organic feel
3. **Selective Bloom**: Only nodes glow, connections remain subtle
4. **Fixed Background**: Canvas stays fixed while content scrolls over it

## Dependencies

```html
<!-- Lenis Smooth Scroll -->
<script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>

<!-- Three.js Import Map (ES Modules) -->
<script type="importmap">
  {
    "imports": {
      "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
    }
  }
</script>
```

## Source Code

The following is the **EXACT** implementation required. The configuration object at the top allows customization.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Neural Cluster Background</title>

    <style>
      /* === REQUIRED CSS === */
      :root {
        --void-dark: #020408;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      html.lenis {
        height: auto;
      }
      .lenis.lenis-smooth {
        scroll-behavior: auto;
      }

      body {
        background-color: var(--void-dark);
        overflow-x: hidden;
      }

      /* Accessibility: Respect reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *,
        ::before,
        ::after {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* WEBGL Container - Fixed behind all content */
      #webgl-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        pointer-events: none;
      }

      /* Your content goes here with z-index: 1+ */
      main {
        position: relative;
        z-index: 2;
      }
    </style>

    <!-- Three.js Import Map -->
    <script type="importmap">
      {
        "imports": {
          "three": "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
          "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/"
        }
      }
    </script>
  </head>
  <body>
    <!-- WEBGL Container -->
    <div id="webgl-container"></div>

    <!-- YOUR PAGE CONTENT GOES HERE -->
    <main>
      <!-- Hero section, features, etc -->
    </main>

    <!-- Lenis Smooth Scroll -->
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>

    <!-- Neural Cluster Animation -->
    <script type="module">
      import * as THREE from "three";
      import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
      import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
      import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
      import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
      import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

      /* ============================================================
         CONFIGURATION - Customize these values
      ============================================================ */
      const CONFIG = {
        // Node Settings
        nodeColor: 0x00f0ff, // Hex color (cyan)
        nodeCount: 150, // Number of spheres (≤400 for performance)
        nodeRadius: 0.1, // Sphere radius
        distributionRadius: 10, // Cluster size

        // Connection Settings
        connectionColor: 0x00f0ff, // Line color
        connectionOpacity: 0.15, // Line opacity (keep subtle)
        connectionDistance: 3.5, // Max distance to connect nodes

        // Bloom (Glow) Settings
        bloomStrength: 0.35, // Glow intensity (0-1)
        bloomRadius: 0.5, // Glow spread

        // Animation Settings
        baseRotationSpeed: 0.001, // Idle rotation speed
        scrollMultiplier: 0.0005, // Scroll velocity effect on rotation
        pulseSpeed: 2, // Breathing speed
        pulseAmount: 0.05, // Scale variation (5%)

        // Camera & Scene
        cameraZ: 25, // Camera distance
        fogDensity: 0.02, // Fog for depth
      };

      /* ============================================================
         LENIS SMOOTH SCROLL
      ============================================================ */
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      /* ============================================================
         THREE.JS SCENE SETUP
      ============================================================ */
      const container = document.getElementById("webgl-container");
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x020408, CONFIG.fogDensity);

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = CONFIG.cameraZ;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ReinhardToneMapping;
      container.appendChild(renderer.domElement);

      // Handle WebGL context loss
      renderer.domElement.addEventListener(
        "webglcontextlost",
        (e) => {
          e.preventDefault();
        },
        false
      );

      /* ============================================================
         SELECTIVE BLOOM POST-PROCESSING
      ============================================================ */
      const BLOOM_LAYER = 1;
      const bloomLayer = new THREE.Layers();
      bloomLayer.set(BLOOM_LAYER);

      const renderScene = new RenderPass(scene, camera);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.5,
        0.4,
        0.85
      );
      bloomPass.threshold = 0;
      bloomPass.strength = CONFIG.bloomStrength;
      bloomPass.radius = CONFIG.bloomRadius;

      const bloomComposer = new EffectComposer(renderer);
      bloomComposer.renderToScreen = false;
      bloomComposer.addPass(renderScene);
      bloomComposer.addPass(bloomPass);

      const finalComposer = new EffectComposer(renderer);
      finalComposer.addPass(renderScene);

      const mixPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            bloomTexture: { value: bloomComposer.renderTarget2.texture },
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D baseTexture;
            uniform sampler2D bloomTexture;
            varying vec2 vUv;
            void main() {
              gl_FragColor = texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv);
            }
          `,
          defines: {},
        }),
        "baseTexture"
      );
      mixPass.needsSwap = true;
      finalComposer.addPass(mixPass);
      finalComposer.addPass(new OutputPass());

      const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });
      const materials = {};

      /* ============================================================
         NEURAL CLUSTER GEOMETRY
      ============================================================ */
      const nodesGeometry = new THREE.InstancedMesh(
        new THREE.SphereGeometry(CONFIG.nodeRadius, 16, 16),
        new THREE.MeshBasicMaterial({ color: CONFIG.nodeColor }),
        CONFIG.nodeCount
      );

      const dummy = new THREE.Object3D();
      const positions = [];

      for (let i = 0; i < CONFIG.nodeCount; i++) {
        const r = CONFIG.distributionRadius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);

        dummy.position.set(x, y, z);
        dummy.updateMatrix();
        nodesGeometry.setMatrixAt(i, dummy.matrix);
        positions.push(new THREE.Vector3(x, y, z));
      }

      nodesGeometry.layers.enable(BLOOM_LAYER);
      scene.add(nodesGeometry);

      // Create connections
      const lineMaterial = new THREE.LineBasicMaterial({
        color: CONFIG.connectionColor,
        transparent: true,
        opacity: CONFIG.connectionOpacity,
        blending: THREE.AdditiveBlending,
      });

      const lineGeo = new THREE.BufferGeometry();
      const linePositions = [];

      for (let i = 0; i < CONFIG.nodeCount; i++) {
        for (let j = i + 1; j < CONFIG.nodeCount; j++) {
          if (
            positions[i].distanceTo(positions[j]) < CONFIG.connectionDistance
          ) {
            linePositions.push(positions[i].x, positions[i].y, positions[i].z);
            linePositions.push(positions[j].x, positions[j].y, positions[j].z);
          }
        }
      }

      lineGeo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      const connections = new THREE.LineSegments(lineGeo, lineMaterial);
      scene.add(connections);

      /* ============================================================
         ANIMATION LOOP - THE CORE MAGIC
      ============================================================ */
      let time = 0;
      let scrollVelocity = 0;

      function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      lenis.on("scroll", (e) => {
        scrollVelocity = e.velocity;
      });

      function render() {
        time += 0.005;

        // SCROLL-RESPONSIVE ROTATION - faster when scrolling
        const rotationSpeed =
          CONFIG.baseRotationSpeed + scrollVelocity * CONFIG.scrollMultiplier;
        nodesGeometry.rotation.y += rotationSpeed;
        connections.rotation.y += rotationSpeed;

        // Breathing pulse
        const scale =
          1 + Math.sin(time * CONFIG.pulseSpeed) * CONFIG.pulseAmount;
        nodesGeometry.scale.set(scale, scale, scale);

        // Selective bloom rendering
        scene.traverse(darkenNonBloomed);
        bloomComposer.render();
        scene.traverse(restoreMaterial);
        finalComposer.render();

        requestAnimationFrame(render);
      }

      function darkenNonBloomed(obj) {
        if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
          materials[obj.uuid] = obj.material;
          obj.material = darkMaterial;
        }
      }

      function restoreMaterial(obj) {
        if (materials[obj.uuid]) {
          obj.material = materials[obj.uuid];
          delete materials[obj.uuid];
        }
      }

      render();

      /* ============================================================
         RESIZE HANDLER
      ============================================================ */
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        bloomComposer.setSize(window.innerWidth, window.innerHeight);
        finalComposer.setSize(window.innerWidth, window.innerHeight);
      });
    </script>
  </body>
</html>
```

## Customization Guide

### Color Schemes

| Theme          | nodeColor  | connectionColor |
| -------------- | ---------- | --------------- |
| Cyan (Default) | `0x00f0ff` | `0x00f0ff`      |
| Green Bio      | `0x00ff9d` | `0x00ff9d`      |
| Purple         | `0x8b5cf6` | `0x8b5cf6`      |
| Gold           | `0xffd700` | `0xffd700`      |
| Red            | `0xff4444` | `0xff4444`      |

### Performance Tuning

- **nodeCount**: Reduce to 100 for mobile, increase to 250 for powerful desktops
- **connectionDistance**: Lower value = fewer connections = better performance

### Animation Feel

- Increase `scrollMultiplier` for more dramatic scroll effect
- Decrease `pulseAmount` for subtler breathing
- Increase `bloomStrength` for more intense glow (max 0.5)

## Integration Instructions

1. Add the `<div id="webgl-container"></div>` as a direct child of `<body>`
2. Ensure your content has `position: relative` and `z-index: 2+`
3. Include Lenis CDN before the Three.js script
4. Add the `importmap` for Three.js modules in the `<head>`
5. Paste the script module at the end of `<body>`
