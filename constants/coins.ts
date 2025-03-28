import {
  Network,
  SHARED_OBJECTS,
  TYPES,
} from '@interest-protocol/blizzard-sdk';

import { SnowWalSVG, WalSVG } from '@/components/svg';
import { AssetMetadata } from '@/interface';

export const COIN_DECIMALS = {
  [TYPES[Network.Testnet].WAL]: 9,
  [TYPES[Network.Testnet].SNOW]: 9,
};

export const COIN_ICON = {
  [TYPES[Network.Testnet].WAL]: WalSVG,
  [TYPES[Network.Testnet].SNOW]: SnowWalSVG,
};

export const NFT_TYPES: ReadonlyArray<string> = [
  TYPES[Network.Testnet].STAKED_WAL,
  TYPES[Network.Testnet].BLIZZARD_STAKE_NFT,
];

export const NFT_IMAGE = {
  [TYPES[Network.Testnet].STAKED_WAL]: '/staked-wal.png',
  [TYPES[Network.Testnet].BLIZZARD_STAKE_NFT]: '/blizzard-nft.png',
} as const;

export const COIN_LIST: ReadonlyArray<AssetMetadata> = [
  {
    name: 'WAL',
    kind: 'coin',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES[Network.Testnet].WAL,
    Icon: COIN_ICON[TYPES[Network.Testnet].WAL],
  },
];

export const LST_LIST: ReadonlyArray<AssetMetadata> = [
  {
    decimals: 9,
    kind: 'lst',
    name: 'SnowWAL',
    symbol: 'sWAL',
    type: TYPES[Network.Testnet].SNOW,
    Icon: COIN_ICON[TYPES[Network.Testnet].SNOW],
  },
  {
    decimals: 9,
    kind: 'lst',
    symbol: 'sWAL',
    name: 'SnowWAL',
    type: TYPES[Network.Testnet].SNOW,
    Icon: COIN_ICON[TYPES[Network.Testnet].SNOW],
  },
];

export const ASSET_METADATA = {
  [TYPES[Network.Testnet].WAL]: {
    name: 'WAL',
    kind: 'coin',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES[Network.Testnet].WAL,
    Icon: COIN_ICON[TYPES[Network.Testnet].WAL],
  },
  [TYPES[Network.Testnet].SNOW]: {
    decimals: 9,
    kind: 'coin',
    name: 'SnowWAL',
    symbol: 'sWAL',
    type: TYPES[Network.Testnet].SNOW,
    Icon: COIN_ICON[TYPES[Network.Testnet].SNOW],
  },
  [TYPES[Network.Testnet].STAKED_WAL]: {
    kind: 'nft',
    decimals: 9,
    symbol: 'sWAL',
    name: 'Staked WAL',
    type: TYPES[Network.Testnet].STAKED_WAL,
    Icon: NFT_IMAGE[TYPES[Network.Testnet].STAKED_WAL],
  },
  [TYPES[Network.Testnet].BLIZZARD_STAKE_NFT]: {
    kind: 'nft',
    decimals: 9,
    symbol: 'SnowNFT',
    name: 'Blizzard Snow',
    type: TYPES[Network.Testnet].BLIZZARD_STAKE_NFT,
    Icon: NFT_IMAGE[TYPES[Network.Testnet].BLIZZARD_STAKE_NFT],
  },
};

export const STAKING_COIN = {
  [TYPES[Network.Testnet].SNOW]: SHARED_OBJECTS[Network.Testnet].SNOW_STAKING({
    mutable: true,
  }).objectId,
};
