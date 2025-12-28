import React, { useEffect, useState } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        // Simulate loading
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500); // Wait a bit before finishing
                    return 100;
                }
                return prev + 2;
            });
        }, 40);

        // Random glitch effect trigger
        const glitchInterval = setInterval(() => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
        }, 1200);

        return () => {
            clearInterval(interval);
            clearInterval(glitchInterval);
        };
    }, [onComplete]);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#e8e0c5',
            fontFamily: '"Inter", sans-serif'
        }}>
            <div style={{ position: 'relative' }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: 900,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    position: 'relative',
                    transform: glitch ? 'skewX(-10deg) scale(1.1)' : 'skewX(0deg) scale(1)',
                    filter: glitch ? 'blur(2px)' : 'none',
                    transition: 'all 0.1s ease',
                    opacity: 1 - progress / 200 // Fade out slightly as it finishes
                }}>
                    HACKATHON

                    {/* Glitch Duplicate 1 */}
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: -2,
                        width: '100%',
                        height: '100%',
                        color: 'red',
                        opacity: glitch ? 0.8 : 0,
                        clipPath: 'inset(20% 0 80% 0)',
                        transform: 'translateX(-2px)',
                        pointerEvents: 'none'
                    }}>HACKATHON</span>

                    {/* Glitch Duplicate 2 */}
                    <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 2,
                        width: '100%',
                        height: '100%',
                        color: 'blue',
                        opacity: glitch ? 0.8 : 0,
                        clipPath: 'inset(60% 0 10% 0)',
                        transform: 'translateX(2px)',
                        pointerEvents: 'none'
                    }}>HACKATHON</span>
                </h1>

                <div style={{
                    marginTop: '1rem',
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    opacity: 0.7
                }}>
                    LOADING... {progress}%
                </div>
            </div>
        </div>
    );
};

export default Loader;
