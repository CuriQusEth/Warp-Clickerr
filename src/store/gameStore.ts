import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  basePower: number; // For click, it's click power. For passive, it's Energy/sec
  count: number;
  type: 'click' | 'passive';
  costMultiplier: number;
}

export interface GameState {
  energy: number;
  lifetimeEnergy: number;
  prestigeLevel: number;
  prestigeMultiplier: number;
  combo: number;
  lastPlayedAt: number;
  
  upgrades: Record<string, Upgrade>;
  
  clickWarpCore: () => void;
  buyUpgrade: (id: string) => void;
  claimOfflineEarnings: () => number;
  calculatePassiveIncome: () => number;
  calculateClickPower: () => number;
  prestige: () => void;
  resetCombo: () => void;
  tickPassive: () => void;
}

const INITIAL_UPGRADES: Record<string, Upgrade> = {
  click1: { id: 'click1', name: 'Warp Capacitor', description: '+1 Energy/Click', baseCost: 10, basePower: 1, count: 0, type: 'click', costMultiplier: 1.5 },
  click2: { id: 'click2', name: 'Quantum Amplifier', description: '+5 Energy/Click', baseCost: 100, basePower: 5, count: 0, type: 'click', costMultiplier: 1.6 },
  passive1: { id: 'passive1', name: 'Micro Harvester', description: '+1 Energy/sec', baseCost: 50, basePower: 1, count: 0, type: 'passive', costMultiplier: 1.2 },
  passive2: { id: 'passive2', name: 'Dimensional Siphon', description: '+10 Energy/sec', baseCost: 500, basePower: 10, count: 0, type: 'passive', costMultiplier: 1.3 },
  passive3: { id: 'passive3', name: 'Dark Matter Reactor', description: '+100 Energy/sec', baseCost: 5000, basePower: 100, count: 0, type: 'passive', costMultiplier: 1.4 },
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      energy: 0,
      lifetimeEnergy: 0,
      prestigeLevel: 0,
      prestigeMultiplier: 1,
      combo: 1,
      lastPlayedAt: Date.now(),
      upgrades: INITIAL_UPGRADES,

      calculateClickPower: () => {
        const state = get();
        let power = 1; // Base click is 1
        Object.values(state.upgrades).forEach(upg => {
          if (upg.type === 'click') {
            power += upg.basePower * upg.count;
          }
        });
        // Combo caps at 5x
        const cappedCombo = Math.min(5, 1 + state.combo * 0.1);
        return power * state.prestigeMultiplier * cappedCombo;
      },

      calculatePassiveIncome: () => {
        const state = get();
        let eps = 0;
        Object.values(state.upgrades).forEach(upg => {
          if (upg.type === 'passive') {
            eps += upg.basePower * upg.count;
          }
        });
        return eps * state.prestigeMultiplier;
      },

      clickWarpCore: () => set((state) => {
        const power = get().calculateClickPower();
        return {
          energy: state.energy + power,
          lifetimeEnergy: state.lifetimeEnergy + power,
          combo: Math.min(40, state.combo + 1), // Max 5x multiplier (1 + 40*0.1)
          lastPlayedAt: Date.now()
        };
      }),

      buyUpgrade: (id: string) => set((state) => {
        const upgrade = state.upgrades[id];
        if (!upgrade) return state;
        
        const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.count));
        
        if (state.energy >= cost) {
          return {
            energy: state.energy - cost,
            upgrades: {
              ...state.upgrades,
              [id]: {
                ...upgrade,
                count: upgrade.count + 1
              }
            }
          };
        }
        return state;
      }),

      claimOfflineEarnings: () => {
        const state = get();
        const now = Date.now();
        const diffSeconds = Math.floor((now - state.lastPlayedAt) / 1000);
        
        if (diffSeconds > 60) {
          const eps = state.calculatePassiveIncome();
          const earned = eps * diffSeconds;
          if (earned > 0) {
             set({ 
               energy: state.energy + earned, 
               lifetimeEnergy: state.lifetimeEnergy + earned,
               lastPlayedAt: now 
             });
             return earned;
          }
        }
        set({ lastPlayedAt: now });
        return 0;
      },

      resetCombo: () => set({ combo: 0 }),

      tickPassive: () => set((state) => {
        const eps = get().calculatePassiveIncome();
        // Tick happens roughly ~10 times a sec for smooth UI if we want, or 1 time a sec.
        // Let's do 1 time a sec in the component to keep state writes lower.
        return {
          energy: state.energy + eps,
          lifetimeEnergy: state.lifetimeEnergy + eps,
          lastPlayedAt: Date.now()
        }
      }),

      prestige: () => set((state) => {
        // Prestige cost: 1M lifetime energy base? Let's say every 10k gives 1
        const required = 10000 * Math.pow(10, state.prestigeLevel);
        if (state.lifetimeEnergy >= required) {
          return {
            energy: 0,
            combo: 0,
            prestigeLevel: state.prestigeLevel + 1,
            prestigeMultiplier: state.prestigeMultiplier + 1.5,
            upgrades: INITIAL_UPGRADES,
            lastPlayedAt: Date.now()
          };
        }
        return state;
      })
    }),
    {
      name: 'warp-clicker-storage',
    }
  )
);
