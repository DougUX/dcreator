"use client";

import { Children, cloneElement, isValidElement, useEffect, useState } from "react";

export default function StackedPanels({ children }: { children: React.ReactNode }) {
  const panels = Children.toArray(children);
  const [useStack, setUseStack] = useState(true);

  const hasFlowPanel = panels.some((panel) => {
    if (!isValidElement(panel)) return false;
    const props = panel.props as Record<string, unknown>;
    return props["data-stack"] === "flow";
  });

  useEffect(() => {
    const mCoarse = window.matchMedia?.("(pointer: coarse)");
    const mSmall = window.matchMedia?.("(max-width: 1023px)");

    const update = () => {
      const coarse = mCoarse?.matches ?? false;
      const small = mSmall?.matches ?? false;
      setUseStack(!(coarse || small || hasFlowPanel));
    };

    update();
    mCoarse?.addEventListener?.("change", update);
    mSmall?.addEventListener?.("change", update);
    window.addEventListener("resize", update);
    return () => {
      mCoarse?.removeEventListener?.("change", update);
      mSmall?.removeEventListener?.("change", update);
      window.removeEventListener("resize", update);
    };
  }, [hasFlowPanel]);

  if (!useStack) {
    return <>{children}</>;
  }

  return (
    <div className="relative" style={{ height: `${panels.length * 100}svh` }}>
      {panels.map((panel, i) => {
        let wrapperId: string | undefined;
        let content = panel;

        if (isValidElement(panel)) {
          const id = (panel.props as { id?: unknown }).id;
          if (typeof id === "string") {
            wrapperId = id;
            content = cloneElement(panel, { id: undefined } as Record<string, unknown>);
          }
        }

        return (
          <div key={i} id={wrapperId} className="relative h-[100svh] w-full" style={{ zIndex: 10 + i }}>
            <div className="sticky top-0 h-[100svh] w-full">{content}</div>
          </div>
        );
      })}
    </div>
  );
}
