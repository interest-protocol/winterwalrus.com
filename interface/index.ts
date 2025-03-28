import BigNumber from 'bignumber.js';
import { FC } from 'react';

import { SVGProps } from '@/components/svg/svg.types';

export type BigNumberish = BigNumber | bigint | string | number;

export interface StakingObject {
  type: string;
  state: string;
  nodeId: string;
  objectId: string;
  principal: string;
  display: string | null;
  activationEpoch: number;
  withdrawEpoch: number | null;
}

export interface AssetMetadata {
  name: string;
  type: string;
  symbol: string;
  decimals: number;
  kind: 'lst' | 'nft' | 'coin';
  Icon: string | FC<SVGProps>;
}
