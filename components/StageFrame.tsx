import type { PropsWithChildren } from "react";

type StageFrameProps = PropsWithChildren<{
  className?: string;
}>;

export default function StageFrame({ children, className }: StageFrameProps) {
  return (
    <div
      className={[
        "relative mx-auto w-full",
        "rounded-[36px] border border-white/25 bg-black",
        "shadow-[0_60px_140px_-80px_rgba(0,0,0,0.95)]",
        className ?? "",
      ].join(" ")}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[36px]">
        <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(closest-side_at_50%_45%,rgba(255,255,255,0.06),rgba(0,0,0,0)_70%)]" />
        <div className="absolute inset-0 rounded-[36px] bg-[radial-gradient(closest-side_at_50%_120%,rgba(0,0,0,0.55),rgba(0,0,0,0)_70%)]" />
        <div className="stage-grain absolute inset-0 rounded-[36px] opacity-[0.28]" />
      </div>

      <div className="relative overflow-hidden rounded-[36px]">{children}</div>
    </div>
  );
}
