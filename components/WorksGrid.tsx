"use client";

import Container from "./Container";
import { featuredWork } from "./data";
import Image from "next/image";
import ScrollVideo from "./ScrollVideo";
import { motion } from "framer-motion";
import AnimatedButton from "./AnimatedButton";

export default function WorksGrid() {
    return (
        <section className="bg-[#080808] py-24 sm:py-32 min-h-screen text-white">
            <Container>
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-6 text-white/90">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight">Our Work</h1>
                    </div>

                    <div className="text-lg pb-2 flex gap-6 z-10">
                        <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">All</span>
                        <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Design</span>
                        <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity">Development</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {featuredWork.map((item, idx) => {
                        const isRightColumn = idx % 2 !== 0;

                        return (
                            <motion.a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                key={item.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className={`group relative block overflow-hidden rounded-[2rem] bg-[#111] ${isRightColumn ? "md:mt-24 lg:mt-32" : ""
                                    }`}
                                style={{ aspectRatio: "4/5" }}
                            >
                                {/* Image or Video */}
                                <div className="absolute inset-0 w-full h-full overflow-hidden">
                                    {item.image.endsWith(".mp4") ? (
                                        <ScrollVideo
                                            src={item.image}
                                            className="absolute inset-0 w-full h-full transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                    ) : (
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                {/* Gradient Overlay for Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                                    <div className="flex items-end justify-between w-full">
                                        {/* Title */}
                                        <div className="text-2xl md:text-4xl font-medium text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            {item.title}
                                        </div>

                                        {/* Tag */}
                                        <div className="flex items-center">
                                            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium text-white/90 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 border border-white/10">
                                                {item.meta}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>

                {/* Confidential Collection Call to Action */}
                <div className="mt-32 md:mt-48 mb-16 flex flex-col items-center text-center max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8">Confidential Collection</h2>
                    <p className="text-lg md:text-xl text-white/80 mb-4 leading-relaxed tracking-wide font-light max-w-2xl">
                        Access a curated selection of beautiful and confidential designs, shared exclusively for approved viewers.
                    </p>
                    <p className="text-sm md:text-base text-white/50 mb-12 max-w-2xl leading-relaxed">
                        Viewing access is granted on the condition that the designs remain strictly confidential and are not copied, reproduced, or distributed in any form.
                    </p>
                    <AnimatedButton href="/contact" variant="primary">
                        Request Access
                    </AnimatedButton>
                </div>

            </Container>
        </section>
    );
}
