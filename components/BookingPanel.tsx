"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function BookingPanel() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, []);

    // Sync state with URL hash reliably across Next.js navigation types
    useEffect(() => {
        const checkHash = () => {
            if (typeof window !== "undefined") {
                setIsOpen(window.location.hash === "#book");
            }
        };

        // Check on initial mount
        checkHash();

        // Listen to native browser hash changes (works for standard <a> tags)
        window.addEventListener("hashchange", checkHash);

        // Also listen to Next.js pushState/replaceState proxy events if applicable,
        // but the simplest fallback for heavily routed apps is a quick interval check 
        // while the component is mounted, to catch Next.js silent hash updates:
        const interval = setInterval(checkHash, 100);

        return () => {
            window.removeEventListener("hashchange", checkHash);
            clearInterval(interval);
        };
    }, []);

    const closePanel = useCallback(() => {
        setIsOpen(false);

        // Remove the hash from the URL so it can be re-triggered later
        if (typeof window !== "undefined") {
            const cleanUrl = window.location.pathname + window.location.search;
            window.history.pushState("", document.title, cleanUrl);
        }
    }, []);

    // Prevent background scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closePanel}
                aria-hidden="true"
            />

            {/* Sliding Panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Book a Call"
                className={`fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-[500px] bg-[rgb(var(--bg))] shadow-2xl flex flex-col transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-6 border-b border-[rgb(var(--border))]/30">
                    <h2 className="text-[18px] uppercase tracking-[0.1em] font-medium text-[rgb(var(--fg))]">Let's Talk</h2>
                    <button
                        type="button"
                        onClick={closePanel}
                        className="p-2 -mr-2 text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] transition-colors rounded-full hover:bg-[rgb(var(--card))]"
                        aria-label="Close panel"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto relative bg-transparent">
                    {isOpen && (
                        <Cal
                            calLink="dcreator/15min"
                            style={{ width: "100%", height: "100%", overflow: "scroll" }}
                            config={{ layout: 'month_view' }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
