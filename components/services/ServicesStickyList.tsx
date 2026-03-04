"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const services = [
    {
        id: "01",
        title: "Luxury Perfume Bottle Design",
        description: "More than a bottle — a complete fragrance vision.",
        text: "I design aesthetic perfume bottles with structural intelligence and production awareness. But the work goes beyond form. I shape the entire product ecosystem.",
        list: [
            "Bottle concept and silhouette development",
            "Cap, collar and spray engineering logic",
            "Glass thickness, weight balance and proportion control",
            "Material and finish direction",
            "Brand naming and positioning",
            "Visual identity and brand guidelines",
            "Prototype development (3D print / sample refinement)",
            "Collaboration with experienced perfumers (40+ years expertise) to shape scent direction if required",
            "Manufacturer-ready technical drawings and production files"
        ],
        footer: "From first sketch to shelf presence — every element is intentional.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
        )
    },
    {
        id: "02",
        title: "Luxury Box & Packaging Architecture",
        description: "Packaging that protects, presents and elevates.",
        text: "I design rigid box systems and structural packaging that enhance the unboxing experience while remaining production-ready.",
        list: [
            "Rigid box structure design",
            "Internal bottle support systems",
            "Insert architecture and cushioning logic",
            "Magnetic closures and hinge mechanisms",
            "Material selection and finish specification",
            "Foil, emboss, deboss and print direction",
            "Limited edition presentation concepts",
            "Supplier coordination and dieline documentation"
        ],
        footer: "The box is not an accessory — it is part of the object.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        )
    },
    {
        id: "03",
        title: "Digital Product Design",
        description: "Prooven experiance with High-performance digital systems.",
        text: "I design structured UX and refined interfaces for enterprise platforms, SaaS environments and AI-driven products.",
        list: [
            "UX strategy and interaction design",
            "High-fidelity interface systems",
            "Responsive web and mobile experiences",
            "Dashboard and data visualisation design",
            "Accessibility and usability refinement",
            "Developer-ready design specifications"
        ],
        footer: "Designed to scale. Built to perform.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
        )
    },
    {
        id: "04",
        title: "Product Strategy",
        description: "Direction before design.",
        text: "Clear product thinking that aligns business objectives with user needs and long-term scalability.",
        list: [
            "Product positioning and differentiation",
            "Information architecture",
            "User journey mapping",
            "Feature prioritisation",
            "Cross-functional alignment",
            "Roadmap contribution"
        ],
        footer: "Structure creates confidence.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>
        )
    },
    {
        id: "05",
        title: "Design Systems",
        description: "Consistency at scale.",
        text: "I architect scalable design systems that support multi-product ecosystems and reduce complexity.",
        list: [
            "Component library architecture",
            "Design tokens and variable systems",
            "Documentation frameworks",
            "Governance models",
            "System migration and consolidation"
        ],
        footer: "Built for longevity, not trends.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
        )
    },
    {
        id: "06",
        title: "AI Experience Design",
        description: "Intelligent interaction, made usable.",
        text: "I design conversational and workflow-driven AI interfaces that feel structured and purposeful.",
        list: [
            "Conversational UX frameworks",
            "Prompt architecture and flow logic",
            "AI workflow integration",
            "Human-in-the-loop design",
            "Intelligent automation interfaces"
        ],
        footer: "Clarity in complexity.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
        )
    },
    {
        id: "07",
        title: "Creative Direction",
        description: "From concept to execution.",
        text: "Strategic oversight combined with hands-on design leadership across digital and physical products.",
        list: [
            "Concept development and vision setting",
            "Brand coherence across touchpoints",
            "Prototype to production supervision",
            "Stakeholder communication",
            "Launch readiness and refinement"
        ],
        footer: "Ideas shaped with discipline.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-white/70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457c-.341.362-.5.846-.5 1.343v10.95c0 .333.27.6.6.6h11.894c.498 0 .98-.16 1.343-.5L21 19.894a2.25 2.25 0 0 0 .659-1.591V5.25a2.25 2.25 0 0 0-2.25-2.25H9.75a2.25 2.25 0 0 0-1.293.457Z" />
            </svg>
        )
    }
];

