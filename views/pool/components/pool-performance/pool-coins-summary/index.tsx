import { Div, Img, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { CopySVG } from '@/components/svg';
import Checkmark from '@/components/svg/checkmark';
import ExternalLink from '@/components/svg/external-link';
import { ExplorerMode } from '@/constants';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import useMetadata from '@/hooks/use-metadata';
import { usePool } from '@/hooks/use-pool';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney, ZERO_BIG_NUMBER } from '@/utils';

import { usePoolData } from '../../pool-stats/pool-stats.hooks';

export const PoolCoinsSummary: FC = () => {
  const getExplorerUrl = useGetExplorerUrl();

  const pool = usePool();

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

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
                  <Checkmark
                    width="1rem"
                    maxHeight="1rem"
                    color="#99EFE4"
                    style={{ cursor: 'pointer' }}
                  />
                ) : (
                  <CopySVG
                    width="1rem"
                    maxHeight="1rem"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleCopy(index, balance)}
                  />
                )}
              </Div>
              <Link
                href={getExplorerUrl(type, ExplorerMode.Coin)}
                target="_blank"
              >
                <ExternalLink
                  width="100%"
                  maxWidth="0.8rem"
                  maxHeight="0.8rem"
                />
              </Link>
            </Div>
          </Div>
        );
      })}
    </Div>
  );
};
