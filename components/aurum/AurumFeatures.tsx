"use client";

import { motion } from "framer-motion";

const features = [
    {
        title: "Small-Batch Craft",
        description: "Distilled in limited reserves to ensure absolute perfection in every drop. Zero compromises."
    },
    {
        title: "Premium Ingredients",
        description: "Sourced globally, selected locally. Hand-picked botanicals and the finest grains."
    },
    {
        title: "Taste Notes",
        description: "A cascade of smoked oak, toasted vanilla, and an undeniable undertone of dark cherry."
    },
    {
        title: "Signature Finish",
        description: "An impossibly smooth, lingering finish that redefines the luxury standard."
    }
];

export default function AurumFeatures() {
    return (
        <section className="relative w-full bg-[rgb(var(--aurum-bg))] py-32 sm:py-48">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 text-center"
                >
                    <h2 className="heading-strategy mb-4 uppercase tracking-[0.2em] text-[rgb(var(--aurum-accent))]">
                        The Anatomy of Perfection
                    </h2>
                    <p className="mx-auto max-w-3xl text-[rgb(var(--aurum-fg))] sm:">
                        meticulously engineered for those who demand the extraordinary.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                            className="group relative border-t border-[rgb(var(--aurum-border))] pt-8"
                        >
                            <h3 className="mb-4 text-[rgb(var(--aurum-fg))]">
                                {feature.title}
                            </h3>
                            <p className="text-[rgb(var(--aurum-fg))]/70">
                                {feature.description}
                            </p>

                            <div className="mt-8 h-1 w-0 bg-[rgb(var(--aurum-accent))] transition-all duration-500 ease-out group-hover:w-16" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
