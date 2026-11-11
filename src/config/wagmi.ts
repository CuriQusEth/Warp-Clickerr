import { http, createConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// Base Mainnet with Denim upgrade (200ms canonical blocks, zero flashblocks)
export const baseDenim = {
  ...base,
  name: 'Base Mainnet (Denim)',
  rpcUrls: {
    ...base.rpcUrls,
    default: {
      http: ['https://mainnet.base.org'],
    },
  },
} as const;

export const DENIM_SPEC = {
  network: 'Base Mainnet',
  upgrade: 'Denim',
  blockTimeMs: 200,
  chainId: 8453,
  rpcUrl: 'https://mainnet.base.org',
  explorerUrl: 'https://basescan.org',
  status: 'Active (200ms Canonical Blocks)',
};

export const wagmiConfig = createConfig({
  chains: [baseDenim],
  connectors: [injected()],
  transports: {
    [baseDenim.id]: http('https://mainnet.base.org'),
  },
});

