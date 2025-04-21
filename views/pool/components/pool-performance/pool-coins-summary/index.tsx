import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div, Img, Span } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { CopySVG } from '@/components/svg';
import ExternalLink from '@/components/svg/external-link';
import useMetadata from '@/hooks/use-metadata';
import { SdkPool } from '@/interface';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

export const PoolCoinsSummary: FC = () => {
  const { query } = useRouter();
  const pool = (POOLS as Record<string, SdkPool>)[String(query.pool)];

  const coins = pool?.coinTypes.map((type) => ({
    type,
    value: '0',
    valueBN: ZERO_BIG_NUMBER,
  }));
  const quoting = false;

  const lpCoin = {
    value: '0',
    id: pool?.objectId,
    type: pool?.lpCoinType,
    valueBN: ZERO_BIG_NUMBER,
  };

  const { data, isLoading } = useMetadata([
    lpCoin?.type,
    ...(coins?.map(({ type }) => type) ?? []),
  ]);

  return (
    <Div gap="0.5rem" display="flex" color="#FFFFFF" flexDirection="column">
      {coins.map(({ type, value }) => (
        <Div
          gap="0.5rem"
          key={unikey()}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Div display="flex" alignItems="center" gap="0.5rem">
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              <Img
                width="1.5rem"
                height="1.5rem"
                borderRadius="50%"
                alt={data?.[type]?.name}
                src={data?.[type]?.iconUrl}
              />
            )}
            {isLoading ? (
              <Skeleton width="5rem" />
            ) : (
              <Span color="#FFFFFF">{data?.[type]?.symbol}</Span>
            )}
          </Div>

          <Div display="flex" alignItems="center" gap="0.3rem">
            <Span fontFamily="JetBrains Mono">
              {quoting ? <Skeleton width="5rem" /> : formatMoney(Number(value))}
            </Span>
            <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            <ExternalLink width="100%" maxWidth="0.8rem" maxHeight="0.8rem" />
          </Div>
        </Div>
      ))}
    </Div>
  );
};
