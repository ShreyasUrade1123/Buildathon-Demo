import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            navigate('/success');
        }, 800);
    };

    return (
        <div className="min-h-screen w-full bg-[#050505] text-[#e8cfa8] relative overflow-hidden flex items-center justify-center p-6 pointer-events-auto">

            {/* Subtle Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#e8cfa8]/5 rounded-full blur-[100px]" />

            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
                <ArrowLeft size={16} /> Back
            </Link>

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-neue mb-2 text-center">Join the Buildathon</h2>
                    <p className="text-center text-gray-500 text-sm mb-12">Submit your project details below.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Project Name</label>
                            <input required type="text" className="w-full bg-transparent border-b border-gray-800 py-3 text-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-800" placeholder="e.g. SkyWinks" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Description</label>
                            <textarea required rows="2" className="w-full bg-transparent border-b border-gray-800 py-3 text-lg focus:outline-none focus:border-red-500 transition-colors placeholder-gray-800 resize-none" placeholder="Short pitch..." />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-gray-500">Repo Link</label>
                                <input required type="url" className="w-full bg-transparent border-b border-gray-800 py-3 text-base focus:outline-none focus:border-red-500 transition-colors" placeholder="github.com/..." />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs uppercase tracking-widest text-gray-500">Socials</label>
                                <input type="text" className="w-full bg-transparent border-b border-gray-800 py-3 text-base focus:outline-none focus:border-red-500 transition-colors" placeholder="@username" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-8 bg-[#e8cfa8] text-black font-bold uppercase tracking-widest py-4 hover:bg-white transition-colors"
                        >
                            Submit Project
                        </button>
                    </form>
                </motion.div>
            </div>

        </div>
    );
}
