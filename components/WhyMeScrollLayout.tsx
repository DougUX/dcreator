"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Red_Hat_Display } from "next/font/google";

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
                    // Randomize interval speed for realistic unpredictable human typing
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
            timeout = setTimeout(startTyping, 50); // slight baseline delay for remounts
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
        image: "/images/Strategy-Vision.png",
        title: "Strategy & Vision",
        text: [
            "I define the future before we design it.",
            "Every engagement begins with direction: business goals, constraints, and opportunity.",
            "I translate ambiguity into a clear path, so design decisions stay intentional.",
            "The result is a vision that guides the craft — not the other way around."
        ]
    },
    {
        image: "/images/Concept-Sketching.png",
        title: "Concept Sketching",
        text: [
            "Ideas begin with the hand.",
            "I sketch to explore form, composition, and hierarchy without friction.",
            "This stage surfaces options quickly — before we commit to pixels or production.",
            "It’s where taste, proportion, and restraint are established."
        ]
    },
    {
        image: "/images/Prototyping.png",
        title: "Digital & Physical Prototyping",
        text: [
            "Precision through iteration.",
            "We prototype to remove risk — validating flow, feel, and feasibility early.",
            "From interface behaviour to physical tolerance, iteration sharpens the outcome.",
            "Every pass reduces noise and increases confidence."
        ]
    },
    {
        image: "/images/crafting.png",
        title: "Crafting the Product",
        text: [
            "Designed with soul. Built with intention.",
            "I refine the details that signal value: alignment, tension, material logic, and rhythm.",
            "Craft is where luxury lives — in decisions most people don’t notice, but feel.",
            "The product becomes coherent, inevitable, and premium."
        ]
    },
    {
        image: "/images/brand.png",
        title: "Brand & Positioning Strategy",
        text: [
            "A product without story is silent.",
            "I define the narrative and positioning that makes the product instantly understood.",
            "From tone-of-voice to visual language, the system stays consistent across touchpoints.",
            "Clarity creates trust — and trust creates demand."
        ]
    },
    {
        image: "/images/photoshoot.png",
        title: "Editorial Photoshoot",
        text: [
            "Presentation defines perception.",
            "Premium work needs premium presentation — controlled light, composition, and mood.",
            "Editorial direction turns product details into a story people want to own.",
            "It’s the difference between showing features and creating desire."
        ]
    },
    {
        image: "/images/Designing.png",
        title: "Website / App & AI Integration",
        text: [
            "Where creativity meets AI.",
            "I bring the system to life across web and app — performance, polish, and interaction.",
            "AI integration is designed as behaviour: purposeful, human, and brand-aligned.",
            "The final experience feels intelligent — not gimmicky."
        ]
    },
    {
        image: "",
        title: "Final note",
        text: [
            "You don’t hire me to design something random.",
            "You hire me to transform vision into reality."
        ]
    }
];

