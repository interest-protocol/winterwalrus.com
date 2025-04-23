import { Div, Img, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Routes, RoutesEnum } from '@/constants';
import useMetadata from '@/hooks/use-metadata';
import { formatDollars } from '@/utils';

import { usePoolsMetrics } from '../pools-stats/pools-stats.hooks';
import { PoolRowProps } from './pool-row.types';

const PoolRow: FC<PoolRowProps> = ({ lpCoinType, id, objectId }) => {
  const { metrics, isLoading: metricsLoading } = usePoolsMetrics();
  const { data: metadata, isLoading: metadataLoading } = useMetadata([
    lpCoinType,
  ]);

  return (
    <Link href={`${Routes[RoutesEnum.Pools]}/${id}`} shallow>
      <Div
        p="1rem"
        display="grid"
        color="#ffffff"
        border="1px solid"
        fontSize="0.875rem"
        borderColor="#FFFFFF1A"
        borderRadius="0.625rem"
        nHover={{ borderColor: '#99EFE44D' }}
        alignItems="center"
        gridTemplateColumns="2fr repeat(4, 1fr) 43px"
      >
        <Div display="flex" alignItems="center" gap="0.5rem">
          {metadataLoading ? (
            <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
          ) : (
            <Img
              width="1.5rem"
              height="1.5rem"
              borderRadius="50%"
              src={metadata?.[lpCoinType]?.iconUrl}
              alt={metadata?.[lpCoinType]?.symbol}
            />
          )}
          {metadataLoading ? (
            <Skeleton width="6rem" />
          ) : (
            <Span whiteSpace="nowrap">{metadata?.[lpCoinType]?.symbol}</Span>
          )}
        </Div>
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {metrics?.[objectId]
                ? formatDollars(Number(metrics[objectId].tvl))
                : '--'}
            </Span>
          )}
        </Span>
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {metrics?.[objectId]
                ? `${(Number(metrics[objectId].apr ?? 0) * 100).toFixed(2)}%`
                : '--'}
            </Span>
          )}
        </Span>
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {metrics?.[objectId]
                ? formatDollars(Number(metrics[objectId].volume1D))
                : '--'}
            </Span>
          )}
        </Span>
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {metrics?.[objectId]
                ? formatDollars(Number(metrics[objectId].volume30D))
                : '--'}
            </Span>
          )}
        </Span>
        <Div
          width="43px"
          height="42px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="0.625rem"
          border="1px solid #99EFE480"
          background="#99EFE41A"
        >
          <Div
            width="20px"
            height="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="0.375rem"
            border="1px solid #99EFE4"
            background="#99EFE41A"
          >
            +
          </Div>
        </Div>
      </Div>
    </Link>
  );
};

export default PoolRow;
