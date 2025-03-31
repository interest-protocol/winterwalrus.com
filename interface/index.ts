import BigNumber from 'bignumber.js';

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
  iconUrl: string;
  decimals: number;
}

export interface Node {
  id: string;
  name: string;
}
