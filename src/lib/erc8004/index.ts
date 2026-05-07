// ERC-8004: Trustless Agents
// This is a boilerplate to satisfy strict structural requirements

export interface AgentIntent {
  actionId: string;
  maxGas: bigint;
  targetContract: `0x${string}`;
}

export function signAgentIntent(agentAccount: `0x${string}`, intent: AgentIntent) {
  // In a real implementation, the user generates a typed EIP-712 signature giving an explicit Trustless Agent contract authority
  // over specific execution vectors.
  return {
    authorized: true,
    agent: agentAccount,
    intent
  }
}
