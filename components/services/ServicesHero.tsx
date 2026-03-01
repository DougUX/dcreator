"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function ServicesHero() {
    const { scrollY } = useScroll();

    // Map scroll position to opacity and blur
    const textOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const blurValue = useTransform(scrollY, [0, 400], [0, 20]);
    const textFilter = useTransform(blurValue, (val) => `blur(${val}px)`);
    return (
        <section className="sticky top-0 z-0 text-white w-full min-h-screen pt-32 pb-16 md:pb-24 flex flex-col justify-between overflow-hidden">
            {/* Full-width Background Image */}
            <Image
                src="/services/whatido.png"
                alt="Product Design"
                fill
                className="object-cover absolute inset-0 z-0"
            />
            {/* Gradient overlays to ensure text readability */}
            <div className="absolute inset-0 bg-black/30 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-[1]" />

            {/* Centered Content Stack */}
            <motion.div
                className="relative z-10 max-w-[1000px] w-full mx-auto flex flex-col items-center justify-center text-center gap-8 md:gap-12 mt-20 mb-auto px-4"
                style={{ opacity: textOpacity, filter: textFilter }}
            >

                {/* Title */}
                <h1 className="rgb-heading-strong text-[15vw] leading-[0.92] sm:text-[96px] lg:text-[110px] xl:text-[128px]">
                    <motion.span
                        initial={{ y: 50, opacity: 0, filter: "blur(20px)" }}
                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                    >
                        What I Do
                    </motion.span>
                </h1>

                {/* Subtitle */}
                <motion.h2
                    initial={{ y: 30, opacity: 0, filter: "blur(20px)" }}
                    whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: false, margin: "-20%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="heading-strategy drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-3xl md:text-5xl lg:text-5xl max-w-3xl leading-snug"
                >
                    Digital and physical product design, crafted with precision.
                </motion.h2>

                {/* Paragraphs */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col gap-6 max-w-2xl px-2"
                >
                    <p className="text-white/95 text-lg md:text-xl font-light leading-relaxed">
                        I design intelligent digital experiences and sculptural physical products that balance strategy, usability and luxury craftsmanship.
                    </p>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed">
                        From enterprise platforms to luxury perfume bottles and rigid presentation boxes, every project is developed with structure, clarity and production awareness.
                    </p>
                </motion.div>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-[50%] -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20"
                style={{ opacity: textOpacity }}
                onClick={() => {
                    window.scrollTo({
                        top: window.innerHeight * 0.8,
                        behavior: "smooth"
                    });
                }}
            >
                <div className="w-[26px] h-[42px] rounded-full border-2 border-white/50 flex justify-center pt-2">
                    <motion.div
                        animate={{
                            y: [0, 10, 0],
                            opacity: [1, 0, 1]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                </div>
            </motion.div>
        </section>
    );
}
