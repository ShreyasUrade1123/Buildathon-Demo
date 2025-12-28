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
uniform vec2 uMouseVelocity; // New: Mouse Velocity for impulse direction
uniform vec2 uResolution;
uniform float uViscosity;    // Controls how much the fluid resists flow
uniform float uDissipation;  // Controls how fast velocity fades (Drag)
uniform float uDensityDissipation; // Controls how fast the visual trail fades

varying vec2 vUv;

// Advection logic: trace back where the fluid came from
vec4 advect(sampler2D tex, vec2 uv, float dt) {
    // Read current velocity at this pixel
    vec2 vel = texture2D(tex, uv).xy;
    
    // Trace back: where was this packet of fluid one step ago?
    // We follow the velocity vector backwards.
    // texelSize is 1.0 / resolution
    vec2 coord = uv - vel * 0.002; // 0.002 is a "time step" magic number, could be uniform
    
    return texture2D(tex, coord);
}

void main() {
    // 1. Advection Step
    // Move the fluid field along its own velocity
    // Data packing: R=VelX, G=VelY, B=Density, A=Unused
    vec4 data = advect(uTexture, vUv, 0.016);
    
    // 2. External Forces (Mouse Input)
    vec2 mouse = uMouse;
    float dist = distance(vUv, mouse);
    
    // Splat Radius
    float radius = 0.12; // Massive reveal brush
    float splat = exp(-pow(dist / radius, 2.0));
    
    // Impulse: Add mouse velocity to the fluid velocity field
    // We scale it down so it's not too explosive
    vec2 impulse = uMouseVelocity * 8.0 * splat;
    
    // Add Density: Just adding "dye" where the mouse is
    float densitySource = splat * 1.0; 
    
    // Apply changes
    data.xy += impulse; // Add velocity
    data.b += densitySource; // Add density
    
    // 3. Dissipation / Decay
    
    // Velocity Drag (Viscosity)
    // Higher viscosity = stops faster
    // We used uViscosity before, but really this is drag.
    // Let's use uDissipation for velocity decay.
    data.xy *= 0.96; 
    
    // Density Fade
    // This controls how long the "trail" lasts visually
    // User wanted "heavy", so it should linger.
    data.b *= 0.94;
    
    // Clamp to prevent blowout
    data.xy = clamp(data.xy, -5.0, 5.0);
    data.b = clamp(data.b, 0.0, 5.0);
    
    gl_FragColor = data;
}
`
