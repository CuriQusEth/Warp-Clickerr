import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

export function WarpCore() {
  const { energy, clickWarpCore, combo, prestigeMultiplier } = useGameStore();
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number, value: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    // Determine coordinates based on mouse vs touch
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const { calculateClickPower } = useGameStore.getState();
    const power = calculateClickPower();
    
    clickWarpCore();

    const id = Date.now() + Math.random();
    setClicks((prev) => [...prev, { id, x: clientX, y: clientY, value: power }]);

    // Give haptic feedback on mobile if supported
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    setTimeout(() => {
      setClicks((prev) => prev.filter((c) => c.id !== id));
    }, 1000);
  };

  const coreColors = prestigeMultiplier > 1 
    ? 'bg-gradient-to-tr from-purple-600 to-magenta-500 shadow-[0_0_80px_rgba(232,121,249,0.5)]'
    : 'bg-gradient-to-tr from-cyan-600 to-blue-500 shadow-[0_0_80px_rgba(34,211,238,0.5)]';

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative touch-none pt-12 pb-24">

      <div className="z-10 mb-auto mt-4 text-center">
        <div className="text-[12px] uppercase tracking-[0.4em] text-[#00f2ff] mb-2 font-bold">Current Output</div>
        <div className="text-6xl font-black font-mono text-white tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
          {Math.floor(energy).toLocaleString()}
        </div>
        <div className="text-[10px] uppercase font-mono text-gray-400 mt-2 tracking-widest">
          Energy
        </div>
      </div>

      <div className="relative group cursor-pointer my-auto" onClick={handleClick} onTouchStart={handleClick}>
         <div className="absolute inset-0 bg-[#00f2ff] blur-[120px] opacity-20 scale-150 animate-pulse pointer-events-none"></div>
         <motion.div
           whileTap={{ scale: 0.95 }}
           className="w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-black border-[12px] border-[#1a1a2e] relative z-10 shadow-[0_0_60px_rgba(0,242,255,0.2)] flex items-center justify-center overflow-hidden"
         >
           <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,#7000ff_0%,transparent_70%)]"></div>
           <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#00f2ff] via-white to-[#7000ff] shadow-[0_0_80px_rgba(255,255,255,0.6)] animate-[spin_12s_linear_infinite]"></div>
           <div className="absolute w-10 h-10 bg-white rounded-full blur-xl pointer-events-none"></div>
         </motion.div>
         <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#00f2ff] text-black px-4 py-1 font-black uppercase text-[10px] tracking-widest rounded-sm z-20 pointer-events-none">
           Click to Warp
         </div>
      </div>

      {combo > 1 && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute bottom-32 right-6 text-right z-10 pointer-events-none"
        >
          <div className="text-[10px] uppercase text-gray-500 font-bold mb-1">Combo Multiplier</div>
          <div className="text-4xl font-black italic text-[#ff00e5] skew-x-[-12deg]">
            x{(1 + combo * 0.1).toFixed(1)}
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {clicks.map((click) => (
          <motion.div
            key={click.id}
            initial={{ opacity: 1, y: click.y - 40, x: click.x - 20, scale: 0.5 }}
            animate={{ opacity: 0, y: click.y - 150, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute pointer-events-none z-50 text-xl font-bold font-mono text-white drop-shadow-[0_0_10px_rgba(0,242,255,0.8)]"
            style={{ left: 0, top: 0 }}
          >
            +{Math.floor(click.value)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
