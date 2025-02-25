import { Network } from '@interest-protocol/blizzard-sdk';
import { useSuiClientContext } from '@mysten/dapp-kit';

export const useNetwork = () => useSuiClientContext().network as Network;
