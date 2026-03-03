"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const FRAME_COUNT = 150;
const FRAME_PREFIX = "/services/expertise/ezgif-frame-";
const FRAME_SUFFIX = ".jpg";

export default function ServicesHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);

    // Give the user a lot of scrolling room to scrub all 150 frames slowly
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Smooth the scrub slightly so it's not perfectly raw
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll exactly to frame indices (0 to 149)
    const currentFrameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images intelligent logic
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            // Pad index with zeros (e.g. 001, 045, 150)
            const indexStr = i.toString().padStart(3, "0");
            img.src = `${FRAME_PREFIX}${indexStr}${FRAME_SUFFIX}`;

            img.onload = () => {
                loadedCount++;
                setImagesLoaded(loadedCount);
            };

            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, []);

    // Draw the correct frame to the canvas whenever scrolling changes
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx || images.length !== FRAME_COUNT) return;

        const updateCanvas = (latestFrame: number) => {
            const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(latestFrame)));
            const img = images[frameIndex];

            if (img && img.complete) {
                // Resize canvas to match window while maintaining aspect ratio
                const { innerWidth: width, innerHeight: height } = window;
                canvas.width = width;
                canvas.height = height;

                // Calculate cover math manually for canvas
                const imgRatio = img.width / img.height;
                const canvasRatio = width / height;

                let drawWidth = width;
                let drawHeight = height;
                let offsetX = 0;
                let offsetY = 0;

                if (canvasRatio > imgRatio) {
                    drawHeight = width / imgRatio;
                    offsetY = (height - drawHeight) / 2;
                } else {
                    drawWidth = height * imgRatio;
                    offsetX = (width - drawWidth) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }
        };

        // Hook into Framer Motion's update loop
        const unsubscribe = currentFrameIndex.on("change", updateCanvas);

        // Initial drawing if first image is ready immediately
        if (images[0]?.complete) {
            updateCanvas(0);
        } else {
            // Wait for first image specifically if it hasn't loaded
            images[0]?.addEventListener('load', () => updateCanvas(0), { once: true });
        }

        return () => unsubscribe();
    }, [currentFrameIndex, images]);


    // TEXT CHOREOGRAPHY: Map specific scrolling chunks to opacity fades for different text blocks

    // Block 1: "What I Do" (0% to 20%)
    const titleOpacity = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [1, 1, 0, 0]);
    const titleY = useTransform(smoothProgress, [0, 0.1, 0.2, 0.25], [0, 0, -50, -50]);
    const titleBlur = useTransform(smoothProgress, [0, 0.15, 0.25], [0, 0, 20]);

    // Block 2: Subtitle (20% to 45%)
    const subtitleOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
    const subtitleY = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [50, 0, 0, -50]);

    // Block 3: Paragraph 1 (40% to 70%)
    const p1Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.6, 0.7], [0, 1, 1, 0]);
    const p1Y = useTransform(smoothProgress, [0.35, 0.45, 0.6, 0.7], [50, 0, 0, -50]);

    // Block 4: Paragraph 2 (65% to 95%)
    const p2Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0.5]); // Leave final block somewhat visible at end
    const p2Y = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [50, 0, 0, -20]);

    return (
        <section ref={sectionRef} className="relative h-[200vh] bg-black">

            {/* Sticky Container - locks to viewport while scrolling the 200vh */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 1. Cinematic Scrub Canvas */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />

                {/* 2. Loading Indicator (Optional, subtle) */}
                {imagesLoaded < FRAME_COUNT && (
                    <div className="absolute top-4 right-4 z-50 text-white/30 text-xs font-mono">
                        Loading sequence... {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
                    </div>
                )}

                {/* 3. Gradient Voids for Readability */}
                <div className="absolute inset-0 bg-black/40 z-[1]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-[1]" />

                {/* 4. Choreographed Text Blocks */}
                <div className="relative z-10 w-full max-w-[1000px] px-4 mx-auto flex flex-col items-center text-center -translate-y-[150px]">

                    {/* Block 1 */}
                    <motion.h1
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rgb-heading rgb-heading-strong text-[10vw] sm:text-[8vw] lg:text-[7vw] leading-[0.85] tracking-tighter font-black uppercase text-white/95 w-full"
                        style={{
                            opacity: titleOpacity,
                            y: titleY,
                            filter: useTransform(titleBlur, val => `blur(${val}px)`)
                        }}
                    >
                        What I Do
                    </motion.h1>

                    {/* Block 2 */}
                    <motion.h2
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 heading-strategy drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-4xl md:text-6xl lg:text-7xl font-bold max-w-4xl leading-tight text-white w-full"
                        style={{ opacity: subtitleOpacity, y: subtitleY }}
                    >
                        Digital and physical product design, crafted with precision.
                    </motion.h2>

                    {/* Block 3 */}
                    <motion.p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/95 text-2xl md:text-4xl lg:text-5xl font-medium leading-normal max-w-4xl px-4 w-full"
                        style={{ opacity: p1Opacity, y: p1Y }}
                    >
                        I design intelligent digital experiences and sculptural physical products that balance strategy, usability and luxury craftsmanship.
                    </motion.p>

                    {/* Block 4 */}
                    <motion.p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90 text-xl md:text-3xl lg:text-4xl font-medium leading-normal max-w-4xl px-4 w-full"
                        style={{ opacity: p2Opacity, y: p2Y }}
                    >
                        From enterprise platforms to luxury perfume bottles and rigid presentation boxes, every project is developed with structure, clarity and production awareness.
                    </motion.p>
                </div>

                {/* Scroll Down Indicator (Fades out as soon as they start scrolling) */}
                <motion.div
                    style={{ opacity: titleOpacity }}
                    className="absolute bottom-8 left-[50%] -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                >
                    <div className="w-[26px] h-[42px] rounded-full border-2 border-white/50 flex justify-center pt-2">
                        <motion.div
                            animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
