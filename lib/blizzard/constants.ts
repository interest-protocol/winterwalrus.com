// Ported from @interest-protocol/blizzard-sdk@4.1.0 (mainnet)

export const MAX_BPS = 10_000;

export enum Modules {
  AllowedVersions = 'blizzard_allowed_versions',
  Protocol = 'blizzard_protocol',
  StakeNFT = 'blizzard_stake_nft',
  Utils = 'blizzard_utils',
  Hooks = 'blizzard_hooks',
  WalrusStaking = 'staking',
}

export const PACKAGES = {
  WWAL: {
    original:
      '0xb1b0650a8862e30e3f604fd6c5838bc25464b8d3d827fbd58af7cb9685b832bf',
    latest:
      '0xb1b0650a8862e30e3f604fd6c5838bc25464b8d3d827fbd58af7cb9685b832bf',
  },
  UP_WAL: {
    original:
      '0x615b29e7cf458a4e29363a966a01d6a6bf5026349bb4e957daa61ca9ffff639d',
    latest:
      '0x615b29e7cf458a4e29363a966a01d6a6bf5026349bb4e957daa61ca9ffff639d',
  },
  BREAD_WAL: {
    original:
      '0x5f70820b716a1d83580e5cf36dd0d0915b8763e1b85e3ef3db821ff40846be44',
    latest:
      '0x5f70820b716a1d83580e5cf36dd0d0915b8763e1b85e3ef3db821ff40846be44',
  },
  PWAL: {
    original:
      '0x0f03158a2caec1b656ee929007d08e58d620eeabeacac90ea7657d8b386b00b9',
    latest:
      '0x0f03158a2caec1b656ee929007d08e58d620eeabeacac90ea7657d8b386b00b9',
  },
  NWAL: {
    original:
      '0xd8b855d48fb4d8ffbb5c4a3ecac27b00f3712ce58626deb5a16a290e0c6edf84',
    latest:
      '0xd8b855d48fb4d8ffbb5c4a3ecac27b00f3712ce58626deb5a16a290e0c6edf84',
  },
  MWAL: {
    original:
      '0x64e081287af3fb4eb5720137348661493203d48535f582577177fcd3b253805f',
    latest:
      '0x64e081287af3fb4eb5720137348661493203d48535f582577177fcd3b253805f',
  },
  TR_WAL: {
    original:
      '0xa8ad8c2720f064676856f4999894974a129e3d15386b3d0a27f3a7f85811c64a',
    latest:
      '0xa8ad8c2720f064676856f4999894974a129e3d15386b3d0a27f3a7f85811c64a',
  },
  BLIZZARD: {
    original:
      '0x29ba7f7bc53e776f27a6d1289555ded2f407b4b1a799224f06b26addbcd1c33d',
    latest:
      '0xb07e5d6ea5097a79106a4ce35183c74fd6e2b041a411613701cca20c59154858',
  },
  BLIZZARD_HOOKS: {
    original:
      '0x5392d12dd878b680562e9a2773dc83e3158ce8a947c289af7cf39f1de3898fbe',
    latest:
      '0x5392d12dd878b680562e9a2773dc83e3158ce8a947c289af7cf39f1de3898fbe',
  },
  WAL: {
    original:
      '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59',
    latest:
      '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59',
  },
  WALRUS: {
    original:
      '0xfdc88f7d7cf30afab2f82e8380d11ee8f70efb90e863d1de8616fae1bb09ea77',
    latest:
      '0x98da433aa0139512c210597b1c5e3df6cd121d8d77f8652691bb66fadfc8aa1b',
  },
  BLIZZARD_UTILS: {
    original:
      '0xd73b0dc7a65c6ce95c202a9cf22f102363c9d0ae50cc14c872058fd45b296e70',
    latest:
      '0xd73b0dc7a65c6ce95c202a9cf22f102363c9d0ae50cc14c872058fd45b296e70',
  },
} as const;

const sharedObject =
  (objectId: string, initialSharedVersion: string) =>
  ({ mutable }: { mutable: boolean }) => ({
    objectId,
    initialSharedVersion,
    mutable,
  });

export const SHARED_OBJECTS = {
  WALRUS_STAKING: sharedObject(
    '0x10b9d30c28448939ce6c4d6c6e0ffce4a7f8a4ada8248bdad09ef8b70e4a3904',
    '317862159'
  ),
  BLIZZARD_AV: sharedObject(
    '0x4199e3c5349075a98ec0b6100c7f1785242d97ba1f9311ce7a3a021a696f9e4a',
    '511167559'
  ),
  WWAL_STAKING: sharedObject(
    '0xccf034524a2bdc65295e212128f77428bb6860d757250c43323aa38b3d04df6d',
    '511181119'
  ),
  PWAL_STAKING: sharedObject(
    '0xd355b8e62f16418a02879de9bc4ab15c4dad9dd2966d15645e1674689bfbc8b9',
    '511946394'
  ),
  BREAD_WAL_STAKING: sharedObject(
    '0xc75f916f5cdc94664f58f5e8284a70ef69f973d62cd9841584bc70200a98a8b7',
    '512115338'
  ),
  NWAL_STAKING: sharedObject(
    '0x75c4a3d4f78aa3157e2ab6e8dfb2230432272c23ab9392b10a2212e4b2fcc9f9',
    '512202210'
  ),
  UP_WAL_STAKING: sharedObject(
    '0xa3d69fdb63cbeaec068e8739fe7bda05a184f82999d1e76f0c0f5e9a29e297ed',
    '513318745'
  ),
  MWAL_STAKING: sharedObject(
    '0x1c98a3851302351913b34491a07930e83b1bd502cf1c6e9428b1c5d690d1e074',
    '513336587'
  ),
  TR_WAL_STAKING: sharedObject(
    '0x76d5f7309ac302c10aa91d72ab7d48252a840816c39764293e986ce90c3c4a0d',
    '525079391'
  ),
};

