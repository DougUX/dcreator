"use client";

import { motion } from "framer-motion";

const clients = [
    "Bentley Systems",
    "BCG (Boston Consulting Group)",
    "Canon",
    "Viasat",
    "Inmarsat",
    "British Telecom",
    "The Spirit of Dubai Perfumes",
    "Nabeel Perfumes",
    "Route Bleue Perfumes",
    "Chris Adams Perfumes",
    "and more..."
];

export default function ServicesClientList() {
    return (
        <section className="relative z-40 bg-black text-white w-full py-32 px-4 md:px-8 border-t border-white/10">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-16 item-start">

                {/* Left Side - Title */}
                <div className="md:w-1/3 space-y-4 sticky top-32 self-start">
                    <h2 className="heading-strategy lg:text-5xl text-white">
                        Brands I've worked with
                    </h2>
                </div>

                {/* Right Side - Client List */}
                <div className="md:w-2/3 flex flex-col">
                    {clients.map((client, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="group border-b border-white/20 py-8 flex items-center hover:border-white transition-colors duration-300 cursor-default"
                        >
                            <span className="font-sans font-light text-3xl md:text-4xl lg:text-5xl group-hover:-translate-x-4 transition-transform duration-300">
                                {client}
                            </span>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
