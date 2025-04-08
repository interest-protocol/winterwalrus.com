import { SHARED_OBJECTS, TYPES } from '@interest-protocol/blizzard-sdk';

import { AssetMetadata } from '@/interface';

export const LST_TYPES_MAP: Record<string, string> = {
  WWAL: TYPES.WWAL,
  PWAL: TYPES.PWAL,
  MWAL: TYPES.MWAL,
  NWAL: TYPES.NWAL,
  UPWAL: TYPES.UP_WAL,
  BREADWAL: TYPES.BREAD_WAL,
  TRWAL: TYPES.TR_WAL,
};
export const LST_TYPES = Object.values(LST_TYPES_MAP);
export const LST_TYPES_KEY = Object.keys(LST_TYPES_MAP);

export const NFT_TYPES: ReadonlyArray<string> = [
  TYPES.STAKED_WAL,
  TYPES.BLIZZARD_STAKE_NFT,
];

export const NFT_IMAGE = {
  [TYPES.STAKED_WAL]: '/staked-wal.png',
  [TYPES.BLIZZARD_STAKE_NFT]: '/blizzard-nft.png',
} as const;

export const ASSET_METADATA: Record<string, AssetMetadata> = {
  [TYPES.WAL]: {
    name: 'WAL',
    decimals: 9,
    symbol: 'WAL',
    type: TYPES.WAL,
    iconUrl:
      'https://cdn.prod.website-files.com/66a8b39f3ac043de2548ab05/67a0d056287d0398a93668ee_logo_icon_w%20(1).svg',
  },
  [TYPES.STAKED_WAL]: {
    decimals: 9,
    symbol: 'sWAL',
    name: 'Staked WAL',
    type: TYPES.STAKED_WAL,
    iconUrl: '/staked-wal.png',
  },
  [`nft:${LST_TYPES_MAP.WWAL}`]: {
    decimals: 9,
    symbol: 'wWALNFT',
    name: 'Blizzard wWAL',
    type: `nft:${LST_TYPES_MAP.WWAL}`,
    iconUrl: '/wWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.PWAL}`]: {
    decimals: 9,
    symbol: 'pWALNFT',
    name: 'Blizzard pWAL',
    type: `nft:${LST_TYPES_MAP.PWAL}`,
    iconUrl: '/pWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.MWAL}`]: {
    decimals: 9,
    symbol: 'mWALNFT',
    name: 'Blizzard mWAL',
    type: `nft:${LST_TYPES_MAP.MWAL}`,
    iconUrl: '/mWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.NWAL}`]: {
    decimals: 9,
    symbol: 'nWALNFT',
    name: 'Blizzard nWAL',
    type: `nft:${LST_TYPES_MAP.NWAL}`,
    iconUrl: '/nWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.BREADWAL}`]: {
    decimals: 9,
    symbol: 'breadWALNFT',
    name: 'Blizzard breadWAL',
    type: `nft:${LST_TYPES_MAP.BREADWAL}`,
    iconUrl: '/breadWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.UPWAL}`]: {
    decimals: 9,
    symbol: 'upWALNFT',
    name: 'Blizzard upWAL',
    type: `nft:${LST_TYPES_MAP.UPWAL}`,
    iconUrl: '/upWALNFT.png',
  },
  [`nft:${LST_TYPES_MAP.TRWAL}`]: {
    decimals: 9,
    symbol: 'trWALNFT',
    name: 'Blizzard trWAL',
    type: `nft:${LST_TYPES_MAP.TRWAL}`,
    iconUrl: '/trWALNFT.png',
  },
};

export const COIN_TYPES: ReadonlyArray<string> = [TYPES.WAL];

export const LST_LIST: ReadonlyArray<AssetMetadata> = [
  ASSET_METADATA[LST_TYPES_MAP.WWAL],
  ASSET_METADATA[LST_TYPES_MAP.BREADWAL],
  ASSET_METADATA[LST_TYPES_MAP.MWAL],
  ASSET_METADATA[LST_TYPES_MAP.NWAL],
  ASSET_METADATA[LST_TYPES_MAP.UPWAL],
  ASSET_METADATA[LST_TYPES_MAP.PWAL],
  ASSET_METADATA[LST_TYPES_MAP.TRWAL],
];

export const STAKING_OBJECT = {
  [LST_TYPES_MAP.WWAL]: SHARED_OBJECTS.WWAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.BREADWAL]: SHARED_OBJECTS.BREAD_WAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.MWAL]: SHARED_OBJECTS.MWAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.NWAL]: SHARED_OBJECTS.NWAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.PWAL]: SHARED_OBJECTS.PWAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.UPWAL]: SHARED_OBJECTS.UP_WAL_STAKING({
    mutable: true,
  }).objectId,
  [LST_TYPES_MAP.TRWAL]: SHARED_OBJECTS.TR_WAL_STAKING({
    mutable: true,
  }).objectId,
};
