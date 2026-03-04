"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const confidentialProjects = Array.from({ length: 10 }, (_, i) => ({
    id: `0${i + 1}`.slice(-2),
    title: `Project Volume ${i + 1}`,
    category: "Confidential 3D",
    image: "/images/perfume_bottle_3d.png"
}));

export default function ConfidentialGrid() {
    const scrollRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full pb-32 relative">
            {/* Horizontal Scroll Container */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 md:gap-12 px-[10vw] md:px-[25vw] pb-16 pt-8 scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {confidentialProjects.map((item, idx) => (
                    <Link
                        href={`/confidential/project-${item.id}`}
                        key={item.id}
                        className="block group shrink-0 snap-center w-[80vw] sm:w-[50vw] md:w-[400px] lg:w-[450px]"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: idx * 0.05 }}
                            className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] bg-[#050505] shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-700 ease-out group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] border border-white/5"
                        >
                            {/* 3D Bottle Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 mix-blend-lighten"
                            />

                            {/* Security Watermark */}
                            <div className="absolute inset-0 pointer-events-none flex mx-auto items-center justify-center overflow-hidden opacity-5 z-10 w-full">
                                <div className="transform -rotate-90 text-white font-mono text-xl md:text-2xl tracking-[0.5em] whitespace-nowrap select-none mix-blend-overlay">
                                    [ CLASSIFIED ]
                                </div>
                            </div>

                            {/* Subtle Ambient Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 z-20 pointer-events-none" />

                            {/* Project Typography Overlay */}
                            <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-30 pointer-events-none">
                                <div className="flex flex-col gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out items-center text-center">
                                    <span className="bg-white/5 backdrop-blur-xl px-4 py-1.5 rounded-full text-[10px] font-mono text-white/70 border border-white/10 w-fit uppercase tracking-[0.2em]">
                                        {item.category}
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-white/30 text-xs font-light tracking-widest mt-1 uppercase">Click to view sequence</p>
                                </div>
                            </div>

                        </motion.div>
                    </Link>
                ))}
            </div>

            {/* Scroll Indication Fade Edges */}
            <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-40" />
            <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-40" />

            {/* Scroll Hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-50 pointer-events-none">
                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="text-xs uppercase tracking-[0.3em] font-mono">Swipe to explore</span>
                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </div>
    );
}
