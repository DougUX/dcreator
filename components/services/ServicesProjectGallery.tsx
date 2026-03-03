"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "@/components/AnimatedButton";

const projects = [
    {
        title: "Enterprise Generative AI Assistant",
        description: "Redesigning internal IT support into an AI-native conversational platform for global consultants.\n\nBuilt to streamline device requests, automate workflows, and reduce operational friction across the organisation.",
        scope: "Desktop + iOS",
        impact: "Improved request resolution speed and reduced support dependency",
        tags: ["UX Design", "UI Designer", "AI Design", "Design Systems"],
        image: "/portfolio/BCG.png"
    },
    {
        title: "Bottle Design",
        subtitle: "A London Luxury Packaging Award Winner",
        tags: ["Packaging Design", "Bottle Design", "Award Winner"],
        image: "/portfolio/Meydan.png"
    },
    {
        title: "Luxury Packaging Box",
        subtitle: "A London Luxury Packaging Award Winner",
        tags: ["Luxury Packaging Design", "Gift Box", "Award Winner"],
        image: "/portfolio/TSODgift.png"
    }
];

export default function ServicesProjectGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!containerRef.current || !scrollRef.current) return;

        const scrollContainer = scrollRef.current;

        // Calculate total scroll distance based on content width minus viewport width
        const getScrollAmount = () => -(scrollContainer.scrollWidth - window.innerWidth);

        const tween = gsap.to(scrollContainer, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        return () => {
            tween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className="relative z-30 bg-black text-white w-full h-screen overflow-hidden border-t border-white/10">

            <div className="absolute top-10 w-full px-4 md:px-8 flex justify-between z-10 pointers-event-none mix-blend-difference">
                <h2 className="heading-strategy uppercase">Selected Work</h2>
            </div>

            <div ref={scrollRef} className="flex h-full w-max items-center pl-4 md:pl-24 gap-12 pr-32">
                {projects.map((project, i) => (
                    <div key={i} className="w-[80vw] md:w-[60vw] lg:w-[45vw] h-[70vh] relative flex flex-col justify-end p-8 md:p-12 overflow-hidden rounded-xl group cursor-none" data-cursor-text="View">

                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative z-20 flex flex-col gap-4 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                            <h3 className="text-3xl md:text-4xl heading-strategy transition-transform duration-700 delay-100 translate-y-4 group-hover:translate-y-0">{project.title}</h3>

                            {(project as any).description && (
                                <div className="text-white/80 font-light text-sm md:text-base whitespace-pre-line max-w-xl transition-transform duration-700 delay-150 translate-y-4 group-hover:translate-y-0">
                                    {(project as any).description}
                                </div>
                            )}

                            {(project as any).subtitle && (
                                <p className="text-white/90 transition-transform duration-700 delay-150 translate-y-4 group-hover:translate-y-0 text-lg font-light">{project.subtitle}</p>
                            )}

                            {((project as any).scope || (project as any).impact) && (
                                <div className="flex flex-col gap-1 mt-2 text-sm text-white/60 transition-transform duration-700 delay-200 translate-y-4 group-hover:translate-y-0">
                                    {(project as any).scope && <div><strong className="text-white/90 font-medium">Scope:</strong> {(project as any).scope}</div>}
                                    {(project as any).impact && <div><strong className="text-white/90 font-medium">Impact:</strong> {(project as any).impact}</div>}
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 mt-2 transition-transform duration-700 delay-300 translate-y-4 group-hover:translate-y-0">
                                {project.tags.map((tag, j) => (
                                    <span key={j} className="px-4 py-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-xs tracking-wider uppercase font-medium text-white/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Ending Call to Action */}
                <div className="w-[50vw] md:w-[30vw] h-[70vh] flex flex-col items-center justify-center p-8 text-center ml-12 gap-8">
                    <h3 className="text-3xl lg:text-4xl font-light">Interested in seeing more?</h3>
                    <AnimatedButton href="/work" variant="primary">
                        View All Work
                    </AnimatedButton>
                </div>

            </div>
        </section>
    );
}
