import { Network } from './network';

/**
 * gRPC fullnode providers. Every entry must serve gRPC-web with CORS enabled
 * for browsers.
 */
export enum RPC {
  Mysten = 'mysten',
  SuiScan = 'suiscan',
  Triton = 'triton',
}

export const DEFAULT_RPC = RPC.Mysten;

export const RPCs = [RPC.Mysten, RPC.SuiScan, RPC.Triton];

export const RPC_DISPLAY = {
  [RPC.Mysten]: 'Mysten',
  [RPC.SuiScan]: 'SuiScan',
  [RPC.Triton]: 'Triton One',
};

export const RPC_MAP: Record<Network, Record<RPC, string>> = {
  [Network.TESTNET]: {
    [RPC.Mysten]: 'https://fullnode.testnet.sui.io:443',
    [RPC.SuiScan]: 'https://rpc-testnet.suiscan.xyz',
    [RPC.Triton]: 'https://fullnode.testnet.sui.io:443',
  },
  [Network.MAINNET]: {
    [RPC.Mysten]: 'https://fullnode.mainnet.sui.io:443',
    [RPC.SuiScan]: 'https://rpc-mainnet.suiscan.xyz',
    [RPC.Triton]: 'https://mainnet.sui.rpcpool.com',
  },
};

/**
 * Users may have a provider that no longer exists (e.g. Shinami) saved in
 * local storage, so unknown values fall back to the default.
 */
export const getRpc = (rpc?: string | null): RPC =>
  RPCs.includes(rpc as RPC) ? (rpc as RPC) : DEFAULT_RPC;

export const getRpcUrl = (network: Network, rpc?: string | null) =>
  RPC_MAP[network]?.[getRpc(rpc)] ?? RPC_MAP[network][DEFAULT_RPC];
