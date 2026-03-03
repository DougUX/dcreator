"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useI18n } from "@/components/I18nProvider";
import { stats } from "@/components/data";

export default function ContactPage() {
    const { t } = useI18n();

    // Reusing the email and location from LetsWork and stats
    const email = "HELLO@D.CREATOR";
    const officeLocation = "LONDON";

    // Reusing Internal links
    const internalLinks = [
        { label: "HOME", href: "/" },
        { label: "SERVICES", href: "/services" },
        { label: "WORK", href: "/work" },
        { label: "AURUM RESERVE", href: "/aurum-reserve" },
        { label: "EXPERTISE", href: "/expertise" },
    ];

    // Reusing External links
    const externalLinks = [
        { label: "INSTAGRAM", href: "#" },
        { label: "LINKEDIN", href: "#" },
    ];

    return (
        <div className="min-h-screen bg-[#141414] text-white selection:bg-white selection:text-black font-sans flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col pt-24 pb-12 sm:pb-0">
                {/* Hero CTA Area */}
                <div className="px-6 md:px-12 pt-12 pb-24 border-b border-neutral-800">
                    <a
                        href="mailto:hello@d.creator"
                        className="group block w-fit"
                    >
                        <h1 className="rgb-heading rgb-heading-strong text-[12vw] sm:text-[10vw] leading-[0.85] tracking-tighter font-black uppercase text-white hover:text-neutral-300 transition-colors duration-500">
                            HELLO@<br />D.CREATOR
                        </h1>
                        <p className="mt-8 text-neutral-400 font-medium tracking-wide text-sm md:text-base uppercase group-hover:text-white transition-colors duration-500">
                            {t("stats.sub") || "Explore What's Possible"}
                        </p>
                    </a>
                </div>

                {/* Information Grid */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12">
                    {/* Left Column Data (Find Us, Internal, External, Stats) */}
                    <div className="lg:col-span-6 xl:col-span-5 border-r border-neutral-800 flex flex-col">

                        {/* Find Us */}
                        <div className="p-6 md:p-12 border-b border-neutral-800 grid grid-cols-3 gap-6">
                            <h2 className="text-xs font-bold tracking-widest text-neutral-500 col-span-1">FIND US</h2>
                            <div className="col-span-2 text-sm uppercase leading-relaxed font-mono">
                                {officeLocation}
                            </div>
                        </div>

                        {/* Internal Links */}
                        <div className="p-6 md:p-12 border-b border-neutral-800 grid grid-cols-3 gap-6">
                            <h2 className="text-xs font-bold tracking-widest text-neutral-500 col-span-1">INTERNAL</h2>
                            <ul className="col-span-2 flex flex-col gap-3 text-sm font-mono lowercase text-neutral-300">
                                {internalLinks.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* External Links */}
                        <div className="p-6 md:p-12 border-b border-neutral-800 grid grid-cols-3 gap-6">
                            <h2 className="text-xs font-bold tracking-widest text-neutral-500 col-span-1">EXTERNAL</h2>
                            <ul className="col-span-2 flex flex-col gap-3 text-sm font-mono lowercase text-neutral-300">
                                {externalLinks.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="hover:text-white transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legacy Stats Integration */}
                        <div className="p-6 md:p-12 grid grid-cols-3 gap-6 flex-1">
                            <h2 className="text-xs font-bold tracking-widest text-neutral-500 col-span-1">STATS</h2>
                            <div className="col-span-2 flex flex-col gap-6">
                                {stats.slice(0, 3).map((stat, i) => (
                                    <div key={i} className="text-sm font-mono">
                                        <span className="text-white block mb-1">{stat.value}</span>
                                        <span className="text-neutral-500 block">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column Video */}
                    <div className="lg:col-span-6 xl:col-span-7 flex flex-col relative h-[50vh] lg:h-auto">
                        <div className="absolute top-6 right-6 md:top-12 md:right-12 z-10 text-right font-mono text-xs text-neutral-300 space-y-1">
                            <div>D.CREATOR HQ</div>
                            <div className="text-neutral-500">CURRENT STATUS: ACTIVE</div>
                        </div>
                        <div className="flex-1 w-full h-full relative">
                            <video
                                className="absolute inset-0 w-full h-full object-cover filter contrast-125 brightness-75 grayscale-[25%]"
                                src="/contact.mp4"
                                muted
                                playsInline
                                autoPlay
                                loop
                                preload="metadata"
                            />
                            {/* Thin grain/overlay pattern could go here */}
                            <div className="pointer-events-none absolute inset-0 bg-black/20" />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
