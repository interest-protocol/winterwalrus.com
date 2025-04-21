import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div, Img, P, Span } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';

import useMetadata from '@/hooks/use-metadata';
import { SdkPool } from '@/interface';

const stats = [
  { label: 'TVL', value: '--' },
  { label: 'Volume', value: '--' },
  { label: 'Fees', value: '--' },
  { label: 'APR', value: '--' },
];

const PoolStats: FC = () => {
  const { query } = useRouter();
  const pool = useMemo(
    () => (POOLS as Record<string, SdkPool>)[String(query.pool)],
    [query]
  );
  const type = pool?.lpCoinType;

  const { data: metadata, isLoading } = useMetadata([
    type,
    ...(pool?.coinTypes ?? []),
  ]);

  return (
    <Div
      gap="1rem"
      display="flex"
      justifyContent="space-between"
      flexDirection={['column', 'row']}
      alignItems={['stretch', 'center']}
      width="100%"
    >
      <Div
        display="flex"
        gap="1rem"
        alignItems="center"
        flexDirection={['column', 'row']}
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
              src={metadata?.[type]?.iconUrl}
              alt={metadata?.[type]?.name}
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
        display="flex"
        gap="0.5rem"
        flexWrap="wrap"
        justifyContent={['flex-start', 'flex-end']}
        width={['100%', 'auto']}
        mt={['1rem', '0']}
      >
        {stats.map(({ label, value }) => (
          <Div
            key={label}
            p="1rem"
            gap="0.25rem"
            display="flex"
            border="1px solid"
            alignItems="center"
            fontSize="0.875rem"
            flexDirection="column"
            borderRadius="0.625rem"
            borderColor="#FFFFFF1A"
            minWidth="6rem"
            width={['48%', 'auto']}
            mb={['0.5rem', '0']}
          >
            <P color="#FFFFFF" fontFamily="JetBrains Mono">
              {value}
            </P>
            <P color="#FFFFFF80">{label}</P>
          </Div>
        ))}
      </Div>
    </Div>
  );
};

export default PoolStats;
