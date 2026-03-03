"use client";

import Container from "./Container";
import { useI18n } from "@/components/I18nProvider";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-[rgb(var(--border))] py-6">
      <Container>
        <div className="flex flex-col">
          <div className="text-sm text-[rgb(var(--muted))] text-left">
            © {new Date().getFullYear()} d.creator. {t("footer.rights")}
          </div>
        </div>
      </Container>
    </footer>
  );
}