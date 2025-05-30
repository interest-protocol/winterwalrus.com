import { Span } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatDollars, formatMoney } from '@/utils';

import { usePoolsMetrics } from '../pools-stats/pools-stats.hooks';
import { PoolRowMetricsProps } from './pool-row.types';

const PoolRowMetrics: FC<PoolRowMetricsProps> = ({ position }) => {
  const { metrics, isLoading: metricsLoading } = usePoolsMetrics();

  return (
    <>
      {position && (
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {position
                ? formatMoney(
                    +FixedPointMath.toNumber(position).toFixed(4),
                    6,
                    true
                  )
                : metrics
                  ? formatDollars(Number(metrics.tvl), 6, true)
                  : '--'}
            </Span>
          )}
        </Span>
      )}
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics ? formatDollars(Number(metrics.tvl), 6, true) : '--'}
          </Span>
        )}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics ? `${Number(metrics.apr ?? 0).toFixed(2)}%` : '--'}
          </Span>
        )}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics ? formatDollars(Number(metrics.volume1D), 6, true) : '--'}
          </Span>
        )}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics ? formatDollars(Number(metrics.volume7D), 6, true) : '--'}
          </Span>
        )}
      </Span>
      {!position && (
        <Span whiteSpace="nowrap" textAlign="center">
          {metricsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            <Span whiteSpace="nowrap">
              {metrics
                ? formatDollars(Number(metrics.volume30D), 6, true)
                : '--'}
            </Span>
          )}
        </Span>
      )}
    </>
  );
};

export default PoolRowMetrics;
