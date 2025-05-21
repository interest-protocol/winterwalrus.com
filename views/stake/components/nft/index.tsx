import { Div, H3, P, Strong } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC } from 'react';

import { useAppState } from '@/hooks/use-app-state';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import StakingAssets from './nft-assets';

const NFT: FC = () => {
  const { principalsByType } = useAppState();

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
          border="1px solid #EE2B5B4D"
        >
          {FixedPointMath.toNumber(
            values(principalsByType).reduce(
              (acc, principal) => acc.plus(principal),
              ZERO_BIG_NUMBER
            ),
            9
          )}{' '}
          <Strong color="#EE2B5B" fontFamily="inherit">
            WAL
          </Strong>
        </P>
      </Div>
      <StakingAssets />
    </Div>
  );
};

export default NFT;
