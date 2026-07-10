import React, { useEffect, useMemo, useRef } from "react";

const ACCENT = "#39FF14";

const STACK = [
  { name: "Java", src: "/logo/Java.png" },
  { name: "JavaScript", src: "/logo/js.png" },
  { name: "SQL", custom: "sql" },
  { name: "HTML5", src: "/logo/Html5.png" },
  { name: "CSS3", src: "/logo/Css.png" },
  { name: "Tailwind CSS", src: "/logo/tailwind.png" },
  { name: "Next.js", src: "/logo/next.png" },
  { name: "React", src: "/logo/react.png" },
  { name: "Node.js", src: "/logo/node.png" },
  { name: "Express", src: "/logo/express.png" },
  { name: "RestAPI", custom: "api" },
  { name: "MongoDB", src: "/logo/mongodb.svg" },
  { name: "PostgreSQL", src: "/logo/postgreSQL.png" },
  { name: "MySQL", src: "/logo/mysql.svg" },
  { name: "Docker", src: "/logo/docker.svg" },
  { name: "Git", src: "/logo/git.png" },
  { name: "GitHub Actions", src: "/logo/github.png" },
];

// Evenly distribute points on a sphere surface (Fibonacci sphere).
function useSpherePoints(count, radius) {
  return useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5));
    const points = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      points.push({
        x: Math.cos(theta) * r * radius,
        y: y * radius,
        z: Math.sin(theta) * r * radius,
      });
    }
    return points;
  }, [count, radius]);
}

export default function TechSphere({ size = 440, radius = 165 }) {
  const points = useSpherePoints(STACK.length, radius);
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const AUTO_SPEED = 0.12; // deg per frame
    const BASE_TILT = -8;

    const state = {
      rotY: 0,
      fling: 0,
      tiltX: BASE_TILT,
      targetTiltX: BASE_TILT,
      targetTiltY: 0,
      tiltY: 0,
      dragging: false,
      lastX: 0,
      lastMoveTime: 0,
      lastDelta: 0,
    };

    const el = wrapRef.current;
    if (!el) return;

    const onPointerDown = (e) => {
      state.dragging = true;
      state.lastX = e.clientX;
      state.fling = 0;
      el.style.cursor = "grabbing";
    };
    const onPointerMove = (e) => {
      if (state.dragging) {
        const delta = e.clientX - state.lastX;
        state.rotY += delta * 0.35;
        state.lastDelta = delta * 0.35;
        state.lastX = e.clientX;
      }
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      state.targetTiltY = relX * 18;
      state.targetTiltX = BASE_TILT - relY * 14;
    };
    const onPointerUp = () => {
      if (state.dragging) {
        state.fling = state.lastDelta;
      }
      state.dragging = false;
      el.style.cursor = "grab";
    };
    const onPointerLeave = () => {
      state.targetTiltX = BASE_TILT;
      state.targetTiltY = 0;
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerLeave);

    let raf;
    const tick = () => {
      if (!prefersReducedMotion.current) {
        if (!state.dragging) {
          state.rotY += AUTO_SPEED + state.fling;
          state.fling *= 0.94;
          if (Math.abs(state.fling) < 0.001) state.fling = 0;
        }
        state.tiltX += (state.targetTiltX - state.tiltX) * 0.06;
        state.tiltY += (state.targetTiltY - state.tiltY) * 0.06;

        const radY = (state.rotY * Math.PI) / 180;
        const radX = (state.tiltX * Math.PI) / 180;
        const radYt = (state.tiltY * Math.PI) / 180;

        points.forEach((p, i) => {
          const node = nodeRefs.current[i];
          if (!node) return;

          let x = p.x * Math.cos(radY) + p.z * Math.sin(radY);
          let z = -p.x * Math.sin(radY) + p.z * Math.cos(radY);
          let y = p.y;

          const y2 = y * Math.cos(radX) - z * Math.sin(radX);
          const z2 = y * Math.sin(radX) + z * Math.cos(radX);

          const x3 = x * Math.cos(radYt) + z2 * Math.sin(radYt);
          const z3 = -x * Math.sin(radYt) + z2 * Math.cos(radYt);

          const depth = (z3 + radius) / (radius * 2);
          const scale = 0.62 + depth * 0.6;
          const opacity = 0.28 + depth * 0.72;
          const blur = (1 - depth) * 2.2;

          node.style.transform = `translate3d(${x3}px, ${y2}px, ${z3}px) scale(${scale.toFixed(
            3,
          )})`;
          node.style.opacity = opacity.toFixed(2);
          node.style.filter =
            blur > 0.15 ? `blur(${blur.toFixed(2)}px)` : "none";
          node.style.zIndex = Math.round(depth * 1000);
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [points, radius]);

  return (
    <div
      className="ts-wrap"
      style={{ width: size, height: size }}
      ref={wrapRef}
    >
      <div className="ts-glow" />
      <div className="ts-scene">
        {STACK.map((item, i) => (
          <div
            key={item.name}
            className="ts-node"
            ref={(node) => (nodeRefs.current[i] = node)}
          >
            <div className="ts-badge">
              {item.custom === "sql" && (
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  aria-hidden="true"
                >
                  <ellipse
                    cx="12"
                    cy="5.5"
                    rx="8"
                    ry="3"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4 5.5V12c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1.6"
                  />
                  <path
                    d="M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1.6"
                  />
                </svg>
              )}
              {item.custom === "api" && (
                <svg
                  viewBox="0 0 24 24"
                  width="26"
                  height="26"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8.5"
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1.6"
                  />
                  <path
                    d="M8 10.5v3M8 10.5h1.6a1.5 1.5 0 010 3H8M12 10.5v3M12 12h1.4M16 10.5v3l-1-1.5 1-1.5"
                    stroke={ACCENT}
                    strokeWidth="1.3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {item.src && (
                <img src={item.src} alt={item.name} draggable="false" width="28" height="28" decoding="async" />
              )}
              <span className="ts-tooltip">{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .ts-wrap {
    position: relative;
    margin: 0 auto;
    perspective: 1100px;
    cursor: grab;
    touch-action: none;
  }
  .ts-glow {
    position: absolute;
    inset: 10%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(57,255,20,0.14) 0%, rgba(57,255,20,0) 70%);
    pointer-events: none;
    filter: blur(6px);
  }
  .ts-scene {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: ts-float 3s ease-in-out infinite;
  }
  .ts-node {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
    will-change: transform, opacity, filter;
  }
  .ts-badge {
    position: relative;
    width: 56px;
    height: 56px;
    margin-left: -28px;
    margin-top: -28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background: #0c0c0c;
    border: 1px solid rgba(57, 255, 20, 0.18);
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .ts-badge img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }
  .ts-badge:hover {
    border-color: rgba(57, 255, 20, 0.85);
    box-shadow: 0 0 18px rgba(57, 255, 20, 0.35);
  }
  .ts-tooltip {
    position: absolute;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    letter-spacing: 0.02em;
    color: #d6d6d6;
    background: rgba(0, 0, 0, 0.85);
    padding: 3px 8px;
    border-radius: 6px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .ts-badge:hover .ts-tooltip {
    opacity: 1;
  }
  @keyframes ts-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-14px); }
  }
  @media (max-width: 1023px) {
    .ts-wrap { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ts-scene { animation: none; }
  }
`;
