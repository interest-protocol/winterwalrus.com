import { Network } from './network';

export enum RPC {
  Shinami = 'shinami',
  Mysten = 'mysten',
  Blockvision = 'blockvision',
  SuiScan = 'suiscan',
  Suiet = 'suiet',
}

export const RPCs = [
  RPC.Shinami,
  RPC.Mysten,
  RPC.Blockvision,
  RPC.SuiScan,
  RPC.Suiet,
];

export const RPC_DISPLAY = {
  [RPC.Shinami]: 'Shinami',
  [RPC.Mysten]: 'Mysten Public RPC',
  [RPC.Blockvision]: 'Blockvision',
  [RPC.SuiScan]: 'SuiScan',
  [RPC.Suiet]: 'Suiet',
};

export const RPC_MAP: Record<Network, Record<RPC, string>> = {
  [Network.TESTNET]: {
    [RPC.Shinami]: 'https://fullnode.testnet.sui.io:443',
    [RPC.Mysten]: 'https://fullnode.testnet.sui.io:443',
    [RPC.Blockvision]: 'https://sui-testnet-endpoint.blockvision.org',
    [RPC.SuiScan]: 'https://rpc-testnet.suiscan.xyz',
    [RPC.Suiet]: 'https://testnet.suiet.app',
  },
  [Network.MAINNET]: {
    [RPC.Shinami]: 'https://wallet-rpc.mainnet.sui.io',
    [RPC.Mysten]: 'https://fullnode.mainnet.sui.io:443',
    [RPC.Blockvision]: 'https://sui-mainnet-endpoint.blockvision.org',
    [RPC.SuiScan]: 'https://rpc-mainnet.suiscan.xyz',
    [RPC.Suiet]: 'https://mainnet.suiet.app',
  },
};
