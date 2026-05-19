# Warp Clicker 🚀

**Warp Clicker** is a deeply engaging, fast-paced idle-clicker game embedded with rich cyberpunk aesthetics and a mobile-first philosophy. Players step into the role of a Warp Engineer, generating massive "Warp Energy" to unlock dimensions, build vast interstellar infrastructure, and submit verified achievements on-chain.

## 🌟 Overview & Key Features

- **Satisfying Idle Gameplay:** Tap the Warp Core to generate energy, rack up combo multipliers, and unleash massive energy bursts.
- **Deep Progression System:** Invest energy in powerful infrastructure—Quantum Relays, Dimensional Gates, Dyson Lattices, and Singularity Pumps.
- **Dimensional Collapse (Prestige):** Reset your empire to gain permanent multipliers, unlock deeper dimensions, and discover rare artifacts.
- **Offline Earnings:** Your warp infrastructure continues to harvest energy even when you're away.
- **On-Chain Integration:** Connect to the Web3 ecosystem (Base Mainnet) using SIWE (Sign-In with Ethereum) to record your highest scores securely on a hybrid leaderboard.

## 🤖 AI Agent & MCP Capabilities

Warp Clicker supports the **Model Context Protocol (MCP)** and acts as a host platform for Trustless Agents (ERC-8004).

- **Host Agent:** *Warp Clicker Orchestrator*
- **Capabilities:** Click automation, warp mechanics, idle progression, multi-click management, and efficient farming orchestration.
- **MCP Endpoint:** Active execution interfaces for interacting with the game state programmatically.
- **Registration:** Adheres to standard EIP-8004 registration protocols.

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS (v4), Framer Motion
- **Web3 Ecosystem:** Wagmi, Viem (Targeting Base)
- **State Management:** Zustand (with Persistence)
- **API Interfaces:** Next.js 14 App Router formatting (for MCP/Agent endpoints)

## 🚀 How to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 🔗 Integrating the MCP Agent

If you are running an AI orchestrator and want to connect to the Warp Clicker MCP endpoints:
- **Agent Discovery Card:** Available at `/.well-known/agent-card.json`
- **Main Agent Control:** `/api/agent`
- **Model Context Protocol:** Send JSON-RPC formatted payloads to `/api/mcp` for automation commands and state queries.

---
*Note: Ensure you are operating within a safe environment when testing web3 features. No private keys or secret credentials are required to launch the game locally.*
