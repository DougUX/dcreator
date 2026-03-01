"use client";

import { motion } from "framer-motion";

export default function AurumStory() {
    return (
        <section className="relative w-full bg-[rgb(var(--aurum-bg))] py-32 sm:py-48">
            {/* Background grain or texture can be applied here using the existing grain.css class if desired */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" />

            <div className="mx-auto max-w-4xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className="mx-auto mb-12 h-16 w-px bg-gradient-to-b from-transparent via-[rgb(var(--aurum-accent))] to-transparent" />

                    <h2 className="heading-strategy mb-8 text-[rgb(var(--aurum-fg))] sm:">
                        Born from legacy. <br />
                        <span className="italic text-[rgb(var(--aurum-accent))]">Crafted for tomorrow.</span>
                    </h2>

                    <p className="mx-auto max-w-2xl text-[rgb(var(--aurum-fg))]/70 sm:">
                        Aurum Reserve is not just a drink; it is a statement. We challenged the conventions of distillation to extract clarity, depth, and unapologetic character.
                        It is the culmination of decades of mastery, reserved exclusively for the nights that define us.
                    </p>

                    <div className="mx-auto mt-16 h-16 w-px bg-gradient-to-b from-[rgb(var(--aurum-accent))] via-transparent to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
