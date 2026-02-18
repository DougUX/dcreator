"use client";

import Container from "./Container";
import { featuredWork } from "./data";
import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useI18n } from "@/components/I18nProvider";

export default function FeaturedWork() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const current = useMemo(() => featuredWork[active], [active]);

  return (
    <section id="work" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium text-[rgb(var(--muted))]">
                {t("work.kicker")}
              </div>
              <h2 className="rgb-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("work.title")}{" "}
                <span className="text-[rgb(var(--muted))]">(26)</span>
              </h2>
            </div>

            <a
              href="#"
              className="inline-flex w-fit rounded-full border border-[rgb(var(--border))] px-4 py-2 text-sm hover:bg-[rgb(var(--card))] transition"
            >
              {t("work.viewAll")}
            </a>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="divide-y divide-[rgb(var(--border))] rounded-2xl border border-[rgb(var(--border))] overflow-hidden">
                {featuredWork.map((item, idx) => {
                  const isActive = idx === active;
                  return (
                    <a
                      key={item.title}
                      href="#"
                      onMouseEnter={() => setActive(idx)}
                      onFocus={() => setActive(idx)}
                      className={[
                        "group flex items-center justify-between gap-3 p-5 transition",
                        "hover:bg-[rgb(var(--card))]",
                        isActive ? "bg-[rgb(var(--card))]" : "bg-transparent"
                      ].join(" ")}
                    >
                      <div>
                        <div className="text-lg font-medium">{item.title}</div>
                        <div className="mt-1 text-sm text-[rgb(var(--muted))]">
                          {item.meta}
                        </div>
                      </div>

                      <div className="text-sm text-[rgb(var(--muted))] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition">
                        →
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-black/5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.image}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm font-medium">{current.title}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">
                    {current.meta}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}