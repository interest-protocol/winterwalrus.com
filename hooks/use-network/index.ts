import { useCurrentNetwork } from '@mysten/dapp-kit-react';

import { Network } from '@/constants/network';

export const useNetwork = () => useCurrentNetwork() as Network;
