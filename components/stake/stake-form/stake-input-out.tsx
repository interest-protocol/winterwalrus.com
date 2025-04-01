import { P } from '@stylin.js/elements';
import { FC } from 'react';

import InputField from '@/components/input-field';
import { LST_TYPES } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';

const StakeInputOut: FC = () => {
  const { data } = useEpochData();
  const percentage = +(
    data && data.currentEpoch
      ? ((data.epochDurationMs - data.msUntilNextEpoch) * 100) /
        data.epochDurationMs
      : 0
  ).toFixed(2);

  return (
    <InputField
      disabled
      name="out"
      label="Out"
      types={LST_TYPES.map((type) => (percentage > 50 ? `nft:${type}` : type))}
      topContent={
        <P
          px="0.5rem"
          py="0.25rem"
          fontSize="0.75rem"
          borderRadius="1.7rem"
          color={percentage > 50 ? '#C484F6' : '#83F34E'}
          bg={percentage > 50 ? '#C484F633' : '#83F34E14'}
        >
          {percentage > 50 ? 'Minting Stake NFT' : 'Minting LST Coin'}
        </P>
      }
    />
  );
};

export default StakeInputOut;
