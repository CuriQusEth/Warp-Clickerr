import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Network, Zap, Hexagon, Globe } from 'lucide-react';
import { useAccount, useSendTransaction, useSignMessage } from 'wagmi';
import { createERC8021Attribution } from '../lib/erc8021';
import { Hex } from 'viem';

export function PrestigePanel() {
  const { lifetimeEnergy, prestigeLevel, prestigeMultiplier, prestige } = useGameStore();
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const { signMessageAsync } = useSignMessage();
  const [leaderboardStatus, setLeaderboardStatus] = useState<string>('');

  const required = 10000 * Math.pow(10, prestigeLevel);
  const canPrestige = lifetimeEnergy >= required;
  const nextMultiplier = prestigeMultiplier + 1.5;

  const handleSayGM = () => {
    if (!address) return;
    const dataPayload = createERC8021Attribution('[BUILDER_CODE]', '[ATTRIBUTION_CODE]');
    sendTransaction({
      to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
      value: BigInt(0),
      data: dataPayload as Hex,
    });
  };

  const handleRecordScore = async () => {
    if (!address) return;
    setLeaderboardStatus('Signing...');
    try {
      const message = `I am submitting my Warp Clicker score!\n\nLifetime Energy: ${Math.floor(lifetimeEnergy)}\nPrestige Level: ${prestigeLevel}\n\nApp ID: 691621f0669aee60603bdd7e`;
      await signMessageAsync({ account: address, message });
      setLeaderboardStatus('Score recorded!');
    } catch {
      setLeaderboardStatus('Failed.');
    }
  };

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
        className={`w-full max-w-sm py-4 text-[11px] font-black uppercase tracking-tighter rounded-xl transition-all mb-4 ${
           canPrestige 
           ? 'bg-[#7000ff] text-white hover:shadow-[0_0_20px_rgba(112,0,255,0.5)] active:scale-95' 
           : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/10'
        }`}
      >
        Collapse Warp
      </button>

      {prestigeLevel > 0 && isConnected && (
        <div className="w-full max-w-sm space-y-3 p-4 bg-[#E8A020]/10 border border-[#E8A020]/30 rounded-xl mb-4">
          <div className="text-[10px] text-center font-bold text-[#E8A020] uppercase tracking-widest mb-2">Prestige Achieved</div>
          <button
            onClick={handleSayGM}
            disabled={isPending}
            className="w-full bg-[#E8A020]/20 hover:bg-[#E8A020]/30 text-[#E8A020] font-bold text-xs py-3 rounded-lg border border-[#E8A020]/40 transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
          >
            {isPending ? 'Confirming...' : 'Say GM (On-Chain)'}
          </button>
          
          <button
            onClick={handleRecordScore}
            className="w-full bg-[#7000ff]/20 hover:bg-[#7000ff]/40 border border-[#7000ff]/50 text-[#00f2ff] text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-all"
          >
            Record This Empire on-chain
          </button>
          {leaderboardStatus && <p className="text-[10px] text-[#00f2ff] text-center font-mono uppercase tracking-widest">{leaderboardStatus}</p>}
        </div>
      )}

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