export const INNER_WALRUS_STAKING_ID =
  '0xa1d6719d0447c536a41688d5762449782bed731ac708659d98f9bff668b555b3';

export const INNER_LST_STATE_ID: Record<string, string> = {
  [SHARED_OBJECTS.WWAL_STAKING({ mutable: false }).objectId]:
    '0xa9c43ae543b29a20467cdc3e933c3b7651089d56b1d99d6d4d863ae09fdc5624',
  [SHARED_OBJECTS.PWAL_STAKING({ mutable: false }).objectId]:
    '0x857e3c653b517cf99820e7ee680de933799807eb780ca62344a60940311959a0',
  [SHARED_OBJECTS.BREAD_WAL_STAKING({ mutable: false }).objectId]:
    '0x663c44caf0a40f148b9ba76e31d612dcaa138b3f2868990bcd48e89f183fdd44',
  [SHARED_OBJECTS.NWAL_STAKING({ mutable: false }).objectId]:
    '0xf29b73f0f22d2c7fc72c1fe9858859bc0268c3bc5742c4181d4bc2162b6f3f4a',
  [SHARED_OBJECTS.UP_WAL_STAKING({ mutable: false }).objectId]:
    '0xb87a1e9ff830d6855d5197d1946640b67c198378958fece54c4b29f780220eca',
  [SHARED_OBJECTS.MWAL_STAKING({ mutable: false }).objectId]:
    '0x92e5a5312dbd299c7284788e60eca29e5241406ce6b35a2588d94d903a401a40',
  [SHARED_OBJECTS.TR_WAL_STAKING({ mutable: false }).objectId]:
    '0xba9ef1033d861252f6254752a2ba6e495ca08702dd2bc524a6ef1a76f8ac5a54',
};

export const INNER_LST_TREASURY_CAP: Record<string, string> = {
  [SHARED_OBJECTS.WWAL_STAKING({ mutable: false }).objectId]:
    '0x423ec7efb16a74e6885385a49df3436758fa9e79302a9f0de9485b8874cf2aaf',
  [SHARED_OBJECTS.PWAL_STAKING({ mutable: false }).objectId]:
    '0x2f30428b1ae24b8708b59c0083881c8ebf8149a5932323e6f1f25d59a3d7a53c',
  [SHARED_OBJECTS.BREAD_WAL_STAKING({ mutable: false }).objectId]:
    '0xc4afc289ea27490d5e59e379c875890af37041f9bdf9651d1c213a097c328216',
  [SHARED_OBJECTS.NWAL_STAKING({ mutable: false }).objectId]:
    '0xbd3194d22731232d22f484bb44a9d02880bef12f2ab1fd5abe802ea9a08e69a5',
  [SHARED_OBJECTS.UP_WAL_STAKING({ mutable: false }).objectId]:
    '0xa8315b6458e455121e0d8c7a656e31e1c9ccb9433c166289a3c93904d2046cdc',
  [SHARED_OBJECTS.MWAL_STAKING({ mutable: false }).objectId]:
    '0xe1b3079eea6e85fba6b013d101351f9c6397e5a56b8fe48624de5aa71a796933',
  [SHARED_OBJECTS.TR_WAL_STAKING({ mutable: false }).objectId]:
    '0x390082df42428e33c5c4a3a9ec9a33567f8748e2cb5a6c4953c7a884f032e2b5',
};

export const TYPES = {
  WWAL: `${PACKAGES.WWAL.original}::wwal::WWAL`,
  BLIZZARD: `${PACKAGES.BLIZZARD.original}::blizzard::BLIZZARD`,
  WAL: `${PACKAGES.WAL.original}::wal::WAL`,
  STAKED_WAL: `${PACKAGES.WALRUS.original}::staked_wal::StakedWal`,
  BLIZZARD_STAKE_NFT: `${PACKAGES.BLIZZARD.original}::blizzard_stake_nft::BlizzardStakeNFT`,
  UP_WAL: `${PACKAGES.UP_WAL.original}::up_wal::UP_WAL`,
  BREAD_WAL: `${PACKAGES.BREAD_WAL.original}::bread_wal::BREAD_WAL`,
  NWAL: `${PACKAGES.NWAL.original}::nwal::NWAL`,
  PWAL: `${PACKAGES.PWAL.original}::pwal::PWAL`,
  MWAL: `${PACKAGES.MWAL.original}::mwal::MWAL`,
  TR_WAL: `${PACKAGES.TR_WAL.original}::tr_wal::TR_WAL`,
};
