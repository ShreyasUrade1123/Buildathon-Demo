
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Just in case, though Header handles nav usually or we use Header component
import { CheckCircle } from 'lucide-react';
import Header from '../components/Header'; // Reusing existing Header
import SuccessCard from '../components/SuccessCard';

const Success = () => {
    return (
        <div className="relative min-h-screen w-full bg-[#050505] overflow-hidden">
            {/* 1. Reuse Home Header */}
            <Header />

            {/* 2. Physics Card Effect (Full Screen) */}
            <div className="absolute inset-0 z-10">
                <SuccessCard />
            </div>

            {/* 3. Success Toast / Message */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#333] px-8 py-5 rounded-lg flex items-center gap-4 shadow-2xl z-20"
            >
                <CheckCircle className="text-green-500" size={24} />
                <div>
                    <h4 className="text-base font-bold text-white">Registered Successfully</h4>
                    <p className="text-sm text-gray-400">See you on the leaderboard.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
