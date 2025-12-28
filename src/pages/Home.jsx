import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FluidBackground from '../components/FluidBackground';
import IntroOverlay from '../components/IntroOverlay';

export default function Home() {
    const [introFinished, setIntroFinished] = useState(false);
    const navigate = useNavigate();

    return (
        <>
            <IntroOverlay onComplete={() => setIntroFinished(true)} />

            {/* Background stays persistent */}
            <FluidBackground />

            {/* Main Content - Only visible after intro */}
            <motion.main
                className={`relative z-10 w-full h-screen flex flex-col justify-between p-8 md:p-16 text-[#ececec] pointer-events-none ${!introFinished ? 'opacity-0' : 'opacity-100'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: introFinished ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                {/* Header */}
                <header className="flex justify-between items-center pointer-events-auto">
                    <div className="text-sm tracking-widest uppercase opacity-70">Dec 28 — Dec 31</div>
                    <div className="text-sm font-bold tracking-widest uppercase text-red-500">MegaLLM</div>
                </header>

                {/* Center Hero */}
                <div className="text-center space-y-6 pointer-events-auto">
                    <p className="text-red-400 tracking-[0.2em] text-sm uppercase">One Last Code</p>
                    <h1 className="text-6xl md:text-8xl font-serif text-[#e8cfa8]">
                        CHRISTMAS <br /> GLOW
                    </h1>

                    <div className="pt-12">
                        <button
                            onClick={() => navigate('/register')}
                            className="group relative px-8 py-3 overflow-hidden rounded-full bg-transparent border border-[#e8cfa8]/30 transition-all hover:border-[#e8cfa8]"
                        >
                            <div className="absolute inset-0 w-0 bg-[#e8cfa8] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
                            <span className="relative text-sm font-bold tracking-widest uppercase text-[#e8cfa8] group-hover:text-white">
                                Register Now
                            </span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="flex justify-between items-end pointer-events-auto">
                    <div className="text-xs text-gray-500 max-w-[200px]">
                        Turn sound on for full experience. <br />Drag mouse to reveal.
                    </div>
                    <div className="text-right">
                        <p className="text-xs uppercase tracking-widest text-gray-500">Status</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                            <span className="text-sm font-medium">Live</span>
                        </div>
                    </div>
                </footer>
            </motion.main>
        </>
    );
}