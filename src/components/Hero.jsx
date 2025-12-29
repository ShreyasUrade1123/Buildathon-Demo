import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col justify-center items-center text-center -mt-10 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 pointer-events-none"
            >
                <div className="flex flex-col items-center gap-4 mb-6">
                    <span className="h-[1px] w-8 bg-[#e8cfa8]/30"></span>
                    <p className="text-[#e8cfa8] tracking-[0.4em] text-[10px] md:text-xs uppercase font-light">
                        The Last Code of the Year
                    </p>
                    <span className="h-[1px] w-8 bg-[#e8cfa8]/30"></span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-9xl font-medium text-[#e8cfa8] tracking-tight leading-[0.9]">
                    <span className="block font-NeueHaasGrotesk font-medium text-[#f0ebe3]">MegaLLM</span>
                    <span className="block italic font-serif text-[#e8cfa8] opacity-80 text-3xl md:text-5xl lg:text-7xl mt-2">Buildathon</span>
                </h1>
            </motion.div>

            <motion.div
                className="pt-12 pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                <button
                    onClick={() => navigate('/register')}
                    className="group relative px-12 py-4 overflow-hidden rounded-full bg-transparent border-[0.5px] border-[#e8cfa8]/40 transition-all duration-700 hover:border-[#e8cfa8] hover:bg-[#e8cfa8]/5 cursor-pointer"
                >
                    <span className="relative text-xs font-medium tracking-[0.3em] uppercase text-[#e8cfa8] group-hover:text-[#fff] transition-colors duration-500">
                        Register Now
                    </span>
                </button>
            </motion.div>
        </div>
    );
};

export default Hero;
