"use client";

import { HTMLAttributes } from "react";
import useSpotlightEffect from "@/hooks/use-spotlight";

interface SpotlightConfig {
    spotlightSize?: number;
    spotlightIntensity?: number;
    fadeSpeed?: number;
    glowColor?: string;
    pulseSpeed?: number;
}

interface SpotlightCursorProps extends HTMLAttributes<HTMLCanvasElement> {
    config?: SpotlightConfig;
}

const SpotlightCursor = ({
    config = {},
    className,
    ...rest
}: SpotlightCursorProps) => {
    const spotlightConfig = {
        spotlightSize: 250,
        spotlightIntensity: 0.5,
        fadeSpeed: 0.15,
        glowColor: "255, 255, 255",
        pulseSpeed: 2000,
        ...config,
    };

    const canvasRef = useSpotlightEffect(spotlightConfig);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed top-0 left-0 pointer-events-none z-[9999] w-full h-full ${className || ""}`}
            style={{
                mixBlendMode: "difference"
            }}
            {...rest}
        />
    );
};

export default SpotlightCursor;
