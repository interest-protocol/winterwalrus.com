import { Div } from '@stylin.js/elements';
import type { FC } from 'react';

import APRInfo from './apr-info';
import AssetInfo from './asset-info';
import CategoryInfo from './category-info';
import LendingBadge from './lending-badget';
import PointsInfo from './points-info';
import TVLInfo from './tvl-info';

interface LendingCardProps {
  platform: string;
  badgeColor: string;
  asset: string;
  apr: string;
  tvl: string;
  category: string;
  points: string;
}

const LendingCard: FC<LendingCardProps> = ({
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
        <AssetInfo asset={asset} />
        <APRInfo apr={apr} />
        <TVLInfo tvl={tvl} />
        <CategoryInfo category={category} />
        <PointsInfo points={points} />
      </Div>
    </Div>
  );
};

export default LendingCard;
