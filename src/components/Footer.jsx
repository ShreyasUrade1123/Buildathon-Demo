import React from 'react';

const Footer = () => {
    return (
        <footer className="flex justify-between items-end pointer-events-none opacity-50 text-[10px] md:text-xs tracking-widest font-light mix-blend-screen px-12 md:px-32 lg:px-48 xl:px-64 pb-12 pt-6">
            <div className="text-gray-400">
                USE CURSOR TO REVEAL
            </div>
            <div className="text-right">
                <div className="flex items-center gap-3 justify-end">
                    <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                    <span className="uppercase text-gray-500">Registration Open</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
