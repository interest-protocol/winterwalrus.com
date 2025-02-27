export enum Network {
  TESTNET = 'testnet',
  MAINNET = 'mainnet',
}

export const NETWORK = process.env.NEXT_PUBLIC_NETWORK as Network;
