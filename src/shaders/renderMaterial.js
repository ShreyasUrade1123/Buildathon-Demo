import * as THREE from 'three'

export const renderVertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const renderFragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform vec2 uResolution;

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

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
    vec4 fluid = texture2D(uDataTexture, vUv);
    vec2 velocity = fluid.xy;
    float density = fluid.b;
    
    // Distortion
    float distortionStrength = 0.04;
    vec2 distortedUv = vUv - velocity * distortionStrength;
    vec4 color = texture2D(uTexture, distortedUv);
    
    // Reveal Mask
    float n = noise(vUv * 2.0);
    float organicDensity = density + (n - 0.5) * 0.1;
    float revealMask = smoothstep(0.0, 0.35, organicDensity);
    
    // Final Color (Just the image)
    vec3 finalColor = color.rgb * revealMask;
    
    // Polish
    float grain = random(vUv * 100.0);
    finalColor += grain * 0.03 * revealMask; 
    
    vec2 uv = vUv * 2.0 - 1.0;
    float vignette = 1.0 - length(uv * 0.5);
    finalColor *= smoothstep(0.0, 1.5, vignette);

    gl_FragColor = vec4(finalColor, 1.0);
}
`