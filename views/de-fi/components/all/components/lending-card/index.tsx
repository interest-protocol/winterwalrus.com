import { Div } from '@stylin.js/elements';
import type { FC } from 'react';

import InfoBox from '../info-box';
import LendingBadge from '../lending-badge';
import { ILendingCard } from './lending-card.types';

const LendingCard: FC<ILendingCard> = ({
  platform,
  imageUrl,
  assetIconA,
  assetIconB,
  asset,
  apr,
  tvl,
  category,
  points,
}) => {
  return (
    <Div
      p="1rem"
      gap="1rem"
      bg="#121212"
      width="100%"
      display="flex"
      border="1px solid"
      borderRadius="1rem"
      flexDirection="column"
      borderColor="#FFFFFF1A"
    >
      <LendingBadge platform={platform} imageUrl={imageUrl} />
      <Div
        width="100%"
        display="grid"
        gridTemplateColumns={['repeat(2, 1fr)', 'repeat(5, 1fr)']}
        gap="0.5rem"
      >
        <InfoBox
          label="Assets"
          value={asset}
          iconImages={[assetIconA, assetIconB]}
        />
        <InfoBox label="APR" value={apr} />
        <InfoBox label="TVL" value={tvl} />
        <InfoBox label="Category" value={category} />
        <InfoBox label="SEND Points" value={points} />
      </Div>
    </Div>
  );
};

export default LendingCard;
