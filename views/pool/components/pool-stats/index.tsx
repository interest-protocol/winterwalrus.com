import { Div, Img, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import useMetadata from '@/hooks/use-metadata';
import { usePool } from '@/hooks/use-pool';
import { formatDollars } from '@/utils';

import { usePoolMetrics } from './pool-stats.hooks';

const PoolStats: FC = () => {
  const pool = usePool();

  const { data, isLoading: poolLoading } = usePoolMetrics(pool?.objectId);

  const stats = [
    {
      label: 'TVL',
      value: formatDollars(+Number(data?.tvl ?? '0').toFixed(2)),
    },
    {
      label: '24h Volume',
      value: formatDollars(+Number(data?.volume1D ?? '0').toFixed(2)),
    },
    {
      label: '24h Fees',
      value: formatDollars(+(Number(data?.fees1D) ?? 0).toFixed(2)),
    },
    {
      label: 'APR',
      value: `${(Number(data?.apr) ?? 0).toFixed(2)}%`,
    },
  ];

  const type = pool?.lpCoinType;

  const { data: metadata, isLoading } = useMetadata([
    type,
    ...(pool?.coinTypes ?? []),
  ]);

  return (
    <Div
      gap="1rem"
      width="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
      alignItems={['stretch', 'center']}
    >
      <Div
        gap="1rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={['100%', 'auto']}
      >
        <Div display="flex" gap="0.5rem" color="#FFFFFF" alignItems="center">
          {isLoading ? (
            <Skeleton width="5rem" />
          ) : (
            <Img
              width="1.5rem"
              height="1.5rem"
              borderRadius="50%"
              alt={metadata?.[type]?.name}
              src={metadata?.[type]?.iconUrl}
            />
          )}
          {isLoading ? (
            <Skeleton width="5rem" />
          ) : (
            <Span fontFamily="JetBrains Mono">{metadata?.[type]?.symbol}</Span>
          )}
        </Div>
        <Span
          px="0.5rem"
          py="0.25rem"
          bg="#44444A"
          color="#FFFFFF"
          borderRadius="1.5rem"
          display="inline-block"
          mt={['0.5rem', '0']}
        >
          Stable
        </Span>
      </Div>
      <Div
        gap="0.5rem"
        display="flex"
        flexWrap="wrap"
        mt={['1rem', '0']}
        width={['100%', 'auto']}
        justifyContent={['flex-start', 'flex-end']}
      >
        {stats.map(({ label, value }) => (
          <Div
            key={label}
            p="1rem"
            gap="0.25rem"
            display="flex"
            minWidth="6rem"
            border="1px solid"
            alignItems="center"
            fontSize="0.875rem"
            mb={['0.5rem', '0']}
            flexDirection="column"
            borderRadius="0.625rem"
            borderColor="#FFFFFF1A"
            width={['48%', 'auto']}
          >
            <P color="#FFFFFF" fontFamily="JetBrains Mono">
              {poolLoading ? <Skeleton width="4rem" /> : value}
            </P>
            <P color="#FFFFFF80">{label}</P>
          </Div>
        ))}
      </Div>
    </Div>
  );
};

export default PoolStats;
