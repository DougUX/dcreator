"use client";

import Container from "./Container";
import { services } from "./data";
import Reveal from "./Reveal";
import { useMemo, useState } from "react";

export default function Services() {
  const tabs = useMemo(() => ["Explore", "Launch", "Persuade", "Transform", "Grow"] as const, []);
  const [active, setActive] = useState<(typeof tabs)[number]>("Grow");

  const filtered = useMemo(() => {
    return services.filter((s) => (s as unknown as { category?: string }).category === active);
  }, [active]);

  return (
    <section id="services" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="text-xs font-medium text-[rgb(var(--muted))]">
                Complex proficiency
              </div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Services built for modern teams
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">
                A flexible set of capabilities across branding, product design,
                development and digital marketing.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActive(t)}
                    className={[
                      "rounded-full border border-[rgb(var(--border))] px-4 py-2 text-xs font-medium tracking-[0.14em] uppercase",
                      "transition",
                      t === active
                        ? "bg-[rgb(var(--fg))] text-[rgb(var(--bg))]"
                        : "bg-transparent text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] hover:bg-[rgb(var(--card))]"
                    ].join(" ")}
                    aria-pressed={t === active}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              {filtered.length === 0 ? (
                <div className="rounded-2xl border border-[rgb(var(--border))] p-6 text-sm text-[rgb(var(--muted))]">
                  No services in this category yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {filtered.map((s) => (
                    <div
                      key={s.title}
                      className="rounded-2xl border border-[rgb(var(--border))] p-5 hover:bg-[rgb(var(--card))] transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-medium text-[rgb(var(--muted))]">
                          {s.no}
                        </div>
                        <a
                          href="#"
                          className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))] transition"
                        >
                          Details →
                        </a>
                      </div>

                      <div className="mt-3 text-lg font-semibold">{s.title}</div>

                      <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--muted))]">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2">
                            <span className="mt-2 h-1 w-1 rounded-full bg-[rgb(var(--fg))]" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}