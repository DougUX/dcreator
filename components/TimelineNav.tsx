"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";

type TimelineNavProps = {
  years: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function TimelineNav({ years, activeIndex, onSelect }: TimelineNavProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const items = useMemo(() => years.map((y, i) => ({ y, i })), [years]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const el = wrap.querySelector<HTMLButtonElement>(`button[data-i='${activeIndex}']`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    const wr = wrap.getBoundingClientRect();
    setUnderline({ left: r.left - wr.left, width: r.width });
  }, [activeIndex]);

  return (
    <div className="relative mt-6">
      <div ref={wrapRef} className="relative flex flex-wrap items-center gap-2">
        <div className="text-[11px] uppercase tracking-[0.32em] text-white/60">Process</div>
        {items.map(({ y, i }) => {
          const active = i === activeIndex;
          return (
            <button
              key={y}
              type="button"
              data-i={i}
              onClick={() => onSelect(i)}
              className={[
                "relative rounded-full px-2.5 py-1 text-[11px] tracking-[0.14em]",
                active ? "text-white" : "text-white/40 hover:text-white/70",
                "transition",
              ].join(" ")}
            >
              {y}
            </button>
          );
        })}

        <div
          className="pointer-events-none absolute -bottom-1.5 h-px bg-white/70"
          style={{
            left: underline.left,
            width: underline.width,
            transition: "left 520ms cubic-bezier(0.22,1,0.36,1), width 520ms cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}
