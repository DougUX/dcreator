"use client";

export default function WhatsAppFloatingButton() {
  const wa = "https://wa.me/447397392319";
  const tel = "tel:+447397392319";

  return (
    <div className="fixed bottom-5 left-5 z-[200] flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          window.open(wa, "_blank", "noopener,noreferrer");
        }}
        aria-label="WhatsApp me"
        className={[
          "group inline-flex h-12 items-center",
          "w-12 hover:w-[172px]",
          "gap-3 px-3",
          "rounded-full border border-[rgb(var(--border))]",
          "bg-[rgb(var(--bg))]/70 backdrop-blur",
          "hover:bg-[rgb(var(--card))]",
          "transition-[width,background-color] duration-200 ease-out",
          "overflow-hidden"
        ].join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-6 w-6 shrink-0"
          fill="currentColor"
        >
          <path d="M19.11 17.42c-.25-.12-1.46-.72-1.69-.8-.23-.08-.4-.12-.57.12-.17.25-.65.8-.8.97-.15.17-.3.2-.55.08-.25-.12-1.06-.39-2.02-1.23-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.39.11-.52.12-.12.25-.3.37-.45.12-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.12-.57-1.36-.78-1.86-.21-.5-.43-.43-.57-.43h-.48c-.17 0-.45.06-.68.32-.23.25-.9.88-.9 2.14s.92 2.47 1.05 2.65c.12.17 1.8 2.75 4.36 3.85.61.26 1.08.41 1.45.52.61.19 1.17.16 1.61.1.49-.07 1.46-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.22-.16-.47-.28ZM16 3C9.38 3 4 8.19 4 14.56c0 2.25.67 4.34 1.82 6.12L4 29l8.57-1.75c1.07.3 2.21.47 3.43.47 6.62 0 12-5.19 12-11.56S22.62 3 16 3Zm0 22.1c-1.16 0-2.26-.19-3.28-.53l-.74-.25-5.09 1.04 1.06-4.87-.48-.77c-1.08-1.7-1.65-3.65-1.65-5.67C5.82 9.62 10.34 5.3 16 5.3s10.18 4.32 10.18 9.76S21.66 25.1 16 25.1Z" />
        </svg>

        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[rgb(var(--fg))] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          WhatsApp me
        </span>
      </button>

      <button
        type="button"
        onClick={() => {
          window.location.href = tel;
        }}
        aria-label="Call me"
        className={[
          "group inline-flex h-12 items-center",
          "w-12 hover:w-[152px]",
          "gap-3 px-3",
          "rounded-full border border-[rgb(var(--border))]",
          "bg-[rgb(var(--bg))]/70 backdrop-blur",
          "hover:bg-[rgb(var(--card))]",
          "transition-[width,background-color] duration-200 ease-out",
          "overflow-hidden"
        ].join(" ")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-6 w-6 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92z" />
        </svg>

        <span className="whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.16em] text-[rgb(var(--fg))] opacity-0 transition-opacity duration-150 group-hover:opacity-100">
          Call me
        </span>
      </button>
    </div>
  );
}
