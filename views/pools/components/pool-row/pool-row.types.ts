import BigNumber from 'bignumber.js';

import { SdkPool } from '@/interface';

export interface PoolRowProps extends SdkPool {
  id: string;
  position?: BigNumber | null;
}

export interface PoolRowMetadataProps {
  lpCoinType: string;
}

export interface PoolRowMetricsProps {
  position?: BigNumber | null;
}
