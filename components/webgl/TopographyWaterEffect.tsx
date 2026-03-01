"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uHover;

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 st = vUv;
    st.x *= uResolution.x / uResolution.y;

    // Mouse distortion
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;
    
    float dist = distance(st, mouse);
    // Smooth ripple area around mouse
    float ripple = smoothstep(0.4, 0.0, dist) * uHover;
    
    // Animate noise
    vec2 pos = st * 2.5;
    
    // Add distortion from mouse ripple + time
    pos.x += snoise(pos + (uTime * uHover) * 0.1) * 0.2;
    pos.y += snoise(pos - (uTime * uHover) * 0.1) * 0.2;
    
    // Only progress time if mouse is hovering over the element
    float activeTime = uTime * uHover;

    // Distort noise field with mouse interaction (water ripple effect)
    pos += normalize(st - mouse) * ripple * 0.6 * sin(dist * 20.0 - activeTime * 4.0);

    // Get noise value
    float n = snoise(pos + activeTime * 0.05);

    // Create topographical contour lines
    // Multiply by number of contour lines wanted (Reduced from 8 to 3 as requested)
    n = n * 3.0; 
    
    // Extract smooth lines
    float line = fract(n);
    // Anti-alias the lines
    float fw = fwidth(line);
    // Center it
    line = smoothstep(0.5 - fw*2.0, 0.5, line) - smoothstep(0.5, 0.5 + fw*2.0, line);

    // Dark greyish glow for topography
    vec3 color = vec3(1.0) * line * 0.6;
    
    // Add a slight bright spot exactly at mouse
    color += vec3(0.05) * smoothstep(0.15, 0.0, dist) * uHover;

    gl_FragColor = vec4(color, 1.0);
}
`;

const TopoEffect = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(-10, -10) },
            uResolution: { value: new THREE.Vector2(size.width, size.height) },
            uHover: { value: 0 }
        }),
        [size.width, size.height]
    );

    useFrame((state) => {
        if (!meshRef.current) return;
        const material = meshRef.current.material as THREE.ShaderMaterial;
        material.uniforms.uTime.value = state.clock.getElapsedTime();

        // Raycast mouse to normalized device coords but mapped to 0-1 for shader UV
        const x = (state.pointer.x + 1) / 2;
        const y = (state.pointer.y + 1) / 2;

        // Smoothly lerp mouse pos for fluid water feel
        const targetHover = (state.pointer.x === 0 && state.pointer.y === 0) ? 0 : 1;
        material.uniforms.uHover.value = THREE.MathUtils.lerp(material.uniforms.uHover.value, targetHover, 0.05);

        material.uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.1);
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
};

export default function TopographyWaterEffect() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-auto">
            <Canvas
                camera={{ position: [0, 0, 1] }}
                dpr={[1, 2]} // Support retina displays
                gl={{ alpha: true, antialias: true }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            >
                <TopoEffect />
            </Canvas>
        </div>
    );
}
