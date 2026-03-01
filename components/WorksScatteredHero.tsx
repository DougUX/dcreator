"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { featuredWork } from "./data";

export default function WorksScatteredHero() {
    const containerRef = useRef<HTMLElement>(null);

    // Track scroll progress within this 300vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Outer spin rotation mapping
    const rotateTransform = useTransform(scrollYProgress, [0, 1], [0, 180]);

    // Scale up slightly as user scrolls down
    const scaleTransform = useTransform(scrollYProgress, [0, 1], [0.8, 1.4]);

    // Subtitle sequential reveal
    const opacity1 = useTransform(scrollYProgress, [0.05, 0.10], [0, 1]);
    const y1 = useTransform(scrollYProgress, [0.05, 0.10], [15, 0]);

    const opacity2 = useTransform(scrollYProgress, [0.10, 0.15], [0, 1]);
    const y2 = useTransform(scrollYProgress, [0.10, 0.15], [15, 0]);

    const opacity3 = useTransform(scrollYProgress, [0.15, 0.20], [0, 1]);
    const y3 = useTransform(scrollYProgress, [0.15, 0.20], [15, 0]);

    const opacity4 = useTransform(scrollYProgress, [0.20, 0.25], [0, 1]);
    const y4 = useTransform(scrollYProgress, [0.20, 0.25], [15, 0]);

    // Duplicate the works array to have enough density for a full outer space ring
    const extendedWorks = [...featuredWork, ...featuredWork];

    // Pre-calculated scattered positions (radius and angle) for the 12 items
    // These values create a somewhat chaotic but evenly distributed ring
    const placements = [
        { angle: 0, radius: 45, size: 280 },
        { angle: 30, radius: 65, size: 200 },
        { angle: 60, radius: 40, size: 320 },
        { angle: 90, radius: 55, size: 240 },
        { angle: 120, radius: 48, size: 280 },
        { angle: 150, radius: 60, size: 220 },
        { angle: 180, radius: 42, size: 300 },
        { angle: 210, radius: 58, size: 240 },
        { angle: 240, radius: 45, size: 260 },
        { angle: 270, radius: 62, size: 200 },
        { angle: 300, radius: 40, size: 340 },
        { angle: 330, radius: 55, size: 220 },
    ];

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[#080808] w-full">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Central Title */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto">
                    <h2 className="rgb-heading rgb-heading-strong text-[14vw] leading-[0.9] font-medium tracking-tight text-white mb-6 lg:text-[120px]"
                        style={{ filter: "drop-shadow(0 2px 24px rgba(0,0,0,0.55)) drop-shadow(0 1px 2px rgba(0,0,0,0.65))" }}
                    >
                        My Work
                    </h2>
                    <div className="text-lg md:text-[22px] text-white/80 font-light flex flex-col items-center">
                        <motion.p style={{ opacity: opacity1, y: y1 }}>A curated selection of digital platforms,</motion.p>
                        <motion.p style={{ opacity: opacity2, y: y2 }}>luxury perfume bottles and packaging systems.</motion.p>
                        <motion.p style={{ opacity: opacity3, y: y3 }} className="mt-4 text-white/60">Each project reflects precision, structure and intentional design,</motion.p>
                        <motion.p style={{ opacity: opacity4, y: y4 }} className="text-white/60">built to perform, built to last.</motion.p>
                    </div>
                </div>

                {/* Rotating scattered image container */}
                <motion.div
                    className="absolute inset-0 z-10 hidden md:flex items-center justify-center opacity-70"
                    style={{
                        rotate: rotateTransform,
                        scale: scaleTransform
                    }}
                >
                    {extendedWorks.map((item, idx) => {
                        const placement = placements[idx % placements.length];
                        // Convert polar to cartesian coordinates essentially
                        // using standard CSS translates combined with rotate

                        return (
                            <motion.div
                                key={`${item.title}-${idx}`}
                                className="absolute"
                                style={{
                                    // Rotate the element outward by its placement angle
                                    transform: `rotate(${placement.angle}deg) translateY(-${placement.radius}vh)`,
                                }}
                            >
                                {/* We reverse the rotation on the inner image wrapper so the image stays upright 
                                    or tilts slightly naturally instead of being upside down */}
                                <div
                                    className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#111]"
                                    style={{
                                        width: `${placement.size}px`,
                                        height: `${placement.size * 0.65}px`,
                                        transform: `rotate(-${placement.angle}deg) rotate(${(idx * 15) % 45 - 20}deg)`
                                    }}
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    {/* Optional overlay to darken items slightly */}
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Fallback for mobile devices to just show a smaller simpler version without intense 3D math that might lag */}
                <motion.div
                    className="absolute inset-0 z-10 flex md:hidden items-center justify-center opacity-40"
                    style={{ rotate: rotateTransform }}
                >
                    {extendedWorks.slice(0, 6).map((item, idx) => {
                        const placement = placements[idx * 2];
                        return (
                            <motion.div
                                key={`mobile-${idx}`}
                                className="absolute"
                                style={{
                                    transform: `rotate(${placement.angle}deg) translateY(-35vh)`,
                                }}
                            >
                                <div
                                    className="relative rounded-xl overflow-hidden shadow-xl"
                                    style={{
                                        width: `180px`,
                                        height: `120px`,
                                        transform: `rotate(-${placement.angle}deg)`
                                    }}
                                >
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Mouse Scroll Hint Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    <div className="w-[30px] h-[46px] rounded-full border-2 border-white/30 flex justify-center p-1.5">
                        <motion.div
                            className="w-1.5 h-3 bg-white/70 rounded-full"
                            animate={{
                                y: [0, 12, 0],
                                opacity: [1, 0.5, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
                </motion.div>

            </div>
        </section>
    );
}
