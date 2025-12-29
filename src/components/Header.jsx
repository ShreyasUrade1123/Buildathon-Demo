import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
            {/* INTERNAL TOP OFFSET & VISUAL PADDING */}
            {/* Reduced padding for mobile: px-6 md:px-12... */}
            <div className="pt-6 md:pt-8 pb-2 px-6 md:px-12 lg:px-48 xl:px-64">
                <div className="flex justify-between items-start">

                    {/* Logo */}
                    <Link to="/" className="flex flex-col pointer-events-auto cursor-pointer group z-50 relative">
                        <span className="text-2xl md:text-3xl font-space text-[#e8cfa8] tracking-tigh leading-none transition-colors group-hover:text-[#f0ebe3]">
                            MegaLLM
                        </span>
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#e8cfa8]/50 transition-colors group-hover:text-[#e8cfa8]/80">
                            Buildathon 25
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6 text-xs md:text-sm tracking-wide text-[#e8cfa8] font-light pointer-events-auto">
                        <Link to="/" className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors focus:ring-0">
                            Home
                        </Link>
                        <button className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors focus:ring-0">
                            About
                        </button>
                        <button className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors flex items-start gap-1 focus:ring-0">
                            Imprint
                            <span className="text-[8px] -translate-y-[1px]">↗</span>
                        </button>
                    </nav>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden pointer-events-auto text-[#e8cfa8] focus:outline-none z-50 relative p-2"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`block w-full h-0.5 bg-current transform transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                        </div>
                    </button>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/95 z-40 md:hidden flex flex-col items-center justify-center pointer-events-auto"
                    >
                        <nav className="flex flex-col items-center gap-8 text-xl tracking-widest text-[#e8cfa8] font-light">
                            <Link
                                to="/"
                                onClick={toggleMenu}
                                className="hover:text-white transition-colors"
                            >
                                Home
                            </Link>
                            <button
                                onClick={toggleMenu}
                                className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors"
                            >
                                About
                            </button>
                            <button
                                onClick={toggleMenu}
                                className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors flex items-start gap-1"
                            >
                                Imprint
                                <span className="text-xs -translate-y-[2px]">↗</span>
                            </button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
