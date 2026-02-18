"use client";

import { ThemeProvider } from "next-themes";
import SmoothScroll from "@/components/SmoothScroll";
import CursorFollower from "@/components/CursorFollower";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SmoothScroll>
        <ScrollProgressBar />
        <CursorFollower />
        <WhatsAppFloatingButton />
        {children}
      </SmoothScroll>
    </ThemeProvider>
  );
}