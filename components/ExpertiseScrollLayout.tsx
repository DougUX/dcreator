"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Red_Hat_Display } from "next/font/google";
import AnimatedButton from "@/components/AnimatedButton";

const font = Red_Hat_Display({ subsets: ["latin"], weight: ["300", "400", "600"], display: "swap" });

function TypewriterText({ text, delay = 0, speed = 50, className = "", cursor = true, hideCursorOnComplete = false, onComplete }: { text: string, delay?: number, speed?: number, className?: string, cursor?: boolean, hideCursorOnComplete?: boolean, onComplete?: () => void }) {
    const [charCount, setCharCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(delay === 0);

    useEffect(() => {
        setCharCount(0);
        setHasStarted(false);
        let count = 0;
        let timeout: NodeJS.Timeout;

        const startTyping = () => {
            setHasStarted(true);
            const typeNextChar = () => {
                count++;
                setCharCount(count);
                if (count < text.length) {
                    const varyingSpeed = speed * (0.3 + Math.random() * 1.5);
                    timeout = setTimeout(typeNextChar, varyingSpeed);
                } else if (count === text.length) {
                    onComplete?.();
                }
            };
            typeNextChar();
        };

        if (delay > 0) {
            timeout = setTimeout(startTyping, delay);
        } else {
            timeout = setTimeout(startTyping, 50);
        }

        return () => clearTimeout(timeout);
    }, [text, delay, speed]);

    const isComplete = charCount >= text.length;
    const showCursor = cursor && (!hideCursorOnComplete || !isComplete);

    return (
        <span className={className}>
            {showCursor && hasStarted && charCount === 0 && (
                <span
                    className={`inline-block w-[0.05em] h-[1em] bg-white -mr-[4px] align-middle translate-y-[-0.08em] animate-[pulse_1s_step-end_infinite]`}
                    style={{ WebkitBackgroundClip: 'initial', WebkitTextFillColor: 'initial', backgroundClip: 'initial' }}
                />
            )}
            {text.split('').map((char, index) => {
                const isTyped = index < charCount;
                return (
                    <span key={index} className={`${isTyped ? "opacity-100" : "opacity-0"}`}>
                        {char}
                        {showCursor && index === charCount - 1 && (
                            <span
                                className={`inline-block w-[0.05em] h-[1em] bg-white ml-[2px] -mr-[6px] align-middle translate-y-[0.02em] ${isComplete ? 'animate-[pulse_1s_step-end_infinite]' : ''}`}
                                style={{ WebkitBackgroundClip: 'initial', WebkitTextFillColor: 'initial', backgroundClip: 'initial' }}
                            />
                        )}
                    </span>
                );
            })}
        </span>
    );
}

const steps = [
    {
        image: "/image.png",
        title: "01 — Product Strategy & Experience Architecture",
        text: [
            "I design with intent.",
            "From early discovery to scalable product ecosystems, I translate business goals into structured, intuitive user experiences. Every decision is grounded in clarity, usability and long-term product vision.",
            "• Product vision & roadmap alignment",
            "• Information architecture",
            "• User journey mapping",
            "• Cross-functional collaboration",
            "• Enterprise problem solving"
        ]
    },
    {
        image: "/image.png",
        title: "02 — UX / UI Design & Interface Systems",
        text: [
            "Precision in every interaction.",
            "I craft elegant, functional interfaces for complex platforms — balancing usability with refined visual language.",
            "• Interaction design",
            "• High-fidelity UI design",
            "• Responsive web & mobile",
            "• Design token systems",
            "• Accessibility & usability refinement"
        ]
    },
    {
        image: "/image.png",
        title: "03 — Design Systems & Scalable Frameworks",
        text: [
            "Consistency at scale.",
            "I architect and govern design systems used across multi-product environments — enabling speed, alignment and long-term sustainability.",
            "• Atomic design architecture",
            "• Component libraries (Figma / MUI / React)",
            "• Token governance",
            "• Documentation & adoption strategy",
            "• System migration & consolidation"
        ]
    },
    {
        image: "/image.png",
        title: "04 — AI & Conversational Experience Design",
        text: [
            "Designing intelligence.",
            "I shape AI‑powered interfaces that feel natural, useful and structured — from conversational UX to workflow‑driven generative systems.",
            "• Conversational design",
            "• AI workflow integration",
            "• Prompt strategy",
            "• Intelligent automation interfaces",
            "• Human‑centred AI interaction"
        ]
    },
    {
        image: "/image.png",
        title: "05 — Luxury Product & Brand Experience",
        text: [
            "Where digital meets physical.",
            "Beyond digital platforms, I design premium physical products and packaging — combining craft, engineering feasibility and brand storytelling.",
            "• Luxury packaging design",
            "• Bottle concept development",
            "• Material & finish strategy",
            "• Brand positioning",
            "• End‑to‑end product execution"
        ]
    },
    {
        image: "/image.png",
        title: "06 — Creative Direction & End‑to‑End Delivery",
        text: [
            "From concept to launch.",
            "I operate at both strategic and execution levels — leading initiatives while remaining hands‑on in design.",
            "• Concept development",
            "• Stakeholder alignment",
            "• Prototype to production",
            "• Developer collaboration",
            "• Launch readiness"
        ]
    },
    // Final note slide – reuse same content as WhyMe final slide
    {
        image: "",
        title: "Final note",
        text: [
            "You don’t hire me to design something random.",
            "You hire me to transform vision into reality."
        ]
    }
];

export default function ExpertiseScrollLayout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollBlur, setScrollBlur] = useState(0);
    const [hoveredPanel, setHoveredPanel] = useState(false);
    const [isFirstLineComplete, setIsFirstLineComplete] = useState(false);
    const [isFinalLineComplete, setIsFinalLineComplete] = useState(false);

    useEffect(() => {
        setIsFirstLineComplete(false);
        setIsFinalLineComplete(false);
    }, [activeIndex]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll("[data-step-section]");
            let bestIndex = 0;
            let minDistance = Infinity;
            const screenCenter = window.innerHeight * 0.5;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const diff = Math.abs(center - screenCenter);
                if (diff < minDistance) {
                    minDistance = diff;
                    bestIndex = index;
                }
            });

            setActiveIndex(bestIndex);
            const maxDistance = window.innerHeight * 0.6;
            const calculatedBlur = Math.min(12, (minDistance / maxDistance) * 12);
            setScrollBlur(calculatedBlur);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative w-full bg-black text-white">
            {/* Background container */}
            <div className="fixed inset-0 bg-black" style={{ backdropFilter: `blur(${scrollBlur}px)` }} />
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
                {steps.map((step, i) => (
                    <div
                        key={step.title}
                        data-step-section
                        className={`min-h-[100vh] flex flex-col justify-center items-center text-center px-6 md:px-12 transition-all duration-700 ${i === activeIndex ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-16 pointer-events-none"}`}
                    >
                        <div className="max-w-2xl p-8 md:p-12 transition-all duration-500 rounded-2xl bg-transparent pointer-events-auto"
                            onMouseEnter={() => setHoveredPanel(true)}
                            onMouseLeave={() => setHoveredPanel(false)}>
                            {step.image ? (
                                <div className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-[rgba(255,255,255,0.7)] mb-6 font-medium drop-shadow-md">
                                    {step.title}
                                </div>
                            ) : null}
                            {i === steps.length - 1 ? (
                                <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
                                    <div className="w-full max-w-6xl xl:max-w-[90vw] mx-auto px-4">
                                        <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-[rgba(255,255,255,0.7)] text-center w-full max-w-3xl mx-auto min-h-[40px]">
                                            {activeIndex === steps.length - 1 && (
                                                <TypewriterText text={step.text[0]} delay={300} speed={70} hideCursorOnComplete={true} onComplete={() => setIsFirstLineComplete(true)} />
                                            )}
                                        </h2>
                                        <h1 className="text-[7vw] sm:text-[52px] lg:text-[72px] xl:text-[84px] leading-[1.05] font-[700] tracking-[-0.01em] w-full text-center pb-4 mt-2 text-white min-h-[100px] md:min-h-[120px]">
                                            {activeIndex === steps.length - 1 && isFirstLineComplete && (
                                                <TypewriterText text={step.text[1]} delay={400} speed={85} onComplete={() => setIsFinalLineComplete(true)} />
                                            )}
                                        </h1>
                                        <div className={`mt-8 md:mt-12 transition-all duration-1000 ease-out transform flex justify-center ${isFinalLineComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                            <Image src="/logo-mark.svg" alt="d.Creator Signature" width={100} height={100} className="w-16 h-16 md:w-20 md:h-20 opacity-80 brightness-0 invert" />
                                        </div>
                                        <div className={`mt-10 transition-all duration-1000 delay-[600ms] ease-out transform ${isFinalLineComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                            <AnimatedButton href="mailto:hello@dcreator.com" variant="secondary" className="uppercase text-sm">
                                                <span className="flex items-center gap-2">
                                                    <span>Contact me</span>
                                                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5v14M19 12l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </AnimatedButton>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {/* Regular expertise slide */}
                                    <h2 className="heading-strategy md: mb-4" style={{ fontFamily: font.style.fontFamily }}>{step.title}</h2>
                                    {step.text.map((para, idx) => (
                                        <p key={idx} className="md: mb-2" style={{ fontFamily: font.style.fontFamily }}>{para}</p>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
