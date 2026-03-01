"use client";

import { motion } from "framer-motion";

const offers = [
    "Luxury Perfume Bottle Design",
    "Luxury Box & Packaging Architecture",
    "Digital Product Design",
    "Product Strategy",
    "Design Systems",
    "AI Experience Design",
    "Creative Direction"
];

export default function ServicesOfferRotator() {
    return (
        <section className="relative z-20 bg-black text-white w-full py-32 overflow-hidden">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 flex flex-col items-center">

                <div className="w-full flex-col mb-16">
                    <div className="w-full flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="w-8 h-8 flex justify-center items-center text-white"
                            >
                                ✦
                            </motion.div>
                            <h2 className="heading-strategy md: text-white">What I Offer</h2>
                        </div>
                        <span className="font-sans text-2xl text-white/50">(02)</span>
                    </div>

                    <div className="w-full flex justify-start pl-12">
                        <p className="text-white/70 text-lg md:text-xl font-light max-w-xl">
                            A focused range of capabilities across digital systems and physical product design.
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-[20vh]" style={{ perspective: 1200 }}>
                    {offers.map((offer, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0.1, scale: 0.8, filter: "blur(12px)", rotateX: 60, y: 60 }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", rotateX: 0, y: 0 }}
                            viewport={{ margin: "-35% 0px -35% 0px" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="py-6 w-full text-center origin-center"
                        >
                            <h3 className="text-[10vw] leading-[0.92] sm:text-[72px] lg:text-[96px] xl:text-[110px] font-[800] tracking-[-0.02em] text-white/80 cursor-default hover:text-white transition-colors duration-300">
                                {offer}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
