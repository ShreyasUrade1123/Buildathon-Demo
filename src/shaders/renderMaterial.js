import * as THREE from 'three'

export const renderVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const renderFragmentShader = `
uniform sampler2D uTexture;     // The background image
uniform sampler2D uDataTexture; // The fluid simulation FBO
uniform vec2 uResolution;

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Simple 2D Noise for organic shapes
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

void main() {
    // Sample the fluid data
    // R=VelX, G=VelY, B=Density
    vec4 fluid = texture2D(uDataTexture, vUv);
    
    vec2 velocity = fluid.xy;
    float density = fluid.b;
    
    //--- 1. DISPLACEMENT (The Liquid Warp) ---
    float distortionStrength = 0.04;
    // We warp the UVs based on velocity so the image ripples
    vec2 distortedUv = vUv - velocity * distortionStrength;
    vec4 color = texture2D(uTexture, distortedUv);
    
    //--- 2. THE REVEAL MASK (Smoother Organic Shape) ---
    // Generate softer noise pattern
    float n = noise(vUv * 2.0); // Lower frequency for smoother waves
    
    // Distort the density field slightly (smoother than before)
    float organicDensity = density + (n - 0.5) * 0.1; // Reduced distortion amplitude
    
    // Wide reveal mask
    float revealMask = smoothstep(0.0, 0.35, organicDensity);
    
    // Apply reveal mask - Start with Black
    vec3 finalColor = color.rgb * revealMask;
    

    
    //--- CINEMATIC POLISH ---
    // Add noise only where the image is visible
    float grain = random(vUv * 100.0);
    finalColor += grain * 0.03 * revealMask; 
    
    // Vignette
    vec2 uv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - length(uv * 0.5);
    finalColor *= smoothstep(0.0, 1.5, vignette);

    gl_FragColor = vec4(finalColor, 1.0);
}
`