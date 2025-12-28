import React from 'react';

const IntroOverlay = ({ fadeOut }) => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#e8e0c5',
            fontFamily: '"Inter", sans-serif',
            zIndex: 10,
            textAlign: 'center',
            transition: 'opacity 1s ease',
            opacity: fadeOut ? 0 : 1
        }}>
            {/* Small top text */}
            <div style={{
                position: 'absolute',
                top: '30px',
                left: '40px',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                opacity: 0.8,
                textAlign: 'left'
            }}>
                digitalists<br />
                <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>hackathon 25</span>
            </div>

            {/* Top Right Menu */}
            <div style={{
                position: 'absolute',
                top: '30px',
                right: '40px',
                fontSize: '0.8rem',
                fontWeight: 400,
                opacity: 0.8,
                display: 'flex',
                gap: '20px'
            }}>
                <span>Theatre</span>
                <span>About</span>
                <span>Imprint ↗</span>
            </div>


            {/* Main Center Text */}
            <h3 style={{
                fontSize: '1rem',
                letterSpacing: '0.2em',
                fontWeight: 400,
                marginBottom: '1rem',
                opacity: 0.9,
                textTransform: 'uppercase'
            }}>ONE LAST</h3>

            <h1 style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)', // Responsive font size
                lineHeight: '0.9',
                fontWeight: 400,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 300, letterSpacing: '-0.02em' }}>CHRISTMAS</span>
                <span style={{
                    color: '#ffddbc',
                    fontFamily: '"Playfair Display", serif',
                    fontStyle: 'italic',
                    textShadow: '0 0 40px rgba(255, 60, 20, 0.4)', // Subtle red backing
                    marginTop: '0.2em'
                }}>GLOW</span>
            </h1>

            {/* Bottom Drag text */}
            <div style={{
                marginTop: '6rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#e8e0c5',
                    opacity: 0.8
                }}></div>
                <span style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.3em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    opacity: 0.8
                }}>Drag to start journey</span>
            </div>

            {/* Side Coordinates - nice touch from reference */}
            <div style={{
                position: 'absolute',
                left: '40px',
                bottom: '50%',
                transform: 'rotate(-90deg) translateX(-50%)',
                transformOrigin: 'left',
                fontSize: '0.6rem',
                opacity: 0.4,
                fontFamily: 'monospace'
            }}>
                [48.2102902, 16.358851]
            </div>
        </div>
    );
};

export default IntroOverlay;