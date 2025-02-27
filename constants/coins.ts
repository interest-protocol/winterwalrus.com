import {
  Network,
  SHARED_OBJECTS,
  TYPES,
} from '@interest-protocol/blizzard-sdk';

import { SnowSVG, WalSVG } from '@/components/svg';

export const COIN_DECIMALS = {
  [TYPES[Network.Testnet].WAL]: 9,
  [TYPES[Network.Testnet].SNOW]: 9,
};

export const COIN_METADATA = {
  [TYPES[Network.Testnet].WAL]: {
    name: 'WAL',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES[Network.Testnet].WAL,
  },
  [TYPES[Network.Testnet].SNOW]: {
    type: TYPES[Network.Testnet].SNOW,
    symbol: 'SNOW',
    name: 'Snow',
  },
  [TYPES[Network.Testnet].STAKED_WAL]: {
    type: TYPES[Network.Testnet].SNOW,
    symbol: 'SWAL',
    name: 'Staked WAL',
  },
};

export const COIN_ICON = {
  [TYPES[Network.Testnet].WAL]: WalSVG,
  [TYPES[Network.Testnet].SNOW]: SnowSVG,
};

export const NFT_IMAGE = {
  [TYPES[Network.Testnet].STAKED_WAL]: '/staked-wal.png',
  [TYPES[Network.Testnet].BLIZZARD_STAKE_NFT]: '/blizzard-nft.png',
} as const;

export const STAKING_COIN = {
  [TYPES[Network.Testnet].SNOW]: SHARED_OBJECTS[Network.Testnet].SNOW_STAKING({
    mutable: true,
  }).objectId,
};
