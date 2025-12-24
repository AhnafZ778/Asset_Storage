# Master Prompt: Quantum Navigator

## Objective
Replicate the **Quantum Navigator** cursor effect with 100% fidelity. This is a premium, high-performance cursor strictly for desktop web applications.

## Technical Specifications
*   **Renderer**: Canvas 2D API (alpha enabled)
*   **Physics**: Custom damping for smooth follow with velocity-based deformation.
*   **Performance**: Object pooling for particles (zero GC spikes).
*   **Aesthetics**: Glassmorphism, Neon Glows, and dynamic trails.

## Source Code
The following is the **EXACT** implementation required. Do not modify the core logic or the aesthetic parameters (colors, friction, lag).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NEXUS PRIME | Ultimate Cursor Design System V7.0 BIO-DIGITAL</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link
      href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Rajdhani:wght@400;600;700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --cursor-color: #00f3ff;
        --bg-dark: #050505;
        --panel-bg: #0a0a0a;
        --text-main: #e0e0e0;
        --text-dim: #606060;
        --border-color: #333;
      }

      body {
        background-color: var(--bg-dark);
        color: var(--text-main);
        font-family: "Rajdhani", sans-serif;
        overflow: hidden;
        cursor: none;
      }

      .mono {
        font-family: "JetBrains Mono", monospace;
      }

      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #111;
      }
      ::-webkit-scrollbar-thumb {
        background: #333;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--cursor-color);
      }

      .glass-panel {
        background: rgba(10, 10, 10, 0.85);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .nav-btn {
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
      }

      .nav-btn::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 100%;
        background-color: var(--btn-color, #444);
        transition: all 0.2s ease;
      }

      .nav-btn:hover::before,
      .nav-btn.active::before {
        background-color: var(--active-color, #fff);
        width: 100%;
        opacity: 0.1;
      }

      .nav-btn.active {
        border-left: 2px solid var(--active-color, #fff);
        background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.05) 0%,
          rgba(0, 0, 0, 0) 100%
        );
      }

      .scanline {
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 50%,
          rgba(0, 0, 0, 0.2) 50%,
          rgba(0, 0, 0, 0.2)
        );
        background-size: 100% 4px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        z-index: 10;
        opacity: 0.15;
      }

      /* LIQUID FILTER - Used by Ferro, Argent */
      .canvas-fluid {
        filter: contrast(20) brightness(1.2);
      }

      .spec-header {
        border-bottom: 1px solid var(--border-color);
        padding-bottom: 0.5rem;
        margin-bottom: 1rem;
        color: var(--cursor-color);
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 700;
      }

      .spec-key {
        color: var(--text-dim);
        font-size: 0.85rem;
      }
      .spec-val {
        color: #fff;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.9rem;
      }

      #canvas-layer {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
      }

      .interactive-zone {
        border: 1px dashed #333;
        transition: all 0.3s;
      }
      .interactive-zone:hover {
        border-color: var(--cursor-color);
        background: rgba(255, 255, 255, 0.02);
      }

      .tier-divider {
        font-size: 9px;
        letter-spacing: 3px;
        color: #333;
        padding: 8px 16px;
        border-top: 1px solid #222;
        margin-top: 8px;
      }
    </style>
  </head>
<body class="h-screen flex flex-col bg-[#050505] overflow-hidden cursor-none">

    <canvas id="canvas-layer"></canvas>

    <div style="position:fixed; bottom:20px; left:20px; z-index:100; font-family:'Rajdhani', sans-serif; pointer-events:none;">
        <h1 class="text-3xl font-bold text-white tracking-widest mb-1">QUANTUM NAVIGATOR</h1>
        <div class="text-xs text-gray-500 font-mono">
            FPS: <span id="fps-counter" class="text-white">60</span> | 
            ENTITIES: <span id="particle-counter" class="text-white">0</span> | 
            VELOCITY: <span id="velocity-counter" class="text-white">0</span> |
            DPI: <span id="dpi-display">1x</span>
        </div>
        <div class="mt-2 text-[10px] text-gray-600">PREVIEW MODE</div>
    </div>
    
    <div style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); border:1px dashed #333; padding:40px; border-radius:8px;" class="interactive-zone">
        <button class="bg-white/5 hover:bg-white/10 text-white py-2 px-6 rounded border border-white/5 transition-colors font-mono uppercase text-sm">
            Interactive Target
        </button>
    </div>

    <script>
