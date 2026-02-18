"use client";

import Image from "next/image";
import Container from "./Container";
import { clientLogos } from "./data";
import Reveal from "./Reveal";
import { useI18n } from "@/components/I18nProvider";

export default function Clients() {
  const { t } = useI18n();
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal stagger={0.08}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-xs font-medium text-[rgb(var(--muted))]">
                {t("clients.kicker")}
              </div>
              <h2 className="rgb-heading mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("clients.title")}
              </h2>
              <div className="mt-4 text-sm text-[rgb(var(--muted))]">
                {t("clients.sub")}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {clientLogos.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-center rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-6 text-sm text-[rgb(var(--muted))] hover:bg-[rgb(var(--card))] transition"
              >
                {c.logoSrc ? (
                  <Image
                    src={c.logoSrc}
                    alt={c.name}
                    width={220}
                    height={56}
                    className="h-8 w-auto opacity-80 brightness-0 dark:invert dark:brightness-200"
                  />
                ) : (
                  c.name
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}