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

void main() {
    // Sample the fluid data
    // R=VelX, G=VelY, B=Density
    vec4 fluid = texture2D(uDataTexture, vUv);
    
    vec2 velocity = fluid.xy;
    float density = fluid.b;
    
    //--- DISPLACEMENT (WARPING) ---
    // Use the velocity to warp the UVs of the underlying image
    // Stronger velocity = stronger warp
    float distortionStrength = 0.04;
    vec2 distortedUv = vUv - velocity * distortionStrength;
    
    // Sample background with distorted UVs
    vec4 color = texture2D(uTexture, distortedUv);
    
    //--- MASKING (REVEAL) ---
    // Only show the image where there is "density" (fluid)
    float mask = smoothstep(0.0, 0.2, density);
    
    // Apply mask - Start with Black
    vec3 finalColor = color.rgb * mask;
    
    //--- RED GLOW (ADDITIVE) ---
    // User wants a "Christmas Glow" / Red Neon look.
    // Additive blending based on density.
    vec3 neonRed = vec3(1.0, 0.2, 0.05); // Orange-Red
    
    // Glow intensity
    float glowIntensity = density * 1.5; 
    
    // Add the glow
    finalColor += neonRed * glowIntensity;
    
    //--- CINEMATIC POLISH ---
    // Noise/Grain for texture
    float noise = random(vUv * 100.0);
    finalColor += noise * 0.03 * mask; // Only add noise where visible
    
    // Vignette
    vec2 uv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - length(uv * 0.5);
    finalColor *= smoothstep(0.0, 1.5, vignette);

    gl_FragColor = vec4(finalColor, 1.0);
}
`
