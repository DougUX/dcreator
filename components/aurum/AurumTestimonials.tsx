"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "A masterclass in balance. The finish is unbelievably long, with a warmth that completely envelops the palate without overpowering.",
        author: "Elena Vasquez",
        role: "Master Mixologist"
    },
    {
        quote: "We set out to create the singular drink we wanted to celebrate with. After 44 iterations, Aurum Reserve is exactly that.",
        author: "Douglas Creator",
        role: "Founder, Aurum Reserve"
    },
    {
        quote: "It redefines modern luxury in a bottle. Aurum is the only reserve you need on your top shelf this year.",
        author: "Jameson Hayes",
        role: "Lifestyle & Spirits Editor"
    }
];

export default function AurumTestimonials() {
    return (
        <section className="w-full bg-[rgb(var(--aurum-bg))] py-32 border-t border-[rgb(var(--aurum-border))]">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-16 text-center">
                    <h2 className="heading-strategy uppercase tracking-[0.2em] text-[rgb(var(--aurum-accent))]">
                        The Verdict
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {testimonials.map((item, i) => (
                        <motion.div
                            key={item.author}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="mb-8 text-4xl text-[rgb(var(--aurum-accent))]">&quot;</div>
                            <p className="mb-8 flex-1 text-[rgb(var(--aurum-fg))]/80 italic">
                                {item.quote}
                            </p>
                            <div>
                                <div className="font-medium tracking-wide text-[rgb(var(--aurum-fg))]">
                                    {item.author}
                                </div>
                                <div className="text-sm uppercase tracking-widest text-[rgb(var(--aurum-fg))]/50 mt-1">
                                    {item.role}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
