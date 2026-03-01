"use client";

import { motion } from "framer-motion";

export default function AurumCTA() {
    return (
        <section className="relative w-full overflow-hidden bg-[rgb(var(--aurum-bg))] py-40 sm:py-56">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[rgb(var(--aurum-accent))]/5 to-transparent" />

            <div className="relative mx-auto max-w-2xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="heading-strategy mb-6 text-[rgb(var(--aurum-fg))] sm:">
                        Secure Your Allocation
                    </h2>
                    <p className="mb-12 text-[rgb(var(--aurum-fg))]/60 sm:">
                        Join the inner circle. Enter your email for exclusive access to our next limited release and private tasting events.
                    </p>

                    <form className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="Email address"
                            required
                            className="h-14 flex-1 rounded-full border border-[rgb(var(--aurum-border))] bg-transparent px-6 text-[rgb(var(--aurum-fg))] placeholder:text-[rgb(var(--aurum-fg))]/40 focus:border-[rgb(var(--aurum-accent))] focus:outline-none focus:ring-1 focus:ring-[rgb(var(--aurum-accent))] transition-all"
                        />
                        <button
                            type="submit"
                            className="h-14 rounded-full bg-[rgb(var(--aurum-accent))] px-8 uppercase text-[#101010] transition-transform hover:scale-105"
                        >
                            Request Access
                        </button>
                    </form>

                    <div className="mt-16">
                        <button className="uppercase text-[rgb(var(--aurum-fg))]/40 transition-colors hover:text-[rgb(var(--aurum-accent))]">
                            Explore the process
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
