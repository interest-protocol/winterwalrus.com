import { Div, H3, P, Strong } from '@stylin.js/elements';
import { FC } from 'react';

import { useStakingObjects } from '@/hooks/use-staking-objects';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import StakingAssets from './staking-assets';

const Staking: FC = () => {
  const { principals } = useStakingObjects();

  return (
    <Div
      py="1rem"
      gap="1rem"
      px="0.5rem"
      my="0.5rem"
      bottom="1rem"
      bg="#FFFFFF0D"
      display="flex"
      color="#ffffff"
      position="sticky"
      borderRadius="1rem"
      flexDirection="column"
      maxHeight="calc(100vh - 2rem)"
      border="1px solid #FFFFFF1A"
    >
      <Div
        px="0.5rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <H3 fontSize="1rem" fontWeight="600">
          Total Principal
        </H3>
        <P
          p="0.5rem"
          color="#fff"
          borderRadius="0.5rem"
          fontFamily="JetBrains Mono"
          border="1px solid #99EFE44D"
        >
          {FixedPointMath.toNumber(
            principals?.reduce(
              (acc, principal) => acc.plus(principal),
              ZERO_BIG_NUMBER
            ) ?? ZERO_BIG_NUMBER,
            9
          )}{' '}
          <Strong color="#99EFE4" fontFamily="inherit">
            WAL
          </Strong>
        </P>
      </Div>
      <StakingAssets />
    </Div>
  );
};

export default Staking;
