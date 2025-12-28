import React from 'react';

const Header = () => {
    return (
        <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
            {/* INTERNAL TOP OFFSET & VISUAL PADDING */}
            <div className="pt-12 md:pt-16 pb-6 px-12 md:px-32 lg:px-48 xl:px-64">
                <div className="flex justify-between items-start">

                    {/* Logo */}
                    <div className="flex flex-col pointer-events-auto cursor-pointer group">
                        <span className="text-3xl md:text-4xl font-serif text-[#e8cfa8] tracking-tight lowercase leading-none transition-colors group-hover:text-[#f0ebe3]">
                            megallm
                        </span>
                        <span className="mt-1 text-[10px] tracking-[0.2em] uppercase text-[#e8cfa8]/50 transition-colors group-hover:text-[#e8cfa8]/80">
                            buildathon 25
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6 text-xs md:text-sm tracking-wide text-[#e8cfa8] font-light pointer-events-auto">
                        <button className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors focus:ring-0">
                            Theatre
                        </button>
                        <button className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors focus:ring-0">
                            About
                        </button>
                        <button className="bg-transparent border-none outline-none cursor-pointer hover:text-white transition-colors flex items-start gap-1 focus:ring-0">
                            Imprint
                            <span className="text-[8px] -translate-y-[1px]">↗</span>
                        </button>
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Header;
