"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import ConfidentialGrid from "./ConfidentialGrid";

type AuthState = "request" | "verify" | "verified";

export default function ConfidentialGatedView() {
    const [authState, setAuthState] = useState<AuthState>("request");

    const handleRequestAccess = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger the backend WhatsApp Verification API.
        setAuthState("verify");
    };

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock verification success
        setAuthState("verified");
    };

    return (
        <section className="relative min-h-screen bg-black text-white w-full overflow-hidden pt-32 lg:pt-48">

            {/* Background Grid - Blurred based on authentication state */}
            <motion.div
                initial={false}
                animate={{
                    filter: authState === "verified" ? "blur(0px)" : "blur(20px)",
                    opacity: authState === "verified" ? 1 : 0.3,
                }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none"
            >
                <div className={authState === "verified" ? "pointer-events-auto" : ""}>
                    <ConfidentialGrid />
                </div>
            </motion.div>

            {/* Authentication Overlay Layer */}
            <AnimatePresence mode="wait">
                {authState !== "verified" && (
                    <motion.div
                        key="auth-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-32 px-4"
                    >
                        {/* Title Section */}
                        <div className="text-center max-w-2xl mb-12 flex flex-col items-center">
                            {/* Subtle Lock Icon */}
                            <svg className="w-8 h-8 md:w-10 md:h-10 text-white/40 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-4">Confidential Collection</h1>
                            <p className="text-lg text-white/60 font-light max-w-xl mx-auto mb-6">
                                Access a curated selection of beautiful and confidential designs shared exclusively with approved viewers.
                            </p>
                            <p className="text-xs text-white/40 uppercase tracking-widest max-w-md">
                                Viewing access is granted on the condition that the designs remain strictly confidential and must not be copied, reproduced, or distributed in any form.
                            </p>
                        </div>

                        {/* Interactive Form Box */}
                        <div className="w-full max-w-md bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                            <AnimatePresence mode="wait">
                                {authState === "request" ? (
                                    <motion.form
                                        key="request-form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        onSubmit={handleRequestAccess}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-white/50 uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                                                placeholder="you@company.com"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <label className="text-xs text-white/50 uppercase tracking-wider">WhatsApp Number</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    required
                                                    defaultValue="+44"
                                                    className="w-20 bg-black/50 border border-white/10 rounded-xl px-2 py-3 text-center text-white focus:outline-none focus:border-white/40 transition-colors"
                                                />
                                                <input
                                                    type="tel"
                                                    required
                                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/40 transition-colors"
                                                    placeholder="7911 123456"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex flex-col gap-4">
                                            <AnimatedButton type="submit" variant="primary" className="w-full py-4 text-lg">
                                                Request Access
                                            </AnimatedButton>
                                            <div className="text-center">
                                                <p className="text-[11px] text-white/40 mt-2">A verification code will be sent to WhatsApp.</p>
                                                <p className="text-[11px] text-white/30 mt-1">All viewing activity may be logged for security purposes.</p>
                                            </div>
                                        </div>
                                    </motion.form>
                                ) : (
                                    <motion.form
                                        key="verify-form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        onSubmit={handleVerification}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="text-center mb-2">
                                            <h3 className="text-xl text-white font-medium mb-2">Verify Device</h3>
                                            <p className="text-sm text-white/50">Enter the 6-digit code sent to your WhatsApp.</p>
                                        </div>

                                        <div className="flex flex-col gap-4 items-center">
                                            <input
                                                type="text"
                                                required
                                                maxLength={6}
                                                className="w-48 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-2xl tracking-[0.5em] text-white focus:outline-none focus:border-white/40 transition-colors font-mono"
                                                placeholder="••••••"
                                                autoFocus
                                            />

                                            <label className="flex items-center gap-3 text-xs text-white/50 mt-2 cursor-pointer group">
                                                <input type="checkbox" className="accent-white/80 w-4 h-4 rounded border-gray-300 bg-black" />
                                                <span className="group-hover:text-white/80 transition-colors">Remember this device for 30 days</span>
                                            </label>
                                        </div>

                                        <div className="pt-2 flex flex-col gap-4">
                                            <AnimatedButton type="submit" variant="primary" className="w-full py-4 text-lg">
                                                Verify & Enter
                                            </AnimatedButton>
                                            <button type="button" className="text-xs text-white/40 hover:text-white/80 transition-colors underline-offset-4 hover:underline">
                                                Resend code
                                            </button>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