export default function WhyMeScrollLayout() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollBlur, setScrollBlur] = useState(0);
    const [hoveredPanel, setHoveredPanel] = useState(false);
    const [isFirstLineComplete, setIsFirstLineComplete] = useState(false);
    const [isFinalLineComplete, setIsFinalLineComplete] = useState(false);

    useEffect(() => {
        if (activeIndex !== steps.length - 1) {
            setIsFirstLineComplete(false);
            setIsFinalLineComplete(false);
        }
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

            // Calculate dynamic blur: 0px when perfectly centered, up to 12px when between sections
            const maxDistance = window.innerHeight * 0.6; // tuning factor
            const calculatedBlur = Math.min(12, (minDistance / maxDistance) * 12);
            setScrollBlur(calculatedBlur);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section className="relative w-full bg-black text-white">
            {/* Background container that remains sticky behind content */}
            <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
                <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-700 pointer-events-none" />

                <div
                    className="absolute inset-0 transition-[filter] duration-500 ease-out"
                    style={{ filter: `blur(${hoveredPanel ? 16 : Math.max(0, scrollBlur)}px)` }}
                >
                    {steps.map((step, i) => {
                        if (!step.image) return null;
                        return (
                            <Image
                                key={step.image}
                                src={step.image}
                                alt={step.title}
                                fill
                                className={`object-cover transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${i === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-[1.05]"
                                    } group-hover:scale-[1.02]`}
                                sizes="100vw"
                                priority={i === 0}
                            />
                        );
                    })}

                    <div
                        className={`absolute inset-0 bg-black z-20 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${activeIndex === steps.length - 1 ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    />
                </div>
            </div>

            {/* Navigation Overlays (Sticky, above everything) */}
            <div className="sticky top-0 h-screen w-full pointer-events-none z-30 -mt-[100vh]">
                <div className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}
                        />
                    ))}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto">
                    <button
                        onClick={() => {
                            if (activeIndex === steps.length - 1) {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            } else {
                                const sections = document.querySelectorAll("[data-step-section]");
                                if (activeIndex < sections.length - 1) {
                                    sections[activeIndex + 1].scrollIntoView({ behavior: "smooth", block: "center" });
                                }
                            }
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.25)] bg-[rgba(0,0,0,0.3)] backdrop-blur-sm text-[rgba(255,255,255,0.85)] transition-colors hover:bg-[rgba(255,255,255,0.15)] hover:text-white animate-bounce cursor-none"
                        data-cursor-stick
                    >
                        <svg className={`mt-0.5 transition-transform duration-500 ${activeIndex === steps.length - 1 ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 5v14M19 12l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Foreground content that scrolls over the sticky background */}
            <div className="relative z-20 w-full pb-[10vh] -mt-[100vh] group">
                {steps.map((step, i) => (
                    <div
                        key={step.title}
                        data-step-section
                        className={`min-h-[100vh] flex flex-col justify-center items-center text-center px-6 md:px-12 transition-all duration-700 ${i === activeIndex ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-16 pointer-events-none"
                            }`}
                    >
                        <div
                            className="max-w-2xl p-8 md:p-12 transition-all duration-500 rounded-2xl bg-transparent pointer-events-auto"
                            onMouseEnter={() => setHoveredPanel(true)}
                            onMouseLeave={() => setHoveredPanel(false)}
                        >
                            {step.image ? (
                                <div className="text-[11px] md:text-[13px] uppercase tracking-[0.4em] text-[rgba(255,255,255,0.7)] mb-6 font-medium drop-shadow-md">
                                    Step 0{i + 1}
                                </div>
                            ) : null}
                            {i === steps.length - 1 ? (
                                <div className="flex flex-col items-center justify-center w-full min-h-[300px]">
                                    <div className="w-full max-w-6xl xl:max-w-[90vw] mx-auto px-4">
                                        <h2 key={`line1-${activeIndex}`} className="text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-6 text-[rgba(255,255,255,0.7)] text-center w-full max-w-3xl mx-auto min-h-[40px]">
                                            {activeIndex === steps.length - 1 && (
                                                <TypewriterText text={step.text[0]} delay={300} speed={70} hideCursorOnComplete={true} onComplete={() => setIsFirstLineComplete(true)} />
                                            )}
                                        </h2>
                                        <h1 key={`line2-${activeIndex}`} className="text-[7vw] sm:text-[52px] lg:text-[72px] xl:text-[84px] leading-[1.05] font-[700] tracking-[-0.01em] w-full text-center pb-4 mt-2 text-white min-h-[100px] md:min-h-[120px]">
                                            {activeIndex === steps.length - 1 && isFirstLineComplete && (
                                                <TypewriterText text={step.text[1]} delay={400} speed={85} onComplete={() => setIsFinalLineComplete(true)} />
                                            )}
                                        </h1>
                                        <div className="flex flex-col items-center justify-center">
                                            <div className={`mt-8 md:mt-12 transition-all duration-1000 ease-out transform flex justify-center ${isFinalLineComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                                <Image src="/logo-mark.svg" alt="d.Creator Signature" width={100} height={100} className="w-16 h-16 md:w-20 md:h-20 opacity-80 brightness-0 invert" />
                                            </div>
                                            <div className={`mt-10 transition-all duration-1000 delay-[600ms] ease-out transform ${isFinalLineComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                                                <a href="mailto:hello@dcreator.com" className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-8 py-4 text-white uppercase backdrop-blur-md transition-all duration-500 hover:border-[rgba(255,255,255,0.4)] hover:bg-[rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                                    <span>Contact me</span>
                                                    <svg className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h2 className={`rgb-heading text-4xl md:text-6xl font-light tracking-[0.1em] md:tracking-[0.15em] mb-12 md:mb-16 text-white drop-shadow-xl [text-shadow:0_4px_24px_rgba(0,0,0,0.8)] ${font.className}`}>
                                        {step.title}
                                    </h2>
                                    <div className="space-y-4 text-base md:text-xl text-[rgba(255,255,255,0.9)] leading-loose tracking-wide font-light drop-shadow-lg [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
                                        {step.text.map((t, tidx) => (
                                            <p key={tidx}>{t}</p>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
