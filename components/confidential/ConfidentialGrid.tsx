"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const confidentialProjects = [
    { id: "01", title: "Luxury Bottle Concept 01", category: "Packaging", image: "/portfolio/Meydan.png" },
    { id: "02", title: "Premium Box Architecture 02", category: "Structural Design", image: "/portfolio/TSODgift.png" },
    { id: "03", title: "Limited Edition Gift Set 03", category: "Concept", image: "/portfolio/Meydan.png" },
    { id: "04", title: "Material Finish Study 04", category: "R&D", image: "/portfolio/TSODgift.png" },
    { id: "05", title: "Sculptural Cap Exploration 05", category: "Industrial Design", image: "/portfolio/Meydan.png" }
];

export default function ConfidentialGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-12 w-full max-w-[1400px] mx-auto pb-32">
            {confidentialProjects.map((item, idx) => (
                <Link href={`/confidential/project-${item.id}`} key={item.id} className="block group">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], delay: idx * 0.1 }}
                        className="relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#111] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-700 ease-out group-hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] group-hover:-translate-y-2"
                    >
                        {/* Image */}
                        <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                        />

                        {/* Security Watermark */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden opacity-5 z-10">
                            <div className="transform -rotate-45 text-white font-mono text-3xl tracking-[0.5em] whitespace-nowrap select-none mix-blend-overlay">
                                CONFIDENTIAL CONFIDENTIAL CONFIDENTIAL
                            </div>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-80 z-20" />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-30">
                            <div className="flex flex-col gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white/80 border border-white/10 w-fit uppercase tracking-widest">
                                    {item.category}
                                </span>
                                <h3 className="text-xl md:text-3xl font-medium text-white shadow-sm">
                                    {item.title}
                                </h3>
                            </div>
                        </div>

                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
