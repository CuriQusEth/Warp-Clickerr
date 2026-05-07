export const ERC8021_MAGIC_BYTES = '0x8021';

function stringToHex(str: string) {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function createERC8021Attribution(builderCode: string, attributionCode: string = 'WarpClickerBase'): string {
  // Mock generation of ERC-8021 metadata
  const hexBuilder = stringToHex(builderCode);
  const hexAttr = stringToHex(attributionCode);
  
  return `${ERC8021_MAGIC_BYTES}${hexBuilder}${hexAttr}`;
}

export function parseERC8021Attribution(data: string) {
  if (!data.startsWith(ERC8021_MAGIC_BYTES)) return null;
  return { valid: true };
}
