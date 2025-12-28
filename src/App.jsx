import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Home from './pages/Home';
import Register from './pages/Register';
import Success from './pages/Success';
import Loader from './components/Loader';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <BrowserRouter>
      {/* 1. Full Screen Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
          >
            <Loader onComplete={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Main App */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative min-h-screen bg-black"
      >


        {/* Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </div>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
