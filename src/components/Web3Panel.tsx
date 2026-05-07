import React, { useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSendTransaction, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { useGameStore } from '../store/gameStore';
import { createERC8021Attribution } from '../lib/erc8021';
import { Hex } from 'viem';

export function Web3Panel() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction, isPending, isSuccess } = useSendTransaction();
  const { signMessageAsync } = useSignMessage();
  const { lifetimeEnergy, prestigeLevel } = useGameStore();

  const [leaderboardStatus, setLeaderboardStatus] = useState<string>('');

  const handleSayGM = () => {
    // A simple zero-value transaction with ERC-8021 payload embedded
    // The user provided the builder code 'bc_qs0w3koa' in the prompt
    const dataPayload = createERC8021Attribution('bc_qs0w3koa', 'SayGM');
    
    sendTransaction({
      to: address, // Send to self as a mock "ping" on chain or a designated contract
      value: BigInt(0),
      data: dataPayload as Hex,
    });
  };

  const handleRecordScore = async () => {
    if (!address) return;
    setLeaderboardStatus('Signing message...');
    try {
      const message = `I am submitting my Warp Clicker score!\n\nLifetime Energy: ${Math.floor(lifetimeEnergy)}\nPrestige Level: ${prestigeLevel}\n\nApp ID: 691621f0669aee60603bdd7e`;
      const signature = await signMessageAsync({ account: address, message });
      console.log('SIWE Signature:', signature);
      setLeaderboardStatus('Score recorded securely via SIWE! (Mocked Backend)');
    } catch (e) {
      console.error(e);
      setLeaderboardStatus('Signature failed or rejected.');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar pb-24">
      <div className="space-y-4">
        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest border-b border-[#2a2a4a] pb-2 flex justify-between">
          <span>Base Mainnet</span>
          <span className="text-[#00f2ff]">Network</span>
        </div>
        
        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            className="w-full bg-white/5 hover:bg-[#00f2ff]/10 text-white hover:text-[#00f2ff] text-xs font-black uppercase tracking-tighter py-4 rounded-xl border border-white/10 hover:border-[#00f2ff]/30 transition-all shadow-[0_0_15px_rgba(0,242,255,0.05)]"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
             <div className="flex items-center justify-between border-b border-white/5 pb-3">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] animate-pulse" />
                 <span className="font-mono text-xs text-gray-300">
                   {address?.slice(0, 6)}...{address?.slice(-4)}
                 </span>
               </div>
               <button onClick={() => disconnect()} className="text-[10px] text-gray-500 hover:text-white uppercase tracking-widest">
                 Disconnect
               </button>
             </div>

             <div className="space-y-3 pt-2">
                <button
                  onClick={handleSayGM}
                  disabled={isPending}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl border border-white/10 transition-colors uppercase tracking-widest"
                >
                  {isPending ? 'Confirming...' : 'Say GM (On-Chain)'}
                </button>
                {isSuccess && <p className="text-[10px] text-[#00f2ff] text-center font-mono uppercase tracking-widest">Transaction Sent!</p>}

                <button
                  onClick={handleRecordScore}
                  className="w-full bg-[#7000ff] text-white text-[11px] font-black uppercase tracking-tighter py-3 rounded-xl hover:shadow-[0_0_20px_rgba(112,0,255,0.5)] transition-all active:scale-95 mt-4"
                >
                  Record Empire on-chain
                </button>
                {leaderboardStatus && <p className="text-[10px] text-[#00f2ff] text-center font-mono uppercase tracking-widest mt-2">{leaderboardStatus}</p>}
             </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
         <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest border-b border-[#2a2a4a] pb-2 flex justify-between">
           <span>Leaderboard</span>
           <span className="text-[#00f2ff] bg-[#00f2ff]/20 px-1 py-0.5 rounded font-mono text-[9px]">ON-CHAIN</span>
         </div>
         
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2 border-b border-white/5">
               <span className="text-xs font-mono text-[#00f2ff]">01</span>
               <div className="flex-1">
                  <div className="text-xs font-bold truncate text-white">0x71C...492b</div>
                  <div className="text-[9px] text-gray-500">2.4e24 Energy</div>
               </div>
               <div className="text-[#ff00e5] text-xs">★</div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b border-white/5 bg-white/5">
               <span className="text-xs font-mono text-[#00f2ff]">02</span>
               <div className="flex-1">
                  <div className="text-xs font-bold truncate italic text-white">You ({address ? `${address.slice(0, 4)}...${address.slice(-3)}` : 'Guest'})</div>
                  <div className="text-[9px] text-[#00f2ff]">{Math.floor(lifetimeEnergy).toLocaleString()} Energy</div>
               </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b border-white/5">
               <span className="text-xs font-mono text-gray-500">03</span>
               <div className="flex-1">
                  <div className="text-xs font-bold truncate text-white">0x921...e11a</div>
                  <div className="text-[9px] text-gray-500">9.8e11 Energy</div>
               </div>
            </div>
         </div>
         
      </div>

    </div>
  );
}
