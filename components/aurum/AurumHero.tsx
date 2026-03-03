"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedButton from "@/components/AnimatedButton";
import { useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";

// Configuration for the image sequence
const FRAME_COUNT = 150;
const FRAME_DIGITS = 3;
const FRAME_EXT = "jpg"; // Assuming jpg, can be updated by user
const FRAME_PREFIX = "frame_";
const DIR_PATH = "/images/hero_frames/";

export default function AurumHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Make the container tall so scrolling takes time (luxurious feel)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    if (prefersReducedMotion) return;

    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(FRAME_DIGITS, "0");
      img.src = `${DIR_PATH}${FRAME_PREFIX}${paddedIndex}.${FRAME_EXT}`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        // If we have loaded enough frames, we can start rendering.
        // We set images only when all are loaded to ensure smooth playback,
        // but for a real production site you might progressive-load.
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
        }
      };

      // Still push it to preserve order
      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [prefersReducedMotion]);

  // Helper to draw a specific frame
  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0 || prefersReducedMotion) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const img = images[Math.floor(index)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvas = canvasRef.current;

    // Set internal canvas resolution to match natural image aspect relative to screen
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Update canvas size if it doesn't match
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    // "cover" sizing
    const ratio = Math.max(rect.width / img.width, rect.height / img.height);
    const drawWidth = img.width * ratio;
    const drawHeight = img.height * ratio;
    const x = (rect.width - drawWidth) / 2;
    const y = (rect.height - drawHeight) / 2;

    ctx.clearRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Update canvas on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    requestAnimationFrame(() => drawFrame(latest));
  });

  // Initial draw and handle window resize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (images.length === 0 || prefersReducedMotion) return;

    const handleResize = () => {
      requestAnimationFrame(() => drawFrame(frameIndex.get()));
    };

    window.addEventListener("resize", handleResize);
    // Draw initial frame
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images, prefersReducedMotion]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-[rgb(var(--aurum-bg))]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {prefersReducedMotion ? (
          <div className="absolute inset-0 z-0">
            {/* Fallback image for reduced motion */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${DIR_PATH}${FRAME_PREFIX}${"1".padStart(FRAME_DIGITS, "0")}.${FRAME_EXT}`}
              alt="Aurum Reserve Premium Drink"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            aria-hidden="true"
          />
        )}

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 z-10 bg-black/40" />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="rgb-heading-strong text-[12vw] sm:text-[10vw] leading-[0.85] tracking-tighter font-black uppercase inline-block text-white/95">
            Aurum Reserve
          </h1>
          <p className="mb-10 max-w-xl text-[rgb(var(--aurum-fg))]/80 sm:">
            A masterclass in craft. Experience the explosive, uncompromising taste of our small-batch premium reserve.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <AnimatedButton variant="primary" className="uppercase !text-[#101010] !bg-[#baccb0] group-hover:!bg-white group-hover:!text-black">
              Discover the Reserve
            </AnimatedButton>
            <AnimatedButton variant="secondary" className="uppercase !border-[#baccb0] !text-[#baccb0]">
              Watch Film
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}
