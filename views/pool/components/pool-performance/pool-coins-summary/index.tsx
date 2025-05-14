import { A, Div, Img, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { CheckmarkSVG, CopySVG, ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode } from '@/constants';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import useMetadata from '@/hooks/use-metadata';
import { usePool } from '@/hooks/use-pool';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { usePoolData } from '../../pool-stats/pool-stats.hooks';

export const PoolCoinsSummary: FC = () => {
  const pool = usePool();
  const getExplorerUrl = useGetExplorerUrl();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const coins = pool?.coinTypes.map((type) => ({
    type,
    value: '0',
    valueBN: ZERO_BIG_NUMBER,
  }));

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

  const { data: poolData, isLoading: poolLoading } = usePoolData(
    pool?.objectId
  );

  const handleCopy = async (index: number, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <Div gap="0.5rem" display="flex" color="#FFFFFF" flexDirection="column">
      {coins?.map(({ type }, index) => {
        const balance = poolData
          ? formatMoney(
              Number(
                FixedPointMath.toNumber(
                  BigNumber(String(poolData.balances[index] ?? 0)),
                  18
                ).toFixed(5)
              )
            )
          : '--';

        return (
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
                {poolLoading ? <Skeleton width="3rem" /> : balance}
              </Span>
              <Div position="relative" display="flex" alignItems="center">
                {copiedIndex === index ? (
                  <Span color="#99EFE4" display="flex" alignItems="center">
                    <CheckmarkSVG width="100%" maxWidth="1rem" />
                  </Span>
                ) : (
                  <Span
                    display="flex"
                    alignItems="center"
                    nHover={{ color: '#99EFE4' }}
                  >
                    <CopySVG
                      width="100%"
                      maxWidth="1rem"
                      onClick={() => handleCopy(index, balance)}
                    />
                  </Span>
                )}
              </Div>
              <A
                target="_blank"
                nHover={{ color: '#99EFE4' }}
                href={getExplorerUrl(type, ExplorerMode.Coin)}
              >
                <ExternalLinkSVG width="100%" maxWidth="0.9rem" />
              </A>
            </Div>
          </Div>
        );
      })}
    </Div>
  );
};
