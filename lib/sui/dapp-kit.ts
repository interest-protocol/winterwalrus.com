import { createDAppKit } from '@mysten/dapp-kit-react';

import { NETWORK } from '@/constants/network';
import { getRpcUrl, RPC } from '@/constants/rpc';

import { createSuiClient } from '.';

const createAppDAppKit = (rpc: RPC) =>
  createDAppKit({
    networks: [NETWORK],
    defaultNetwork: NETWORK,
    createClient: (network) =>
      createSuiClient(network, getRpcUrl(network, rpc)),
  });

export type AppDAppKit = ReturnType<typeof createAppDAppKit>;

const dAppKits = new Map<RPC, AppDAppKit>();

export const getAppDAppKit = (rpc: RPC) => {
  if (!dAppKits.has(rpc)) dAppKits.set(rpc, createAppDAppKit(rpc));

  return dAppKits.get(rpc)!;
};

declare module '@mysten/dapp-kit-react' {
  interface Register {
    dAppKit: AppDAppKit;
  }
}
