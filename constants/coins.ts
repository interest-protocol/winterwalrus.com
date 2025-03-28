import { SHARED_OBJECTS, TYPES } from '@interest-protocol/blizzard-sdk';

import { WalSVG, WWalSVG } from '@/components/svg';
import { AssetMetadata } from '@/interface';

const COIN_ICON = {
  [TYPES.WAL]: WalSVG,
  [TYPES.WWAL]: WWalSVG,
};

export const NFT_TYPES: ReadonlyArray<string> = [
  TYPES.STAKED_WAL,
  TYPES.BLIZZARD_STAKE_NFT,
];

export const NFT_IMAGE = {
  [TYPES.STAKED_WAL]: '/staked-wal.png',
  [TYPES.BLIZZARD_STAKE_NFT]: '/blizzard-nft.png',
} as const;

export const COIN_LIST: ReadonlyArray<AssetMetadata> = [
  {
    name: 'WAL',
    kind: 'coin',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES.WAL,
    Icon: COIN_ICON[TYPES.WAL],
  },
];

export const LST_LIST: ReadonlyArray<AssetMetadata> = [
  {
    decimals: 9,
    kind: 'lst',
    name: '❄️ WAL',
    symbol: 'sWAL',
    type: TYPES.WWAL,
    Icon: COIN_ICON[TYPES.WWAL],
  },
  {
    decimals: 9,
    kind: 'lst',
    symbol: 'sWAL',
    name: '❄️ WAL',
    type: TYPES.WWAL,
    Icon: COIN_ICON[TYPES.WWAL],
  },
];

export const ASSET_METADATA = {
  [TYPES.WAL]: {
    name: 'WAL',
    kind: 'coin',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES.WAL,
    Icon: COIN_ICON[TYPES.WAL],
  },
  [TYPES.WWAL]: {
    decimals: 9,
    kind: 'coin',
    name: '❄️ WAL',
    symbol: 'wWAL',
    type: TYPES.WWAL,
    Icon: COIN_ICON[TYPES.WWAL],
  },
  [TYPES.STAKED_WAL]: {
    kind: 'nft',
    decimals: 9,
    symbol: 'sWAL',
    name: 'Staked WAL',
    type: TYPES.STAKED_WAL,
    Icon: NFT_IMAGE[TYPES.STAKED_WAL],
  },
  [TYPES.BLIZZARD_STAKE_NFT]: {
    kind: 'nft',
    decimals: 9,
    symbol: 'wWALNFT',
    name: 'Blizzard wWAL',
    type: TYPES.BLIZZARD_STAKE_NFT,
    Icon: NFT_IMAGE[TYPES.BLIZZARD_STAKE_NFT],
  },
};

export const STAKING_OBJECT = {
  [TYPES.WWAL]: SHARED_OBJECTS.WWAL_STAKING({
    mutable: true,
  }).objectId,
};
