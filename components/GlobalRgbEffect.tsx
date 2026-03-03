"use client";

import { useEffect } from "react";

export default function GlobalRgbEffect() {
    useEffect(() => {
        // Check if it's a touch device; skip hover effects if so
        if (typeof window === "undefined" || window.matchMedia?.("(pointer: coarse)")?.matches) {
            return;
        }

        let raf = 0;

        // We maintain a map of active elements to run their physics
        const activeElements = new Map<HTMLElement, {
            currentX: number;
            currentY: number;
            targetX: number;
            targetY: number;
            isHovering: boolean;
        }>();

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const onPointerMove = (e: PointerEvent) => {
            const target = e.target as HTMLElement;
            if (!target || !target.closest) return;

            const el = target.closest<HTMLElement>(".rgb-heading, .rgb-heading-strong, .rgb-menu");

            // Mark previously hovered elements as not hovering if they aren't the current one
            activeElements.forEach((state, key) => {
                if (key !== el) {
                    state.isHovering = false;
                    state.targetX = 0;
                    state.targetY = 0;
                }
            });

            if (el) {
                if (!activeElements.has(el)) {
                    activeElements.set(el, { currentX: 0, currentY: 0, targetX: 0, targetY: 0, isHovering: true });
                }
                const state = activeElements.get(el)!;
                state.isHovering = true;

                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;

                // Normalize cursor position between -1 and 1
                state.targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
                state.targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
            }
        };

        const loop = () => {
            activeElements.forEach((state, el) => {
                state.currentX = lerp(state.currentX, state.targetX, 0.08);
                state.currentY = lerp(state.currentY, state.targetY, 0.08);

                // If it's settled back to 0, remove it from the map to stop updating it
                if (!state.isHovering && Math.abs(state.currentX) < 0.01 && Math.abs(state.currentY) < 0.01) {
                    el.style.textShadow = '';
                    activeElements.delete(el);
                    return;
                }

                // Apply inverse physics
                let redBaseX = -2;
                let blueBaseX = 2;

                // Use a 3x multiplier for big components, 1.5x for smaller menu links
                const multiplier = el.classList.contains('rgb-menu') ? 1.5 : 3;

                // Inverse tracking: The shadow pushes AWAY from the mouse
                // E.g. If currentX is positive (mouse is on the right), redX becomes negative (moves left)
                const redX = redBaseX + (state.currentX * multiplier);
                const redY = state.currentY * (multiplier / 2);

                const blueX = blueBaseX + (state.currentX * -multiplier);
                const blueY = state.currentY * -(multiplier / 2);

                const stretch = Math.hypot(state.currentX, state.currentY);
                const alpha = 0.82 + (stretch * 0.05);
                const blur = stretch * 0.2;

                el.style.textShadow = `
            ${redX.toFixed(2)}px ${redY.toFixed(2)}px ${blur.toFixed(2)}px rgba(255, 0, 0, ${alpha.toFixed(2)}),
            ${blueX.toFixed(2)}px ${blueY.toFixed(2)}px ${blur.toFixed(2)}px rgba(0, 180, 255, ${alpha.toFixed(2)})
        `;
            });

            raf = window.requestAnimationFrame(loop);
        };

        window.addEventListener("pointermove", onPointerMove, { passive: true });
        raf = window.requestAnimationFrame(loop);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
            window.cancelAnimationFrame(raf);
            activeElements.forEach((_, el) => {
                el.style.textShadow = '';
            });
        };
    }, []);

    return null;
}
