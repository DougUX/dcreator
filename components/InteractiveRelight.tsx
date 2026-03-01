"use client";

import { useRef, useEffect, useState } from "react";

interface InteractiveRelightProps {
    src: string;
    opacity: 0 | 1;
    variant: "in" | "out";
}

export default function InteractiveRelight({ src, opacity, variant }: InteractiveRelightProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track normalized pointer coordinates (0 to 1) relative to the container
    const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handlePointerMove = (e: MouseEvent) => {
            // Use window center if not hovering the hero/about sections directly, 
            // but here we just listen on the window to make it global and dramatic.
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            // Use requestAnimationFrame for smooth updates
            requestAnimationFrame(() => {
                setPointer({ x, y });
                setIsHovered(true);
            });
        };

        const handlePointerLeave = () => {
            // Optional: return to center or fade out light when mouse leaves window
            setIsHovered(false);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        document.addEventListener("mouseleave", handlePointerLeave);

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("mouseleave", handlePointerLeave);
        };
    }, []);

    const transformIn =
        opacity === 1
            ? "translate3d(0,0,0) scale(1.03) rotateX(0deg) rotateY(0deg)"
            : "translate3d(0, -10px, -80px) scale(1.06) rotateX(2.25deg) rotateY(-2deg)";
    const transformOut =
        opacity === 1
            ? "translate3d(0,0,0) scale(1.03) rotateX(0deg) rotateY(0deg)"
            : "translate3d(0, 10px, -60px) scale(0.985) rotateX(-2deg) rotateY(1.5deg)";
    const t = variant === "in" ? transformIn : transformOut;

    // Convert normalized pointer to percentage for gradients
    const bgX = (pointer.x * 100).toFixed(2);
    const bgY = (pointer.y * 100).toFixed(2);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden"
            style={{
                opacity,
                transform: t,
                transformOrigin: "center",
                backfaceVisibility: "hidden",
                transition:
                    "opacity 960ms cubic-bezier(0.22, 1, 0.36, 1), transform 960ms cubic-bezier(0.22, 1, 0.36, 1)"
            }}
        >
            {/* 1. Base Image Layer (Normal) */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center 30%",
                }}
            />

            {/* 2. Color Dodge Brightening Layer (simulates strong light hitting surfaces) */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-500 ease-out"
                style={{
                    opacity: isHovered ? 0.9 : 0.2,
                    background: `radial-gradient(
            circle at ${bgX}% ${bgY}%, 
            rgba(255, 249, 242, 0.5) 0%, 
            rgba(255, 240, 225, 0.2) 15%, 
            transparent 45%
          )`,
                }}
            />

            {/* 3. Soft Overlay Enhancing Layer (handles midtones and contrast) */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-overlay transition-opacity duration-500 ease-out"
                style={{
                    opacity: isHovered ? 0.8 : 0.3,
                    background: `radial-gradient(
            circle at ${bgX}% ${bgY}%, 
            rgba(255, 250, 245, 0.65) 0%, 
            transparent 50%
          )`,
                }}
            />

            {/* 4. Subtle Vignette / Shadow adjustment responding opposite to the light */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply transition-opacity duration-500 ease-out"
                style={{
                    opacity: isHovered ? 0.6 : 0.2,
                    background: `radial-gradient(
            circle at ${bgX}% ${bgY}%, 
            transparent 25%, 
            rgba(15, 10, 5, 0.4) 100%
          )`,
                }}
            />
        </div>
    );
}
