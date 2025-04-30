import { TYPES } from '@interest-protocol/blizzard-sdk';
import { FC } from 'react';

import LSTNFTsTable from './lst-nftsl-table';

const LSTNFTs: FC = () => {
  return (
    <>
      <LSTNFTsTable StructType={TYPES.BLIZZARD_STAKE_NFT} />
    </>
  );
};

export default LSTNFTs;
