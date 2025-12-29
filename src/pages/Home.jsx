import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FluidBackground from '../components/FluidBackground';
import SplashCursor from '../components/SplashCursor'; // 1. Import the component

export default function Home() {
    return (
        <>
            {/* 2. SplashCursor - Placed here to sit on top of the background */}
            {/* It has fixed positioning and z-index built-in, so it will overlay correctly */}
            <SplashCursor />

            {/* Fluid Background - Home Exclusive - Optimization: Clamp DPR */}
            <div className="fixed inset-0 z-0 h-full w-full">
                <Canvas dpr={[1, 2]} orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <FluidBackground />
                    </Suspense>
                </Canvas>
            </div>

            <main className="relative z-10 w-full h-screen flex flex-col justify-between p-6 md:p-12 lg:p-20 text-[#ececec] pointer-events-none select-none">
                {/* Header */}
                <Header />

                {/* Center Hero */}
                <Hero />

                {/* Footer */}
                <Footer />
            </main>
        </>
    );
}