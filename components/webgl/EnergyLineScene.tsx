"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "next-themes";
import EnergyLine from "@/components/webgl/EnergyLine";

export default function EnergyLineScene({
  progressRef,
  reducedMotion
}: {
  progressRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "light" ? "light" : "dark";

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0.10, 0.0, 3.35], fov: 54, near: 0.1, far: 20 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={mode === "light" ? 0.22 : 0.06} />
      <directionalLight position={[0.35, 1.9, 1.35]} intensity={mode === "light" ? 0.9 : 1.15} color={"#ffffff"} />
      <directionalLight position={[-1.65, 0.35, 1.1]} intensity={mode === "light" ? 0.42 : 0.65} color={"#c7ccd2"} />
      <directionalLight position={[1.7, -0.35, 1.05]} intensity={mode === "light" ? 0.38 : 0.6} color={"#d0d4d9"} />
      <directionalLight position={[0.25, 0.0, 2.2]} intensity={mode === "light" ? 0.18 : 0.25} color={"#ffffff"} />

      <EnergyLine progressRef={progressRef} thickness={0.022} mode={mode} />

      {!reducedMotion ? (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={mode === "light" ? 0.92 : 0.86}
            intensity={mode === "light" ? 0.045 : 0.075}
            mipmapBlur
          />
        </EffectComposer>
      ) : null}
    </Canvas>
  );
}
