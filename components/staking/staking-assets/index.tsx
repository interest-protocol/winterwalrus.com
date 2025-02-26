import { Div, P } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { FC } from 'react';

import { useStakingObjects } from '@/hooks/use-staking-objects';

import StakingAssetsItem from './staking-assets-item';

const StakingAssets: FC = () => {
  const { stakingObjectIds } = useStakingObjects();

  if (!stakingObjectIds?.length)
    return (
      <Div
        p="1rem"
        gap="1rem"
        display="flex"
        color="#ffffff"
        flexDirection="column"
        borderRadius="0.625rem"
        border="1px solid #FFFFFF1A"
      >
        <P textAlign="center" fontSize="0.875rem">
          You are not staking any WAL!
        </P>
      </Div>
    );

  return (
    <Div
      px="0.5rem"
      gap="0.5rem"
      height="100%"
      display="flex"
      overflow="auto"
      flexDirection="column"
    >
      <AnimatePresence>
        {stakingObjectIds.map((stakingObjectId) => (
          <StakingAssetsItem key={stakingObjectId} id={stakingObjectId} />
        ))}
      </AnimatePresence>
    </Div>
  );
};

export default StakingAssets;
