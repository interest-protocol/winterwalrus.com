import { TYPES } from '@interest-protocol/blizzard-sdk';
import { FC } from 'react';

import LSTNFTsTable from '../../lst-nfts/lst-nftsl-table';

const NativeStakedWalCoinsTable: FC = () => {
  return <LSTNFTsTable StructType={TYPES.STAKED_WAL} />;
};

export default NativeStakedWalCoinsTable;
