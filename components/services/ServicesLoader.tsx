"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ServicesLoader() {
    const [isLoading, setIsLoading] = useState(true);

    const textToType = "d.Creative";
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        // Prevent scrolling and flag global loading state for cursor rotation
        document.body.style.overflow = "hidden";
        document.body.classList.add("is-loading");

        let count = 0;
        let timeout: NodeJS.Timeout;

        const startTyping = () => {
            const typeNextChar = () => {
                count++;
                setCharCount(count);
                if (count < textToType.length) {
                    // Randomize interval speed for realistic unpredictable human typing
                    const varyingSpeed = 60 * (0.4 + Math.random() * 1.6);
                    timeout = setTimeout(typeNextChar, varyingSpeed);
                } else if (count === textToType.length) {
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = "unset";
                        document.body.classList.remove("is-loading");
                        window.scrollTo({ top: 0, behavior: "instant" });
                    }, 600);
                }
            };
            typeNextChar();
        };

        timeout = setTimeout(startTyping, 200);

        return () => {
            clearTimeout(timeout);
            document.body.style.overflow = "unset";
            document.body.classList.remove("is-loading");
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(20px)" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="fixed inset-0 z-[99999] bg-black flex flex-col justify-center items-center overflow-hidden"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4"
                    >
                        {/* Loading text typewriter */}
                        <div className="font-sans text-white text-3xl md:text-5xl font-light tracking-wide flex items-center">
                            <span>{textToType.substring(0, charCount)}</span>
                            <span className="inline-block w-[3px] h-[0.9em] bg-white ml-2 animate-[pulse_0.8s_step-end_infinite]"></span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
