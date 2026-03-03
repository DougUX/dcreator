"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useInView } from "framer-motion";

interface ScrollVideoProps {
    src: string;
    className?: string;
    progress?: MotionValue<number>; // Optional, kept for compatibility with parent components
}

export default function ScrollVideo({ src, className }: ScrollVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [shouldLoad, setShouldLoad] = useState(false);
    const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

    // Lazy load: fetch the video when it gets within 500px of the viewport
    const isInView = useInView(containerRef, { once: true, margin: "500px 0px" });

    // Visibility: detect when it actually enters the screen so we know when to trigger the first play
    const isVisible = useInView(containerRef, { margin: "-20% 0px" });

    // Trigger lazy loading
    useEffect(() => {
        if (isInView) setShouldLoad(true);
    }, [isInView]);

    // Handle initial auto-play when scrolled into view
    useEffect(() => {
        const video = videoRef.current;
        if (isVisible && video && !hasPlayedOnce) {
            video.play().catch(() => { }); // Catch play-interruption errors safely
            setHasPlayedOnce(true);
        }
    }, [isVisible, hasPlayedOnce, shouldLoad]);

    // Handle replay on click
    const handleVideoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const video = videoRef.current;
        if (!video) return;

        if (video.paused || video.ended) {
            if (video.ended) video.currentTime = 0;
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    };

    return (
        <div
            ref={containerRef}
            className={`group/video relative overflow-hidden cursor-pointer ${className || "w-full h-full"}`}
            onClick={handleVideoClick}
        >
            {shouldLoad && (
                <video
                    ref={videoRef}
                    src={src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                />
            )}
        </div>
    );
}
