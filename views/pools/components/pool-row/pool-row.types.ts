import BigNumber from 'bignumber.js';

import { SdkPool } from '@/interface';

export interface PoolRowProps extends SdkPool {
  id: string;
  position?: BigNumber | null;
}
