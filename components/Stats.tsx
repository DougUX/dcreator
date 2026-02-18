"use client";

import Container from "./Container";
import { stats } from "./data";
import Reveal from "./Reveal";
import { useI18n } from "@/components/I18nProvider";

export default function Stats({
  embedded = false,
  showTitle = true,
  showCards = true,
}: {
  embedded?: boolean;
  showTitle?: boolean;
  showCards?: boolean;
}) {
  const { t } = useI18n();
  const sub = t("stats.sub");

  if (embedded) {
    return (
      <Reveal stagger={0.1}>
        <div>
          {showTitle ? (
            <div className="flex flex-col gap-3">
              <h2 className="rgb-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("stats.title")}
              </h2>
              {sub?.trim() ? (
                <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted))]">{sub}</p>
              ) : null}
            </div>
          ) : null}

          {showCards ? (
            <div className={(showTitle ? "mt-8 " : "") + "grid gap-4 sm:grid-cols-2 lg:grid-cols-5"}>
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5"
                >
                  <div className="text-2xl font-semibold">{s.value}</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">{s.label}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Reveal>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 sm:p-10">
          <Reveal stagger={0.1}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="rgb-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {t("stats.title")}
              </h2>
              {sub?.trim() ? (
                <p className="max-w-xl text-sm leading-relaxed text-[rgb(var(--muted))]">{sub}</p>
              ) : null}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {stats.map((s) => (
                <div
                  key={s.value}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--bg))] p-5"
                >
                  <div className="text-2xl font-semibold">{s.value}</div>
                  <div className="mt-2 text-sm text-[rgb(var(--muted))]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}