
import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { simulationVertexShader, simulationFragmentShader } from '../shaders/simulationMaterial';
import { renderVertexShader, renderFragmentShader } from '../shaders/renderMaterial';

// Helper to create shader materials
const SimulationMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null }, // Previous frame
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) }, // NEW
        uResolution: { value: new THREE.Vector2(0, 0) },
        uViscosity: { value: 0.98 },
        uDissipation: { value: 0.96 },
        uDensityDissipation: { value: 0.94 } // NEW
    },
    vertexShader: simulationVertexShader,
    fragmentShader: simulationFragmentShader
};

const RenderMaterial = {
    uniforms: {
        uTexture: { value: null }, // Background image
        uDataTexture: { value: null }, // Fluid simulation
        uResolution: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: renderVertexShader,
    fragmentShader: renderFragmentShader
};

const FluidBackground = () => {
    const { size, gl, pointer, viewport } = useThree();
    // Load local image from public folder
    const texture = useTexture('Images/ChatGPT Image Dec 28, 2025, 05_25_54 PM.png');

    // Resolution: Higher = nicer liquid, lower = more pixelated/performant
    const simRes = 256;

    const options = {
        format: THREE.RGBAFormat,
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        stencilBuffer: false,
        depthBuffer: false,
    };

    const readFBO = useMemo(() => new THREE.WebGLRenderTarget(simRes, simRes, options), []);
    const writeFBO = useMemo(() => new THREE.WebGLRenderTarget(simRes, simRes, options), []);

    const simMaterial = useMemo(() => new THREE.ShaderMaterial(SimulationMaterial), []);
    const renderMaterial = useMemo(() => new THREE.ShaderMaterial(RenderMaterial), []);

    const simScene = useMemo(() => new THREE.Scene(), []);
    const simCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);
    const simQuad = useMemo(() => {
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), simMaterial);
        simScene.add(mesh);
        return mesh;
    }, [simMaterial, simScene]);

    const finalMesh = useRef();

    // Refs for tracking mouse velocity
    const lastMouse = useRef(new THREE.Vector2(0, 0));

    // FBO Swapping Refs
    const fboRead = useRef(readFBO);
    const fboWrite = useRef(writeFBO);

    useFrame((state, delta) => {
        // --- 1. MOUSE VELOCITY CALCULATION ---
        // Pointer is normalized (-1 to 1). 
        // We want velocity in UV space or just raw speed.
        // Let's use UV space (0 to 1) for shader consistency.

        const currentMouse = new THREE.Vector2((pointer.x + 1) / 2, (pointer.y + 1) / 2);

        // Velocity = (current - last) / delta (optional, or just raw diff)
        // Raw diff is often safer for shaders to avoid crazy spikes on small deltas
        const velocity = new THREE.Vector2()
            .subVectors(currentMouse, lastMouse.current)
        // .divideScalar(Math.max(delta, 0.001)); // If we want true speed

        // Allow some "jump" threshold to ignore teleporting (e.g. init)
        if (velocity.length() > 0.5) velocity.set(0, 0);

        lastMouse.current.copy(currentMouse);

        // --- 2. UPDATE SIMULATION ---
        simMaterial.uniforms.uTime.value = state.clock.elapsedTime;
        simMaterial.uniforms.uTexture.value = fboRead.current.texture;
        simMaterial.uniforms.uMouse.value.copy(currentMouse);
        simMaterial.uniforms.uMouseVelocity.value.copy(velocity);
        simMaterial.uniforms.uResolution.value.set(size.width, size.height);

        // --- 3. RENDER SIMULATION ---
        gl.setRenderTarget(fboWrite.current);
        gl.render(simScene, simCamera);
        gl.setRenderTarget(null);

        // --- 4. UPDATE DISPLAY MATERIAL ---
        if (finalMesh.current) {
            finalMesh.current.material.uniforms.uDataTexture.value = fboWrite.current.texture;
            finalMesh.current.material.uniforms.uTexture.value = texture;
            // Fix stretch if needed
            // finalMesh.current.scale.set(viewport.width, viewport.height, 1);
        }

        // --- 5. SWAP BUFFERS ---
        const t = fboRead.current;
        fboRead.current = fboWrite.current;
        fboWrite.current = t;
    });

    return (
        <mesh ref={finalMesh} scale={[viewport.width, viewport.height, 1]}>
            {/* Full viewport plane */}
            <planeGeometry args={[1, 1]} />
            <primitive object={renderMaterial} attach="material" />
        </mesh>
    );
};

export default FluidBackground;