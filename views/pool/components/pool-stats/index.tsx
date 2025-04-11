import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div, Img, P, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import useMetadata from '@/hooks/use-metadata';
import { SdkPool } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney } from '@/utils';

import { usePoolData } from './pool-stats.hook';

const PoolStats: FC = () => {
  const { query } = useRouter();
  const pool = (POOLS as Record<string, SdkPool>)[String(query.pool)];
  const type = pool?.lpCoinType;
  const { data: metadata, isLoading } = useMetadata([
    type,
    ...(pool?.coinTypes ?? []),
  ]);

  const { data: poolData, isLoading: poolLoading } = usePoolData(pool.objectId);

  return (
    <Div
      p="1rem"
      gap="0.5rem"
      bg="#FFFFFF0D"
      display="flex"
      border="1px solid"
      borderRadius="1rem"
      flexDirection="column"
      borderColor="#FFFFFF1A"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <Div display="flex" gap="0.5rem" color="#FFFFFF">
          {isLoading ? (
            <Skeleton width="5rem" />
          ) : (
            <Img
              width="1.5rem"
              height="1.5rem"
              borderRadius="50%"
              src={metadata?.[type]?.iconUrl}
              alt={metadata?.[type]?.name}
            />
          )}
          {isLoading ? (
            <Skeleton width="5rem" />
          ) : (
            <Span fontFamily="JetBrains Mono">
              {metadata?.[type]?.symbol.replace('s-', '')}
            </Span>
          )}
        </Div>
        <Span
          px="0.5rem"
          py="0.25rem"
          bg="#44444A"
          color="#FFFFFF"
          borderRadius="1.5rem"
          display="inline-block"
        >
          Stable
        </Span>
      </Div>
      <Div
        display="grid"
        gridTemplateColumns={[
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(4, 1fr)',
          'repeat(2, 1fr)',
        ]}
        gap="0.5rem"
      >
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            --
          </P>
          <P color="#FFFFFF80">TVL</P>
        </Div>
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            --
          </P>
          <P color="#FFFFFF80">Volume</P>
        </Div>
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            --
          </P>
          <P color="#FFFFFF80">Fees</P>
        </Div>
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            --
          </P>
          <P color="#FFFFFF80">APR</P>
        </Div>
      </Div>
      <Div
        gap="0.5rem"
        display="flex"
        color="#FFFFFF"
        fontFamily="JetBrains Mono"
      >
        Pool Balances
      </Div>
      <Div display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="0.5rem">
        {pool?.coinTypes.map((coin, index) => (
          <Div
            p="1rem"
            key={coin}
            gap="0.25rem"
            display="flex"
            border="1px solid"
            alignItems="center"
            fontSize="0.875rem"
            flexDirection="column"
            borderRadius="0.625rem"
            borderColor="#FFFFFF1A"
          >
            <P color="#FFFFFF" fontFamily="JetBrains Mono">
              {poolLoading ? (
                <Skeleton width="3rem" />
              ) : (
                formatMoney(
                  Number(
                    FixedPointMath.toNumber(
                      BigNumber(String(poolData?.balances[index]) ?? 0),
                      18
                    ).toFixed(5)
                  )
                )
              )}
            </P>
            <P color="#FFFFFF80">
              {isLoading ? <Skeleton width="2rem" /> : metadata?.[coin]?.symbol}
            </P>
          </Div>
        )) ?? (
          <>
            <Div
              p="1rem"
              gap="0.25rem"
              display="flex"
              border="1px solid"
              alignItems="center"
              fontSize="0.875rem"
              flexDirection="column"
              borderRadius="0.625rem"
              borderColor="#FFFFFF1A"
            >
              <P color="#FFFFFF" fontFamily="JetBrains Mono">
                <Skeleton width="3rem" />
              </P>
              <P color="#FFFFFF80">
                <Skeleton width="2rem" />
              </P>
            </Div>
            <Div
              p="1rem"
              gap="0.25rem"
              display="flex"
              border="1px solid"
              alignItems="center"
              fontSize="0.875rem"
              flexDirection="column"
              borderRadius="0.625rem"
              borderColor="#FFFFFF1A"
            >
              <P color="#FFFFFF" fontFamily="JetBrains Mono">
                <Skeleton width="3rem" />
              </P>
              <P color="#FFFFFF80">
                <Skeleton width="2rem" />
              </P>
            </Div>
          </>
        )}
      </Div>
    </Div>
  );
};

export default PoolStats;
