import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FluidBackground from '../components/FluidBackground';

export default function Home() {
    return (
        <>
            {/* Fluid Background - Home Exclusive */}
            <div className="fixed inset-0 z-0 h-full w-full">
                <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <FluidBackground />
                    </Suspense>
                </Canvas>
            </div>

            <main className="relative z-10 w-full h-screen flex flex-col justify-between p-12 md:p-20 text-[#ececec] pointer-events-none select-none">
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
