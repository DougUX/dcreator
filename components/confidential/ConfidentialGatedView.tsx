"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import ConfidentialGrid from "./ConfidentialGrid";

export default function ConfidentialGatedView() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("Hi Doug, I would like to request the password to view your Confidential Collection portfolio.");

    // Fallback static password if the environment variable isn't set yet
    const MASTER_PASSWORD = process.env.NEXT_PUBLIC_CONFIDENTIAL_PASSWORD || "unlock2026";

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (password === MASTER_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            setErrorMsg("Incorrect password.");
            setPassword("");
        }
    };

    // Pre-filled WhatsApp message URL
    const whatsappNumber = "447397392319"; // User's real WhatsApp number

    const handleSendWhatsApp = () => {
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(chatMessage)}`;
        window.open(whatsappLink, '_blank');
        setIsChatOpen(false);
    };

    return (
        <section className="relative min-h-screen bg-black text-white w-full overflow-hidden pt-32 lg:pt-48">

            {/* Background Grid - Blurred based on authentication state */}
            <motion.div
                initial={false}
                animate={{
                    filter: isAuthenticated ? "blur(0px)" : "blur(20px)",
                    opacity: isAuthenticated ? 1 : 0.3,
                }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none"
            >
                <div className={isAuthenticated ? "pointer-events-auto" : ""}>
                    <ConfidentialGrid />
                </div>
            </motion.div>

            {/* Authentication Overlay Layer */}
            <AnimatePresence mode="wait">
                {!isAuthenticated && !isChatOpen && (
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
                        </div>

                        {/* Interactive Form Box */}
                        <div className="w-full max-w-sm bg-[#111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
                            <form onSubmit={handleUnlock} className="flex flex-col gap-4">
                                <div className="text-center mb-2">
                                    <h3 className="text-lg text-white font-medium">Enter Password</h3>
                                </div>

                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:outline-none focus:border-white/40 transition-colors"
                                    placeholder="••••••••"
                                    autoFocus
                                />

                                {errorMsg && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}

                                <AnimatedButton type="submit" variant="primary" className="w-full py-3">
                                    Unlock Portfolio
                                </AnimatedButton>
                            </form>

                            <div className="w-full h-px bg-white/10 my-2" />

                            <div className="text-center">
                                <p className="text-xs text-white/50 mb-4">Don't have the password yet?</p>
                                <button
                                    onClick={() => setIsChatOpen(true)}
                                    className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/20 rounded-xl px-4 py-3 transition-colors text-sm font-medium"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    Request Password on WhatsApp
                                </button>
                                <p className="text-[10px] text-white/30 mt-4 max-w-xs mx-auto">
                                    Viewing access is granted on the condition that the designs remain strictly confidential and must not be distributed.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Custom WhatsApp "Iframe" Mock UI Overlay */}
                {isChatOpen && !isAuthenticated && (
                    <motion.div
                        key="whatsapp-overlay"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                    >
                        <div className="w-full max-w-md bg-[#0b141a] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex flex-col h-[600px] max-h-[85vh]">

                            {/* WhatsApp Header */}
                            <div className="bg-[#202c33] px-4 py-3 flex items-center justify-between shadow-md z-10 w-full">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#111b21] flex items-center justify-center overflow-hidden border border-white/10 shrink-0">
                                        <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-medium text-base leading-tight">Doug - dCreator</span>
                                        <span className="text-xs text-white/60">online</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                    aria-label="Close Chat"
                                >
                                    <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* WhatsApp Chat History Area */}
                            <div className="flex-1 bg-[#0b141a] p-4 flex flex-col overflow-y-auto relative bg-[url('https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png')] bg-repeat opacity-90">

                                <div className="text-center mb-6 mt-2">
                                    <span className="bg-[#182229] text-white/60 text-xs px-3 py-1.5 rounded-lg shadow-sm">
                                        Today
                                    </span>
                                </div>

                                {/* Security Message */}
                                <div className="flex justify-center mb-6">
                                    <div className="bg-[#182229] border border-[#ffec9d]/20 px-3 py-2 rounded-lg flex items-center gap-2 max-w-[90%] text-[11px] text-[#ffec9d] shadow-sm">
                                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                                        </svg>
                                        Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
                                    </div>
                                </div>

                                {/* Simulated Outgoing Request Message */}
                                <div className="flex justify-end mb-2">
                                    <div className="bg-[#005c4b] text-[#e9edef] p-2.5 rounded-xl rounded-tr-none max-w-[85%] shadow-sm relative text-[15px] leading-relaxed">
                                        {chatMessage}
                                        <div className="flex justify-end items-center gap-1 mt-1 text-[10px] text-white/50">
                                            <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            <svg className="w-4 h-4 text-[#53bdeb]" viewBox="0 0 16 15" width="16" height="15">
                                                <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* WhatsApp Footer/Input Area */}
                            <div className="bg-[#202c33] p-3 flex items-center gap-2">
                                <button className="p-2.5 text-white/50 hover:text-white/80 transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <button className="p-2 text-white/50 hover:text-white/80 transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                </button>
                                <div className="flex-1 bg-[#2a3942] rounded-lg px-4 py-2 flex items-center">
                                    <input
                                        type="text"
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        className="w-full bg-transparent text-[#d1d7db] text-[15px] focus:outline-none placeholder-white/40"
                                        placeholder="Type a message"
                                    />
                                </div>
                                <button
                                    onClick={handleSendWhatsApp}
                                    className="p-3 bg-[#00a884] hover:bg-[#00a884]/90 text-white rounded-full transition-colors shrink-0 flex items-center justify-center shadow-md ml-1"
                                    aria-label="Send"
                                >
                                    <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
