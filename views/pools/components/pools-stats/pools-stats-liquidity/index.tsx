import { Div, H2, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formatDollars } from '@/utils';

import { usePoolsMetrics } from '../pools-stats.hooks';

const LiquidityPools: FC = () => {
  const { metrics, isLoading } = usePoolsMetrics();

  return (
    <Div
      p="1rem"
      gap="1rem"
      bg="#FFFFFF0D"
      display="flex"
      border="1px solid"
      borderRadius="1rem"
      flexDirection="column"
      borderColor="#FFFFFF1A"
    >
      <H2 fontWeight="600" fontSize="1rem" color="#FFFFFF">
        Liquidity Pools
      </H2>
      <Div
        gap="1rem"
        display="grid"
        gridTemplateColumns={['1fr', '1fr 1fr', '1fr']}
      >
        <Div
          p="1.5rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="max-content"
        >
          {isLoading ? (
            <>
              <Skeleton width="1.5rem" height="1rem" borderRadius="50%" />
              <Skeleton width="1.5rem" height="1rem" borderRadius="50%" />
            </>
          ) : (
            <>
              <P color="#FFFFFF" fontFamily="JetBrains Mono">
                {metrics ? formatDollars(Number(metrics.tvl)) : '--'}
              </P>
              <P color="#FFFFFF80">Total Value Locked</P>
            </>
          )}
        </Div>
        <Div
          p="1.5rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="max-content"
        >
          {isLoading ? (
            <>
              <Skeleton width="1.5rem" height="1rem" borderRadius="50%" />
              <Skeleton width="1.5rem" height="1rem" borderRadius="50%" />
            </>
          ) : (
            <>
              <P color="#FFFFFF" fontFamily="JetBrains Mono">
                {metrics ? formatDollars(Number(metrics.volume)) : '--'}
              </P>
              <P color="#FFFFFF80">Cumulative Volume</P>
            </>
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default LiquidityPools;
