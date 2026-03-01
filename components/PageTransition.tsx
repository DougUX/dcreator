"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useContext, useRef } from "react";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";

const cubicEase = [0.64, 0, 0.13, 1] as const; // cinematic feeling ease

function FrozenRoute({ children }: { children: ReactNode }) {
    const context = useContext(LayoutRouterContext ?? {});
    const frozen = useRef(context).current;

    if (!LayoutRouterContext) {
        return <>{children}</>;
    }

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {children}
        </LayoutRouterContext.Provider>
    );
}

export default function PageTransition({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    // We wrap the entire application in a keyed motion.div so framer-motion knows when routes change.
    // The 'wait' mode ensures the exit animation completely finishes before the new route is mounted.
    return (
        <AnimatePresence mode="wait">
            <motion.div key={pathname} className="min-h-screen w-full">
                {/* The current route's children frozen in time during exit */}
                <FrozenRoute>{children}</FrozenRoute>

                {/* 
          EXIT MASK: 
          Stays parked below the screen (100%).
          When leaving the page, it slides UP to 0% to completely cover the screen in black.
        */}
                <motion.div
                    className="fixed inset-0 z-[100000] bg-black pointer-events-none w-screen h-screen"
                    initial={{ top: "100%" }}
                    animate={{ top: "100%", transition: { duration: 0 } }}
                    exit={{ top: "0%" }}
                    transition={{ duration: 0.6, ease: cubicEase }}
                />

                {/* 
          ENTER MASK:
          Starts covering the screen (0%).
          When the new page loads, it slides UP to -100% to reveal the fresh content beneath it.
        */}
                <motion.div
                    className="fixed inset-0 z-[100000] bg-black pointer-events-none w-screen h-screen"
                    initial={{ top: "0%" }}
                    animate={{ top: "-100%" }}
                    exit={{ top: "-100%", transition: { duration: 0 } }}
                    transition={{ duration: 0.8, ease: cubicEase, delay: 0.05 }}
                />
            </motion.div>
        </AnimatePresence>
    );
}
