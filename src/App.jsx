
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import FluidBackground from './components/FluidBackground';
import IntroOverlay from './components/IntroOverlay';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [startInteraction, setStartInteraction] = useState(false);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 1s ease-in-out'
      }}>
        <IntroOverlay fadeOut={startInteraction} />

        {/* Interaction trigger layer - checking mouse movement to fade overlay */}
        <div
          style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1 }}
          onPointerDown={() => setStartInteraction(true)}
          onPointerMove={() => {
            // If user moves mouse vigorously, we could trigger it too, 
            // but clicking/dragging is better as per instruction
          }}
        >
          <Canvas orthographic camera={{ zoom: 1, position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <FluidBackground />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;