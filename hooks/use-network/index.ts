import { useSuiClientContext } from '@mysten/dapp-kit';

import { Network } from '@/constants/network';

export const useNetwork = () => useSuiClientContext().network as Network;
