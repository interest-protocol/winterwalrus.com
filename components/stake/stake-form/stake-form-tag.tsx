import { P } from '@stylin.js/elements';
import { FC } from 'react';

import useEpochData from '@/hooks/use-epoch-data';

const StakeFormTag: FC = () => {
  const { data } = useEpochData();
  const percentage = +(
    data && data.currentEpoch
      ? ((data.epochDurationMs - data.msUntilNextEpoch) * 100) /
        data.epochDurationMs
      : 0
  ).toFixed(2);

  return (
    <P
      px="0.5rem"
      py="0.25rem"
      bg="#83F34E14"
      color="#83F34E"
      fontSize="0.75rem"
      borderRadius="1.7rem"
    >
      {percentage > 50 ? 'Minting Stake NFT' : 'Minting LST Coin'}
    </P>
  );
};

export default StakeFormTag;
