"use client";

import Container from "./Container";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";
import { useI18n } from "@/components/I18nProvider";

export default function LetsWork({ embedded = false }: { embedded?: boolean }) {
  const { t } = useI18n();

  if (embedded) {
    return (
      <Reveal>
        <div>
          <div className="text-xs font-medium text-[rgb(var(--muted))]">{t("contact.kicker")}</div>
          <h2 className="rgb-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">{t("contact.sub")}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <MagneticButton>
              <a
                href="mailto:hello@d.creator"
                className="rounded-full bg-neutral-900 px-5 py-3 text-sm text-white hover:bg-neutral-800 transition dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                {t("contact.email")}
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#"
                className="rounded-full border border-[rgb(var(--border))] px-5 py-3 text-sm hover:bg-[rgb(var(--card))] transition"
              >
                {t("contact.book")}
              </a>
            </MagneticButton>
          </div>

          <div className="mt-6 rounded-2xl border border-[rgb(var(--border))] p-5 text-sm text-[rgb(var(--muted))]">
            <div className="font-medium text-[rgb(var(--fg))]">Office Location</div>
            <div className="mt-2">London</div>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <section id="contact" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-[rgb(var(--border))] p-6 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="text-xs font-medium text-[rgb(var(--muted))]">
                  {t("contact.kicker")}
                </div>
                <h2 className="rgb-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t("contact.title")}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[rgb(var(--muted))]">
                  {t("contact.sub")}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <MagneticButton>
                    <a
                      href="mailto:hello@d.creator"
                      className="rounded-full bg-neutral-900 px-5 py-3 text-sm text-white hover:bg-neutral-800 transition dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200"
                    >
                      {t("contact.email")}
                    </a>
                  </MagneticButton>
                  <MagneticButton>
                    <a
                      href="#"
                      className="rounded-full border border-[rgb(var(--border))] px-5 py-3 text-sm hover:bg-[rgb(var(--card))] transition"
                    >
                      {t("contact.book")}
                    </a>
                  </MagneticButton>
                </div>

                <div className="mt-6 rounded-2xl border border-[rgb(var(--border))] p-5 text-sm text-[rgb(var(--muted))]">
                  <div className="font-medium text-[rgb(var(--fg))]">Office Location</div>
                  <div className="mt-2">London</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}