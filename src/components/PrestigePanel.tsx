import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Network, Zap, Hexagon } from 'lucide-react';

export function PrestigePanel() {
  const { lifetimeEnergy, prestigeLevel, prestigeMultiplier, prestige } = useGameStore();

  const required = 10000 * Math.pow(10, prestigeLevel);
  const canPrestige = lifetimeEnergy >= required;
  
  const nextMultiplier = prestigeMultiplier + 1.5;

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center pb-24 custom-scrollbar">
      
      <div className="w-full max-w-sm bg-gradient-to-br from-[#1a0033] to-[#0a0a20] border border-[#7000ff]/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(112,0,255,0.2)] text-center flex flex-col mb-8">
         <h3 className="text-xs font-black uppercase text-[#7000ff] mb-2">Prestige Ready</h3>
         <p className="text-[10px] text-gray-400 mb-6 leading-relaxed">
            Collapse the current warp dimension to reset all progress for a permanent <span className="text-white">+{(nextMultiplier - prestigeMultiplier).toFixed(1)}x multiplier</span>.
         </p>
         
         <div className="flex justify-between items-center border-b border-white/5 pb-3">
             <span className="text-xs font-bold text-gray-400">Current Level</span>
             <span className="font-mono text-xs text-white">Dimension {prestigeLevel}</span>
         </div>
         <div className="flex justify-between items-center py-3 border-b border-white/5">
             <span className="text-xs font-bold text-gray-400">Current Multiplier</span>
             <span className="font-mono text-xs text-white">x{prestigeMultiplier.toFixed(1)}</span>
         </div>
         <div className="flex justify-between items-center py-3 border-b border-white/5">
             <span className="text-xs font-bold text-gray-400">Next Multiplier</span>
             <span className="font-mono font-black text-[#ff00e5]">x{nextMultiplier.toFixed(1)}</span>
         </div>
         <div className="flex flex-col gap-1 pt-4 text-left">
             <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Lifetime Energy Required</span>
             <div className={`font-mono text-xs font-bold ${canPrestige ? 'text-[#00f2ff]' : 'text-gray-500'}`}>
                {Math.floor(lifetimeEnergy).toLocaleString()} / {required.toLocaleString()}
             </div>
         </div>
      </div>

      <button
        onClick={prestige}
        disabled={!canPrestige}
        className={`w-full max-w-sm py-4 text-[11px] font-black uppercase tracking-tighter rounded-xl transition-all ${
           canPrestige 
           ? 'bg-[#7000ff] text-white hover:shadow-[0_0_20px_rgba(112,0,255,0.5)] active:scale-95' 
           : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
        }`}
      >
        Collapse Warp
      </button>

      {/* Artifacts UI */}
      <div className="w-full max-w-sm mt-8 border-t border-[#2a2a4a] pt-4">
         <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-4">Discovered Artifacts</div>
         <div className="flex gap-3 flex-wrap">
            {[...Array(6)].map((_, i) => (
               <div key={i} className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl transition-all ${
                  i < prestigeLevel 
                     ? 'bg-gradient-to-b from-[#7000ff]/20 to-[#00f2ff]/20 border border-[#7000ff]/50'
                     : 'bg-white/5 border border-white/10 opacity-30'
               }`}>
                  {i < prestigeLevel ? '⚡' : '?'}
               </div>
            ))}
         </div>
      </div>

    </div>
  );
}
