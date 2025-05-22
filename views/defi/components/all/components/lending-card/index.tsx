import { Div } from '@stylin.js/elements';
import type { FC } from 'react';

import InfoBox from '../info-box';
import LendingBadge from '../lending-badge';
import { ILendingCard } from './lending-card.types';

const LendingCard: FC<ILendingCard> = ({
  platform,
  badgeColor,
  asset,
  apr,
  tvl,
  category,
  points,
}) => {
  return (
    <Div
      p="1rem"
      width="100%"
      display="flex"
      bg="#121212"
      border="1px solid"
      borderRadius="1rem"
      flexDirection="column"
      borderColor="#FFFFFF1A"
      gap="1rem"
    >
      <LendingBadge platform={platform} badgeColor={badgeColor} />
      <Div
        width="100%"
        display="grid"
        gridTemplateColumns={['repeat(2, 1fr)', 'repeat(5, 1fr)']}
        gap="0.5rem"
      >
        <InfoBox
          label="Assets"
          value={asset}
          icon={
            <Div
              width="1rem"
              height="1rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="50%"
              bg="#3366FF"
              color="#FFFFFF"
              fontSize="0.5rem"
            >
              W
            </Div>
          }
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
