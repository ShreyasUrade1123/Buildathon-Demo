import * as THREE from 'three'

export const simulationVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const simulationFragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform vec2 uResolution;
uniform float uViscosity;
uniform float uDissipation;
uniform float uDensityDissipation;

varying vec2 vUv;

// Advection logic
vec4 advect(sampler2D tex, vec2 uv, float dt) {
    vec2 vel = texture2D(tex, uv).xy;
    vec2 coord = uv - vel * 0.002;
    return texture2D(tex, coord);
}

void main() {
    // 1. Advection Step
    vec4 data = advect(uTexture, vUv, 0.016);
    
    // 2. External Forces (Mouse Input)
    vec2 mouse = uMouse;
    
    float aspect = uResolution.x / uResolution.y;
    vec2 aspectVec = vec2(aspect, 1.0);
    
    // Distance in aspect-corrected space
    float dist = distance(vUv * aspectVec, mouse * aspectVec);
    
    // --- DUAL SPLAT LOGIC ---
    
    // Splat 1: The "Heavy" Reveal (Blue Channel)
    float radiusReveal = 0.25; 
    float splatReveal = exp(-pow(dist / radiusReveal, 3.0));
    
    // Splat 2: The "Sharp" Red Trail (Alpha Channel)
    float radiusTrail = 0.025; 
    float splatTrail = exp(-pow(dist / radiusTrail, 3.0));
    
    // --- CHANGE 1: DECREASED IMPULSE FORCE ---
    // Was 8.0. Reducing to 3.0 makes the liquid react less violently.
    vec2 impulse = uMouseVelocity * 3.0 * splatReveal;
    
    // Apply changes
    data.xy += impulse;          // Add velocity
    data.b += splatReveal * 1.5; // Add Reveal Density (Blue)
    data.a += splatTrail * 2.0;  // Add Trail Density (Alpha)
    
    // --- CHANGE 2: INCREASED DRAG (Lower Decay) ---
    // Velocity Decay: Controls how slippery it feels.
    // Was 0.96. Lowering to 0.90 makes it stop much faster (less "sloshy").
    data.xy *= 0.90; 
    
    // Reveal Decay (Blue) - Controls how fast the image fades back to black
    data.b *= 0.94;
    
    // Trail Decay (Alpha) - Controls how fast the red line fades
    data.a *= 0.92;
    
    // Clamp
    data.xy = clamp(data.xy, -5.0, 5.0);
    data.b = clamp(data.b, 0.0, 5.0);
    data.a = clamp(data.a, 0.0, 5.0);
    
    gl_FragColor = data;
}
`