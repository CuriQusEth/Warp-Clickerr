import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { wagmiConfig } from './config/wagmi';
import { useGameStore } from './store/gameStore';
import { WarpCore } from './components/WarpCore';
import { UpgradesPanel } from './components/UpgradesPanel';
import { PrestigePanel } from './components/PrestigePanel';
import { Web3Panel } from './components/Web3Panel';
import { Activity, Zap, Network, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const queryClient = new QueryClient();

function GameContent() {
  const [showTitle, setShowTitle] = useState(true);
  const [activeTab, setActiveTab] = useState<'core' | 'upgrades' | 'prestige' | 'web3'>('core');
  const { tickPassive, claimOfflineEarnings, resetCombo, combo } = useGameStore();

  useEffect(() => {
    // Process offline earnings on mount
    const earned = claimOfflineEarnings();
    if (earned > 0) {
      console.log(`Earned ${earned} energy while offline!`);
    }

    // Passive income tick every second
    const interval = setInterval(() => {
      tickPassive();
    }, 1000);

    return () => clearInterval(interval);
  }, [tickPassive, claimOfflineEarnings]);

  // Combo decay
  useEffect(() => {
    if (combo === 0) return;
    const comboTimer = setTimeout(() => {
       resetCombo();
    }, 2000); // 2 seconds without click resets combo

    return () => clearTimeout(comboTimer);
  }, [combo, resetCombo]);
  
  if (showTitle) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] max-w-md mx-auto bg-[#020205] relative overflow-hidden">
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1, ease: 'easeOut' }}
           className="text-center z-10 flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-[#00f2ff] to-[#7000ff] rounded-xl rotate-45 flex items-center justify-center border border-white/20 mb-10 shadow-[0_0_30px_rgba(0,242,255,0.3)]">
             <div className="w-8 h-8 bg-white rounded-full shadow-[0_0_20px_#fff]"></div>
          </div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl font-display font-black italic uppercase tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-4"
          >
            WARP<br/>CLICKER
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-gray-400 font-mono text-[10px] uppercase tracking-widest mb-12"
          >
            Build your empire. Collapse dimensions.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowTitle(false)}
            className="px-8 py-4 bg-[#7000ff] text-white text-[11px] font-black uppercase tracking-tighter rounded-xl hover:shadow-[0_0_20px_rgba(112,0,255,0.5)] transition-all"
          >
            Enter the Warp
          </motion.button>
        </motion.div>
        
        {/* Background elements */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[150vw] h-[150vw] rounded-full blur-[100px] bg-[#7000ff]/30 animate-[spin_20s_linear_infinite]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-[#020205] relative overflow-hidden border-x border-[#1a1a2e]">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-pattern-dots" />

      <header className="z-10 h-16 shrink-0 flex items-center justify-between px-6 border-b border-[#2a2a4a] bg-[#050510]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col">
          <h1 className="font-display font-black text-xl italic tracking-tighter uppercase text-white">
            WARP CLICKER
          </h1>
          <p className="text-[10px] text-[#00f2ff] font-mono tracking-widest uppercase opacity-70">Warp-Engine-v2.0.4</p>
        </div>
        <button className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-[#00f2ff]/30 rounded-full text-[10px] font-bold text-[#00f2ff] tracking-widest uppercase transition-all">
          GM
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col overflow-hidden">
         <AnimatePresence mode="wait">
            {activeTab === 'core' && (
              <motion.div key="core" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col">
                <WarpCore />
              </motion.div>
            )}
            {activeTab === 'upgrades' && (
              <motion.div key="upgrades" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col bg-slate-950/90 backdrop-blur-sm">
                <UpgradesPanel />
              </motion.div>
            )}
            {activeTab === 'prestige' && (
              <motion.div key="prestige" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col bg-slate-950/90 backdrop-blur-sm">
                <PrestigePanel />
              </motion.div>
            )}
            {activeTab === 'web3' && (
              <motion.div key="web3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col bg-slate-950/90 backdrop-blur-sm">
                <Web3Panel />
              </motion.div>
            )}
         </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="z-20 shrink-0 bg-[#050510] border-t border-[#2a2a4a] pb-safe">
        <div className="flex px-2 py-3 justify-around items-center">
          <TabButton active={activeTab === 'core'} onClick={() => setActiveTab('core')} icon={<Zap size={20} />} label="Core" />
          <TabButton active={activeTab === 'upgrades'} onClick={() => setActiveTab('upgrades')} icon={<Activity size={20} />} label="Upgrades" />
          <TabButton active={activeTab === 'prestige'} onClick={() => setActiveTab('prestige')} icon={<Network size={20} />} label="Prestige" />
          <TabButton active={activeTab === 'web3'} onClick={() => setActiveTab('web3')} icon={<Globe size={20} />} label="Web3" />
        </div>
      </nav>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 w-16 transition-colors ${active ? 'text-[#00f2ff]' : 'text-gray-500 hover:text-white'}`}
    >
      <div className={`${active ? 'drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]' : ''}`}>
        {icon}
      </div>
      <span className="text-[9px] uppercase font-bold tracking-widest">{label}</span>
    </button>
  );
}

export default function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GameContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