function ServiceCard({ service, i, isLast }: { service: typeof services[0], i: number, isLast: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);

    // Provide sticky margins so the tabs stack exactly underneath each other
    // 6rem = 96px for the first one, then padded by i * 80px for each stacked tab underneath it.
    const stickyTopPixels = 96 + i * 80;

    // Track scroll specifically for THIS card.
    // 0 = The top of the card has just hit its sticky resting place.
    // 1 = The user has scrolled 300px *past* it being stuck.
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: [`start ${stickyTopPixels}px`, `start ${stickyTopPixels - 300}px`]
    });

    // Animate based on the scroll progress *after* it gets stuck:
    // Shrink the icon, title, and ID from 100% to 65% as the user scrolls past it
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

    // Dim the title/icon tabs that are stacked
    const headerOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

    const handleExpand = () => {
        if (!cardRef.current || !cardRef.current.offsetParent) return;
        const parent = cardRef.current.offsetParent as HTMLElement;
        const parentNodeRect = parent.getBoundingClientRect();
        const parentAbsY = window.scrollY + parentNodeRect.top;
        const cardOriginY = cardRef.current.offsetTop;
        const effectiveStickyTop = window.innerWidth < 768 ? 72 : stickyTopPixels;
        const targetScroll = parentAbsY + cardOriginY - effectiveStickyTop;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth"
        });
    };

    return (
        <div
            ref={cardRef}
            onClick={handleExpand}
            className={`group cursor-pointer flex flex-col relative pt-0 md:pt-8 pb-24 md:pb-32 border-t border-white/20 bg-black md:sticky shadow-[0_-20px_40px_rgba(0,0,0,0.5)] transform-gpu ${isLast ? 'pb-16' : ''} md:top-[var(--card-top)]`}
            style={{
                '--card-top': `${stickyTopPixels}px`,
                zIndex: i,
            } as any}
        >
            {/* Grid Layout Container (Added md:gap-x-12 to prevent title/paragraph collisions) */}
            <div className="flex flex-col md:grid md:grid-cols-12 items-start w-full px-4 md:px-8 md:gap-x-8 lg:gap-x-12">

                {/* 1. Title & Icon (Mobile Sticky Bar / Desktop Left Col) */}
                <div className="md:col-span-5 flex flex-row items-center justify-between w-[calc(100%+32px)] -mx-4 px-4 sticky top-[72px] md:top-auto z-20 bg-black/95 backdrop-blur-md pb-4 pt-6 border-b border-white/10 shadow-xl md:static md:w-full md:bg-transparent md:backdrop-blur-none md:p-0 md:m-0 md:border-none md:shadow-none md:justify-start md:gap-5">

                    {/* Mobile + Desktop Icon on the Left */}
                    <motion.div
                        className="shrink-0 scale-75 md:scale-100 origin-left"
                        style={{ scale: contentScale, opacity: headerOpacity }}
                    >
                        {service.icon}
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                        className="rgb-heading text-xl md:text-3xl lg:text-4xl font-medium tracking-tight whitespace-normal origin-left group-hover:text-white transition-colors"
                        style={{ scale: contentScale, opacity: headerOpacity }}
                    >
                        {service.title}
                    </motion.h3>

                    {/* Mobile Only: ID on the right within the sticky bar */}
                    <div className="flex md:hidden flex-row items-center gap-3 shrink-0">
                        <div className="text-white/40 font-mono text-lg">
                            {service.id}
                        </div>
                    </div>
                </div>

                {/* 2. Paragraphs (Desktop Middle Col / Mobile under title) */}
                <div className="md:col-span-6 flex flex-col justify-start mt-4 md:mt-0 px-0 md:px-0">

                    {/* Description (Stays Bright) */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6 }}
                        className="text-left mt-2 flex flex-col gap-6"
                    >
                        <div className="text-xl md:text-2xl text-white font-medium max-w-2xl">
                            {service.description}
                        </div>
                        <div className="text-lg text-white/80 leading-relaxed font-sans max-w-2xl">
                            {service.text}
                        </div>
                        <ul className="text-white/70 space-y-2 list-disc pl-5 marker:text-white/40 max-w-2xl">
                            {service.list?.map((item, idx) => (
                                <li key={idx} className="pl-1 text-base md:text-lg">{item}</li>
                            ))}
                        </ul>
                        <div className="text-white/90 font-medium italic mt-4 max-w-2xl">
                            {service.footer}
                        </div>
                    </motion.div>
                </div>

                {/* 3. ID (Desktop Only Right Col) */}
                <div className="hidden md:flex md:col-span-1 flex-row justify-end items-start origin-top-right">
                    <motion.div
                        className="text-white/40 font-mono text-xl lg:text-2xl origin-right pt-2"
                        style={{ scale: contentScale, opacity: headerOpacity }}
                    >
                        {service.id}
                    </motion.div>
                </div>

            </div>
        </div>
    );
}

export default function ServicesStickyList() {
    return (
        <section className="relative z-10 bg-black text-white w-full">
            <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 border-t border-white/10 pt-10">

                {/* Projects List - Regular Stacked Column */}
                <div className="flex flex-col relative w-full h-full">
                    {services.map((service, i) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                            i={i}
                            isLast={i === services.length - 1}
                        />
                    ))}

                    {/* 
                      Invisible buffer space at the very bottom of the sticky container.
                      This ensures that the FINAL item (#07) has enough scroll runway 
                      to actually slide up to the top, stick to #06, and trigger its 
                      shrinking animation before the entire <section> scrolls out of view.
                    */}
                    <div className="h-[80vh] w-full pointer-events-none opacity-0" />
                </div>

            </div>
        </section>
    );
}