// --- 1. SHARED PARTICLE POOL ---
      class ParticlePool {
        constructor(size = 1000) {
          this.pool = [];
          this.active = [];
          for (let i = 0; i < size; i++) {
            this.pool.push({
              x: 0,
              y: 0,
              vx: 0,
              vy: 0,
              ax: 0,
              ay: 0,
              life: 0,
              maxLife: 1,
              color: "",
              size: 0,
              type: "",
              angle: 0,
              scaleX: 1,
              scaleY: 1,
              rotation: 0,
              drag: 0.98,
            });
          }
        }

        spawn(config) {
          if (this.pool.length === 0) return null;
          const p = this.pool.pop();
          Object.assign(p, {
            x: config.x || 0,
            y: config.y || 0,
            vx: config.vx || 0,
            vy: config.vy || 0,
            ax: config.ax || 0,
            ay: config.ay || 0,
            life: config.life || 1,
            maxLife: config.life || 1,
            color: config.color || "#fff",
            size: config.size || 3,
            type: config.type || "glow",
            angle: config.angle || 0,
            scaleX: 1,
            scaleY: 1,
            rotation: config.rotation || 0,
            drag: config.drag || 0.98,
          });
          this.active.push(p);
          return p;
        }

        updateAndDraw(ctx, dt, renderer) {
          for (let i = this.active.length - 1; i >= 0; i--) {
            const p = this.active[i];

            // Type-specific physics
            if (p.type === "cohesion") {
              // GRAVITY TOWARDS CURSOR (Argent-Flow)
              const dx = renderer.cursor.x - p.x;
              const dy = renderer.cursor.y - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 5) {
                // Absorbed back into main body
                p.life = 0;
              } else {
                // Attract towards cursor
                const force = 0.15;
                p.vx += (dx / dist) * force;
                p.vy += (dy / dist) * force;
                p.vx *= 0.96; // Drag
                p.vy *= 0.96;
                // Shrink instead of fade
                p.size *= 0.995;
                if (p.size < 1) p.life = 0;
              }
            } else if (p.type === "exhaust") {
              p.size *= 0.97;
              p.vx *= p.drag;
              p.vy *= p.drag;
            } else {
              // Standard decay
              p.life -= dt / p.maxLife;
            }

            p.vx += p.ax * dt;
            p.vy += p.ay * dt;
            p.x += p.vx * (dt * 60);
            p.y += p.vy * (dt * 60);

            if (p.life <= 0 || p.size < 0.5) {
              this.pool.push(p);
              this.active.splice(i, 1);
              continue;
            }

            // Render based on type
            ctx.save();
            ctx.translate(p.x, p.y);

            if (p.type === "cohesion") {
              // White blob for Argent (no alpha fade, just shrink)
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === "glow") {
              ctx.globalCompositeOperation = "lighter";
              ctx.globalAlpha = p.life * 0.7;
              ctx.fillStyle = p.color;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();
            } else if (p.type === "exhaust") {
              ctx.globalCompositeOperation = "lighter";
              ctx.globalAlpha = p.life * 0.9;
              const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
              gradient.addColorStop(0, p.color);
              gradient.addColorStop(0.4, p.color);
              gradient.addColorStop(1, "transparent");
              ctx.fillStyle = gradient;
              ctx.beginPath();
              ctx.arc(0, 0, p.size, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.restore();
          }
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1.0;
        }
      }

      // --- 2. RENDERER ENGINE (GENERIC) ---
      class NexusRenderer {
        constructor() {
          this.canvas = document.getElementById("canvas-layer");
          this.ctx = this.canvas.getContext("2d", { alpha: true });
          this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
          this.cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
          this.velocity = { x: 0, y: 0 };
          this.speed = 0;
          this.angle = 0;

          this.currentProtocolIndex = 0;
          this.pool = new ParticlePool(1000);
          this.history = [];
          this.pulses = [];

          this.hoverState = false;
          this.clickState = false;
          this.clickPulse = 0;

          this.lastTime = performance.now();
          this.time = 0;
          this.oscilloscopeTime = 0; // Shared timer for scope-based effects

          this.init();
        }

        init() {
          this.resize();
          window.addEventListener("resize", () => this.resize());

          document.addEventListener(
            "mousemove",
            (e) => {
              this.mouse.x = e.clientX;
              this.mouse.y = e.clientY;
              const target = e.target;
              this.hoverState =
                target.tagName === "BUTTON" ||
                target.closest("button") ||
                target.classList.contains("interactive-zone");
            },
            { passive: true }
          );

          document.addEventListener("mousedown", () => {
            this.clickState = true;
            this.triggerClickEffect();
          });

          document.addEventListener("mouseup", () => (this.clickState = false));
          this.animate();
        }

        resize() {
          const dpr = window.devicePixelRatio || 1;
          this.canvas.width = window.innerWidth * dpr;
          this.canvas.height = window.innerHeight * dpr;
          this.ctx.scale(dpr, dpr);
          this.canvas.style.width = window.innerWidth + "px";
          this.canvas.style.height = window.innerHeight + "px";
          document.getElementById("dpi-display").innerText = dpr + "x";
        }

        get activeProtocol() {
          return PROTOCOLS[this.currentProtocolIndex];
        }

        setProtocol(index) {
          this.currentProtocolIndex = index;
          // Recycle particles
          this.pool.active.forEach((p) => this.pool.pool.push(p));
          this.pool.active = [];
          this.history = [];
          this.pulses = [];

          const protocol = this.activeProtocol;
          document.documentElement.style.setProperty(
            "--cursor-color",
            protocol.config.color
          );

          // Toggle CSS filter
          if (protocol.id === "ferro" || protocol.id === "argent") {
            this.canvas.classList.add("canvas-fluid");
          } else {
            this.canvas.classList.remove("canvas-fluid");
          }
        }

        damp(target, current, smooth, dt) {
          return current + (target - current) * (1 - Math.exp(-smooth * dt));
        }

        triggerClickEffect() {
          this.clickPulse = 1.0;
          if (this.activeProtocol && this.activeProtocol.triggerClick) {
            this.activeProtocol.triggerClick(this);
          }
        }

        updatePhysics(dt) {
          const protocol = this.activeProtocol;
          if (!protocol) return;

          const smoothness = protocol.config.physics.lag;

          this.cursor.x = this.damp(
            this.mouse.x,
            this.cursor.x,
            smoothness,
            dt
          );
          this.cursor.y = this.damp(
            this.mouse.y,
            this.cursor.y,
            smoothness,
            dt
          );

          const dx = this.mouse.x - this.cursor.x;
          const dy = this.mouse.y - this.cursor.y;

          this.velocity.x = dx;
          this.velocity.y = dy;
          this.speed = Math.sqrt(dx * dx + dy * dy);

          if (this.speed > 1) {
            const targetAngle = Math.atan2(dy, dx);
            let diff = targetAngle - this.angle;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            this.angle += diff * (10 * dt);
          }

          if (this.clickPulse > 0) this.clickPulse -= 5.0 * dt;

          if (Math.random() > 0.8) {
            document.getElementById("velocity-counter").innerText = Math.round(
              this.speed
            );
            document.getElementById("particle-counter").innerText =
              this.pool.active.length;
          }
        }

        animate() {
          const now = performance.now();
          const dt = Math.min((now - this.lastTime) / 1000, 0.1);
          this.lastTime = now;
          this.time += dt;

          this.ctx.clearRect(
            0,
            0,
            this.canvas.width / (window.devicePixelRatio || 1),
            this.canvas.height / (window.devicePixelRatio || 1)
          );

          this.updatePhysics(dt);

          if (this.activeProtocol && this.activeProtocol.render) {
            this.activeProtocol.render(dt, this);
          }

          this.pool.updateAndDraw(this.ctx, dt, this);
          requestAnimationFrame(() => this.animate());
        }
      }

        // --- PROTOCOL REGISTRY ---
        const PROTOCOLS = [];


// 01 // QUANTUM NAVIGATOR
      PROTOCOLS.push({
        id: "quantum",
        name: "QUANTUM NAVIGATOR",
        color: "#00f3ff",
        physics: { lag: 12, friction: 0.92 },
        theme: {
          tech: "Probabilistic Waveform",
          philosophy: "Visualizing the uncertainty principle.",
          context: "UEF FTL Navigation.",
          emotion: "Precision",
        },
        cursor: { dims: "24px", shape: "Split Delta", colors: "#00F3FF" },
        trail: {
          type: "Ribbon",
          mechanics: "Hermite Spline",
          visuals: "Additive Bloom",
        },
        config: { color: "#00f3ff", physics: { lag: 12 } }, // Duplicated for easy access

        triggerClick: function (renderer) {
          // Standard click effect
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            renderer.pool.spawn({
              x: renderer.cursor.x,
              y: renderer.cursor.y,
              vx: Math.cos(angle) * 5,
              vy: Math.sin(angle) * 5,
              life: 1.0,
              color: this.config.color,
              size: 3,
              type: "glow",
            });
          }
        },

        render: function (dt, renderer) {
          const ctx = renderer.ctx;

          // Trail
          renderer.history.push({ x: renderer.cursor.x, y: renderer.cursor.y });
          if (renderer.history.length > 25) renderer.history.shift();

          if (renderer.history.length > 3) {
            ctx.lineCap = "round";
            ctx.globalCompositeOperation = "lighter";
            ctx.beginPath();
            ctx.moveTo(renderer.history[0].x, renderer.history[0].y);
            for (let i = 1; i < renderer.history.length - 1; i++) {
              const xc =
                (renderer.history[i].x + renderer.history[i + 1].x) / 2;
              const yc =
                (renderer.history[i].y + renderer.history[i + 1].y) / 2;
              ctx.quadraticCurveTo(
                renderer.history[i].x,
                renderer.history[i].y,
                xc,
                yc
              );
            }
            ctx.lineTo(
              renderer.history[renderer.history.length - 1].x,
              renderer.history[renderer.history.length - 1].y
            );
            ctx.lineWidth = 8 + renderer.speed * 0.05;
            ctx.strokeStyle = `rgba(0, 243, 255, 0.15)`;
            ctx.stroke();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#00f3ff";
            ctx.globalCompositeOperation = "source-over";
            ctx.stroke();
          }

          // Cursor
          ctx.save();
          ctx.translate(renderer.cursor.x, renderer.cursor.y);
          ctx.rotate(renderer.angle + Math.PI / 2);
          const scale = 1 + renderer.clickPulse * 0.2;
          ctx.scale(scale, scale);

          const drawShape = (ox, oy) => {
            ctx.beginPath();
            ctx.moveTo(0 + ox, -14 + oy);
            ctx.lineTo(9 + ox, 12 + oy);
            ctx.lineTo(0 + ox, 8 + oy);
            ctx.lineTo(-9 + ox, 12 + oy);
            ctx.fill();
          };

          if (renderer.speed > 50) {
            ctx.globalCompositeOperation = "lighter";
            ctx.fillStyle = "#ff0000";
            drawShape(2, 0);
            ctx.fillStyle = "#00ffff";
            drawShape(-2, 0);
          }
          ctx.globalCompositeOperation = "source-over";
          ctx.fillStyle = "#00f3ff";
          drawShape(0, 0);
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(0, 6, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        },
      });

        // --- BOOTSTRAP ---
        const renderer = new NexusRenderer();
        renderer.setProtocol(0);

        let frames = 0, lastLoop = performance.now();
        function loopFPS() {
            const now = performance.now(); frames++;
            if (now - lastLoop >= 1000) { 
                const el = document.getElementById('fps-counter');
                if(el) el.innerText = frames; 
                frames = 0; lastLoop = now; 
            }
            requestAnimationFrame(loopFPS);
        }
        loopFPS();
    </script>
</body>
</html>
```

## Implementation Instructions
1.  Copy the code block above entirely into a single HTML file (e.g., `cursor.html`).
2.  Ensure no external CSS conflicts; the cursor relies on `cursor: none` on the body.
3.  The `NexusRenderer` class manages the canvas context and animation loop automatically.
