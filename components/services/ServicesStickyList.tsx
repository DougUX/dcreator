"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const services = [
    {
        id: "01",
        title: "Luxury Perfume Bottle Design",
        description: "Sculptural bottle concepts developed with structural logic, proportion control and material precision.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "02",
        title: "Luxury Box & Packaging Architecture",
        description: "Rigid box systems, inserts and presentation structures designed for premium unboxing experiences.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "03",
        title: "Digital Product Design",
        description: "High-end UX and UI for SaaS platforms, AI systems and enterprise environments.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "04",
        title: "Product Strategy",
        description: "Clarity in direction, information architecture and scalable product thinking.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "05",
        title: "Design Systems",
        description: "Component frameworks and token systems built for multi-product ecosystems.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "06",
        title: "AI Experience Design",
        description: "Conversational and workflow-driven AI interfaces designed with structure and usability in mind.",
        bullets: [],
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    },
    {
        id: "07",
        title: "Creative Direction",
        description: "From early concept to production-ready execution — digital and physical.",
        bullets: [],
        image: "/images/luxury_product.png"
    }
];

export default function ServicesStickyList() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

    return (
        <section ref={containerRef} className="relative z-10 bg-black text-white w-full pb-0">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 border-t border-white/10 pt-10">

                {/* Projects List */}
                <div className="flex flex-col relative pb-0">
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            className={`flex flex-col relative pt-6 md:pt-8 border-t border-white/20 bg-black sticky z-10 shadow-[0_-20px_40px_rgba(0,0,0,0.5)] transform-gpu ${i === services.length - 1 ? 'pb-8' : 'pb-24'}`}
                            style={{ top: `calc(4rem + ${i} * 3.5rem)` }}
                        >
                            {/* Full width Heading */}
                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                <h3 className="md: rgb-heading w-[85%]">
                                    {service.title}
                                </h3>
                                <div className="text-white/40 font-mono text-lg md:text-xl pt-1">{service.id}</div>
                            </div>

                            {/* Content Row underneath */}
                            <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                                {/* Left Image Column */}
                                <div className="md:w-[55%] w-full h-[40vh] relative overflow-hidden rounded-xl">
                                    <div className="w-full h-full relative group cursor-none" data-cursor-text="View">
                                        <motion.div
                                            className="w-full h-[140%] -top-[20%] relative"
                                            initial={{ opacity: 0, filter: "blur(10px)" }}
                                            whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                            viewport={{ once: false, amount: 0.3 }}
                                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                            style={{ y: imageY }}
                                        >
                                            <Image
                                                src={service.image.startsWith('/') && !service.image.startsWith('/file:') ? service.image : service.image.replace('/file://', '')}
                                                alt={service.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                            />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Right Text Column */}
                                <div className="md:w-[45%] w-full flex flex-col justify-start pt-2">
                                    <motion.div
                                        initial={{ y: 50, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className="text-lg md:text-xl text-white/70 leading-relaxed font-sans max-w-lg whitespace-pre-line mb-8">
                                            {service.description}
                                        </div>
                                        {service.bullets && service.bullets.length > 0 && (
                                            <ul className="list-disc list-inside flex flex-col gap-3 text-white/50 font-sans text-md md:text-lg">
                                                {service.bullets.map((bullet, idx) => (
                                                    <li key={idx}>{bullet}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
