"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function EnergyLine({
  progressRef,
  thickness = 0.025,
  mode = "dark"
}: {
  progressRef: React.MutableRefObject<number>;
  thickness?: number;
  mode?: "dark" | "light";
}) {
  const matRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  type PatchedShader = {
    uniforms: Record<string, { value: unknown }>;
    vertexShader: string;
    fragmentShader: string;
  };

  const geo = useMemo(() => {
    const path = new THREE.LineCurve3(
      new THREE.Vector3(0, -2.9, 0),
      new THREE.Vector3(0, 2.9, 0)
    );
    return new THREE.TubeGeometry(path, 120, thickness, 10, false);
  }, [thickness]);

  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;

    const palette =
      mode === "light"
        ? {
            silver: "vec3(0.98, 0.98, 0.985)",
            charcoal: "vec3(0.86, 0.87, 0.885)",
            baseAlpha: 0.035,
            baseMix: 0.70,
          }
        : {
            silver: "vec3(0.78, 0.80, 0.82)",
            charcoal: "vec3(0.06, 0.06, 0.07)",
            baseAlpha: 0.10,
            baseMix: 0.18,
          };

    mat.onBeforeCompile = (shader: PatchedShader) => {
      shader.uniforms.uProgress = { value: 0 };
      shader.uniforms.uTime = { value: 0 };

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>\nvarying vec3 vPos;\nvarying vec3 vN;`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <beginnormal_vertex>",
        `#include <beginnormal_vertex>\nvN = normalize(objectNormal);`
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\nvPos = transformed;`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>\n\nuniform float uProgress;\nuniform float uTime;\nvarying vec3 vPos;\nvarying vec3 vN;\n\nfloat hash21(vec2 p){\n  p = fract(p*vec2(123.34, 345.45));\n  p += dot(p, p+34.345);\n  return fract(p.x*p.y);\n}\n\nfloat noise(vec2 p){\n  vec2 i=floor(p);\n  vec2 f=fract(p);\n  float a=hash21(i);\n  float b=hash21(i+vec2(1.0,0.0));\n  float c=hash21(i+vec2(0.0,1.0));\n  float d=hash21(i+vec2(1.0,1.0));\n  vec2 u=f*f*(3.0-2.0*f);\n  return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;\n}`
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        `
        float y = (vPos.y + 2.9) / 5.8; // 0..1
        float band = smoothstep(uProgress-0.075, uProgress, y) * (1.0 - smoothstep(uProgress, uProgress+0.11, y));
        float micro = noise(vPos.xz*22.0 + uTime*0.05) * 0.08 + noise(vPos.zy*10.0 - uTime*0.035) * 0.06;

        vec3 N = normalize(vN);
        vec3 V = normalize(vViewPosition);
        float fres = pow(1.0 - clamp(dot(N, -V), 0.0, 1.0), 3.0);

        float highlight = band * (0.85 + micro);
        vec3 silver = ${palette.silver};
        vec3 charcoal = ${palette.charcoal};

        vec3 col = mix(charcoal, silver, ${palette.baseMix} + fres*0.22);
        col += silver * highlight;

        float a = ${palette.baseAlpha} + highlight * 0.72;
        a = clamp(a, 0.0, 0.98);

        gl_FragColor = vec4(col, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        `
      );

      (mat as unknown as { userData: { shader?: PatchedShader } }).userData.shader = shader;
    };

    mat.needsUpdate = true;
  }, [mode]);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const mat = matRef.current;
    if (!mat) return;
    const shader = (mat as unknown as { userData?: { shader?: PatchedShader } }).userData?.shader;
    if (!shader) return;

    shader.uniforms.uTime.value = state.clock.getElapsedTime();
    shader.uniforms.uProgress.value = THREE.MathUtils.clamp(progressRef.current, 0, 1);
  });

  return (
    <mesh geometry={geo}>
      <meshPhysicalMaterial
        ref={(m: THREE.MeshPhysicalMaterial | null) => {
          matRef.current = m;
        }}
        color={mode === "light" ? "#f0f1f3" : "#0b0b0c"}
        transparent
        opacity={1}
        depthWrite={false}
        metalness={1}
        roughness={0.22}
        clearcoat={0.25}
        clearcoatRoughness={0.22}
        reflectivity={0.7}
      />
    </mesh>
  );
}
