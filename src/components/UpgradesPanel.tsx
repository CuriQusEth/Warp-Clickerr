import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Zap, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export function UpgradesPanel() {
  const { upgrades, energy, buyUpgrade } = useGameStore();

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 pb-24 custom-scrollbar">
      <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest border-b border-[#2a2a4a] pb-2">Infrastructure Upgrades</div>
      
      <div className="flex flex-col gap-3">
        {Object.values(upgrades).map((upg) => {
          const cost = Math.floor(upg.baseCost * Math.pow(upg.costMultiplier, upg.count));
          const canAfford = energy >= cost;
          
          const wrapperClasses = canAfford 
            ? 'p-3 bg-[#00f2ff]/10 border border-[#00f2ff]/30 rounded-xl flex justify-between items-center cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.05)] hover:border-[#00f2ff]/60 transition-colors'
            : 'p-3 bg-white/5 border border-white/10 rounded-xl flex justify-between items-center opacity-50 cursor-not-allowed';

          return (
            <button
              key={upg.id}
              onClick={() => buyUpgrade(upg.id)}
              disabled={!canAfford}
              className={wrapperClasses}
            >
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white">{upg.name}</span>
                <span className={`text-[10px] italic ${canAfford ? 'text-[#00f2ff] font-bold' : 'text-gray-400'}`}>Level {upg.count < 10 ? `0${upg.count}` : upg.count}</span>
                <span className="text-[10px] text-gray-400 mt-1">{upg.description}</span>
              </div>
              <div className="text-right">
                <div className={`text-xs font-mono font-bold ${canAfford ? 'text-[#00f2ff]' : 'text-gray-500'}`}>
                  {cost.toLocaleString()}
                </div>
                <div className="text-[9px] text-gray-500">
                  +{(upg.basePower * upg.count).toLocaleString()} {upg.type === 'click' ? '/clk' : '/sec'}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
}
