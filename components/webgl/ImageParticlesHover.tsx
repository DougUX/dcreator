"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React, { useEffect, useMemo, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const update = () => setReduced(mq.matches);
    update();

    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

type ParticlesProps = {
  src: string;
  hover: boolean;
  pointer: { x: number; y: number };
  scroll: number;
  onCount?: (n: number) => void;
};

function ImageParticles({ src, hover, pointer, scroll, onCount }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points | null>(null);

  const [ready, setReady] = useState(false);
  const baseRef = useRef<Float32Array | null>(null);
  const randRef = useRef<Float32Array | null>(null);
  const colRef = useRef<Float32Array | null>(null);
  const countRef = useRef(0);

  const hoverRef = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uSize: { value: 28.0 },
      uGlint: { value: 0.0 },
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const maxW = 360;
      const scale = img.width > 0 ? Math.min(1, maxW / img.width) : 1;
      canvas.width = Math.max(1, Math.floor(img.width * scale));
      canvas.height = Math.max(1, Math.floor(img.height * scale));

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      const positions: number[] = [];
      const colors: number[] = [];
      const rand: number[] = [];

      const step = 1;
      const w = canvas.width;
      const h = canvas.height;
      const aspect = w / h;

      const TARGET_MAX = 12000;
      const approx = (w / step) * (h / step);
      const keepProb = Math.min(1, TARGET_MAX / Math.max(1, approx));

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          if (keepProb < 1 && Math.random() > keepProb) continue;
          const idx = (y * w + x) * 4;
          const r = data[idx] ?? 0;
          const g = data[idx + 1] ?? 0;
          const b = data[idx + 2] ?? 0;
          const a = data[idx + 3] ?? 0;

          if (a < 28) continue;

          const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
          if (lum < 0.02) continue;

          const nx = x / (w - 1);
          const ny = y / (h - 1);

          const px = (nx - 0.5) * 2.0 * aspect;
          const py = (0.5 - ny) * 2.0;

          positions.push(px, py, 0);
          colors.push(r / 255, g / 255, b / 255);

          rand.push(
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1
          );
        }
      }

      // Ambient halo: clone a subset of particles and scatter them outward to match the
      // reference “space dust” around the subject silhouette.
      const baseCount = positions.length / 3;
      const haloCount = Math.min(4500, Math.round(baseCount * 0.45));
      for (let i = 0; i < haloCount; i++) {
        const j = Math.floor(Math.random() * Math.max(1, baseCount));
        const bx = positions[j * 3] ?? 0;
        const by = positions[j * 3 + 1] ?? 0;
        const bz = positions[j * 3 + 2] ?? 0;

        const rx = (Math.random() * 2 - 1) * 1.0;
        const ry = (Math.random() * 2 - 1) * 1.0;
        const rlen = Math.max(0.0001, Math.hypot(rx, ry));
        const ux = rx / rlen;
        const uy = ry / rlen;
        const radius = 0.6 + Math.pow(Math.random(), 0.35) * 2.2;

        positions.push(bx + ux * radius, by + uy * radius, bz + (Math.random() * 0.25 - 0.12));

        const cr = colors[j * 3] ?? 0.9;
        const cg = colors[j * 3 + 1] ?? 0.92;
        const cb = colors[j * 3 + 2] ?? 0.98;
        colors.push(cr * 0.55, cg * 0.72, Math.min(1, cb * 1.35));

        rand.push(
          Math.random() * 2 - 1,
          Math.random() * 2 - 1,
          Math.random() * 2 - 1
        );
      }

      if (positions.length === 0) {
        const cols = 120;
        const rows = Math.max(60, Math.round(cols / Math.max(0.6, aspect)));
        for (let yy = 0; yy < rows; yy++) {
          for (let xx = 0; xx < cols; xx++) {
            const nx = cols <= 1 ? 0.5 : xx / (cols - 1);
            const ny = rows <= 1 ? 0.5 : yy / (rows - 1);

            const px = (nx - 0.5) * 2.0 * aspect;
            const py = (0.5 - ny) * 2.0;

            positions.push(px, py, 0);
            colors.push(0.92, 0.94, 0.98);
            rand.push(
              Math.random() * 2 - 1,
              Math.random() * 2 - 1,
              Math.random() * 2 - 1
            );
          }
        }
      }

      const posArr = new Float32Array(positions);
      const colArr = new Float32Array(colors);
      const randArr = new Float32Array(rand);

      baseRef.current = posArr;
      colRef.current = colArr;
      randRef.current = randArr;
      countRef.current = posArr.length / 3;

      onCount?.(countRef.current);

      setReady(true);
    };

    img.onerror = () => {
      if (cancelled) return;
      onCount?.(0);
      setReady(false);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(0), 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(new Float32Array(0), 3));
    return g;
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (!baseRef.current || !randRef.current || !colRef.current) return;

    geometry.setAttribute("position", new THREE.BufferAttribute(baseRef.current, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colRef.current, 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(randRef.current, 3));
    geometry.computeBoundingSphere();
  }, [geometry, ready]);

  useFrame((_, dt) => {
    uniforms.uTime.value += dt;
    hoverRef.current += ((hover ? 1 : 0) - hoverRef.current) * Math.min(1, dt * 7.5);
    uniforms.uHover.value = hoverRef.current;
    uniforms.uPointer.value.set(pointer.x, pointer.y);
    uniforms.uScroll.value = scroll;
    uniforms.uGlint.value = hoverRef.current;

    if (pointsRef.current) {
      const s = 1.02 + hoverRef.current * 0.04;
      pointsRef.current.scale.set(s, s, 1);
      pointsRef.current.rotation.z = THREE.MathUtils.lerp(
        pointsRef.current.rotation.z,
        hoverRef.current * 0.02,
        Math.min(1, dt * 3.5)
      );
    }
  });

  if (!ready) return null;

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        transparent
        depthWrite={false}
        depthTest={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        uniforms={uniforms}
        vertexShader={
          "\n          attribute vec3 aRand;\n          uniform float uTime;\n          uniform float uHover;\n          uniform vec2 uPointer;\n          uniform float uSize;\n          varying vec3 vColor;\n          varying float vGlint;\n          varying float vMask;\n          varying vec3 vRand;\n          void main() {\n            vColor = color;\n            vRand = aRand;\n            vec3 p = position;\n            float t = uTime * 0.22;\n            vec2 dir = normalize(p.xy - uPointer + 0.0001);\n            float d = length(p.xy - uPointer);\n\n            float edgeNoise = 0.06 * sin((p.x * 6.0 + p.y * 5.0) + t * 1.1 + aRand.x * 6.0);\n            vMask = smoothstep(1.05 + edgeNoise, 0.12, d);\n\n            float burst = uHover * vMask;\n            p.xy += dir * burst * 0.34;\n\n            float rip = sin((p.x * 2.6 + p.y * 3.4) + t * 1.65 + aRand.y * 8.0);\n            p.z += (0.22 * rip) * vMask * uHover;\n            p.xyz += aRand * (0.030 + 0.040 * sin(t + aRand.x * 6.0)) * (0.18 + 0.82 * burst);\n\n            float band = smoothstep(-0.6, 0.6, p.x + 0.20 * sin(t));\n            vGlint = (0.25 + 0.75 * band) * (0.35 + 0.65 * uHover);\n\n            vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);\n            gl_Position = projectionMatrix * mvPosition;\n            float sizeJitter = 0.75 + 0.55 * abs(vRand.z);\n            gl_PointSize = max(6.0, (uSize * sizeJitter) * (1.0 / -mvPosition.z));\n          }\n        "
        }
        fragmentShader={
          "\n          uniform float uTime;\n          uniform float uGlint;\n          uniform float uHover;\n          uniform float uScroll;\n          varying vec3 vColor;\n          varying float vGlint;\n          varying float vMask;\n          varying vec3 vRand;\n          float hash12(vec2 p){\n            vec3 p3 = fract(vec3(p.xyx) * 0.1031);\n            p3 += dot(p3, p3.yzx + 33.33);\n            return fract((p3.x + p3.y) * p3.z);\n          }\n          void main() {\n            vec2 uv = gl_PointCoord.xy - 0.5;\n            float d = length(uv);\n            float soft = smoothstep(0.52, 0.0, d);\n            float core = smoothstep(0.22, 0.0, d);\n\n            float mask = 0.55 + 0.45 * (vMask * uHover);\n\n            float ang = atan(uv.y, uv.x) + vRand.x * 2.4;\n            float facets = 6.0 + floor(3.0 * (vRand.y * 0.5 + 0.5));\n            float seg = floor((ang + 3.14159265) / (6.2831853 / facets));\n            float segAng = seg * (6.2831853 / facets);\n            vec2 fdir = vec2(cos(segAng), sin(segAng));\n            float streak = abs(dot(normalize(uv + 0.0001), fdir));\n            float facetSpec = pow(streak, 44.0) * (0.18 + 0.92 * uHover);\n\n            float n = hash12(gl_FragCoord.xy * 0.35 + uTime * 10.0);\n            float sparkle = smoothstep(0.996, 1.0, n) * (0.10 + 0.20 * uGlint);\n\n            float n2 = hash12(gl_FragCoord.xy * 1.65 + uTime * 18.0 + vRand.xy * 12.0);\n            float micro = smoothstep(0.995, 1.0, n2) * (0.05 + 0.20 * uHover);\n\n            float spec = pow(core, 8.0) * (0.08 + 0.40 * uHover);\n\n            float lum = dot(vColor, vec3(0.2126, 0.7152, 0.0722));\n            vec3 base = mix(vColor, vec3(lum), 0.12);\n            base = mix(base, vec3(0.92, 0.95, 1.0), 0.10);\n\n            float glint = (0.08 + 0.26 * vGlint) * (0.10 + 0.90 * core) + sparkle * 0.26 + micro;\n            vec3 c = base + vec3(glint + spec + facetSpec);\n\n            vec3 prism = vec3(0.92, 0.96, 1.0) + vec3(0.06, 0.03, 0.0) * (vRand.z * 0.5 + 0.5);\n            c = mix(c, prism, 0.14 * (facetSpec + micro));\n\n            float w = smoothstep(0.05, 0.95, clamp(uScroll, 0.0, 1.0));\n            c = mix(c, vec3(1.0), 0.55 * w);\n\n            float aOut = soft * (0.20 + 0.22 * core) * (0.86 + 0.14 * uGlint) * mask;\n            aOut *= (0.50 + 0.50 * w);\n            gl_FragColor = vec4(c, aOut);\n          }\n        "
        }
      />
    </points>
  );
}

type ImageParticlesHoverProps = {
  src: string;
  className?: string;
};

export default function ImageParticlesHover({ src, className }: ImageParticlesHoverProps) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  if (reducedMotion) return null;

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;

      setHover(inside);

      if (!inside) return;

      const nx = ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1;
      const ny = -(((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1);
      pointerRef.current.x = nx * 1.15;
      pointerRef.current.y = ny * 1.15;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const calc = () => {
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = vh + r.height;
      const raw = (vh - r.top) / Math.max(1, total);
      scrollRef.current = Math.max(0, Math.min(1, raw));
    };

    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc);
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={[
        "pointer-events-none absolute inset-0 z-10 transition-opacity duration-300",
        hover ? "opacity-100" : "opacity-0",
        className ?? ""
      ].join(" ")}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 2.4], fov: 42, near: 0.1, far: 20 }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        style={{ width: "100%", height: "100%", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.25} />
        <ImageParticles
          src={src}
          hover={hover}
          pointer={pointerRef.current}
          scroll={scrollRef.current}
        />
      </Canvas>
    </div>
  );
}
