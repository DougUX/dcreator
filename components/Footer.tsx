"use client";

import Container from "./Container";
import { useI18n } from "@/components/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[rgb(var(--border))] py-10">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[rgb(var(--muted))]">
            © {new Date().getFullYear()} d.creator. {t("footer.rights")}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[rgb(var(--muted))]">
            <a href="#" className="hover:text-[rgb(var(--fg))] transition">
              Facebook
            </a>
            <a href="#" className="hover:text-[rgb(var(--fg))] transition">
              Twitter
            </a>
            <a href="#" className="hover:text-[rgb(var(--fg))] transition">
              Dribbble
            </a>
            <a href="#" className="hover:text-[rgb(var(--fg))] transition">
              Instagram
            </a>
            <a href="#" className="hover:text-[rgb(var(--fg))] transition">
              YouTube
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}