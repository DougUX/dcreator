import Providers from "../providers";
import { I18nProvider } from "@/components/I18nProvider";
import { isLocale, type Locale } from "@/lib/i18n";
import GlobalRgbEffect from "@/components/GlobalRgbEffect";
import BookingPanel from "@/components/BookingPanel";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";

  return (
    <I18nProvider locale={locale}>
      <Providers>
        <GlobalRgbEffect />
        <BookingPanel />
        {children}
      </Providers>
    </I18nProvider>
  );
}
