import { Div, Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formatDollars } from '@/utils';

import { CoinsRowProps } from './coins-row.types';

const CoinsRow: FC<CoinsRowProps> = ({ objectId, coinType }) => {
  const metadataLoading = false;
  const metadata: Record<string, { iconUrl: string; symbol: string }> = {
    [coinType]: {
      iconUrl: 'https://via.placeholder.com/24',
      symbol: coinType.toUpperCase(),
    },
  };

  const metricsLoading = false;
  const metrics: Record<
    string,
    { balance: number; price: number; value: number }
  > = {
    [objectId]: {
      balance: 123456.78,
      price: 0.045,
      value: 2345.67,
    },
  };

  return (
    <Div
      p="1rem"
      display="grid"
      color="#ffffff"
      border="1px solid"
      fontSize="0.875rem"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      nHover={{ borderColor: '#99EFE44D' }}
      gridTemplateColumns="2fr repeat(3, 1fr)"
    >
      <Div display="flex" alignItems="center" gap="0.5rem">
        {metadataLoading ? (
          <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
        ) : (
          <Img
            width="1.5rem"
            height="1.5rem"
            borderRadius="50%"
            src={metadata?.[coinType]?.iconUrl}
            alt={metadata?.[coinType]?.symbol}
          />
        )}
        {metadataLoading ? (
          <Skeleton width="6rem" />
        ) : (
          <Span whiteSpace="nowrap">{metadata?.[coinType]?.symbol}</Span>
        )}
      </Div>
      <Span whiteSpace="nowrap" textAlign="center">
        {metricsLoading ? (
          <Skeleton width="4rem" />
        ) : (
          <Span whiteSpace="nowrap">
            {metrics?.[objectId]
              ? formatDollars(Number(metrics[objectId].balance))
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
              ? `${(Number(metrics[objectId].price ?? 0) * 100).toFixed(2)}%`
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
              ? formatDollars(Number(metrics[objectId].value))
              : '--'}
          </Span>
        )}
      </Span>
    </Div>
  );
};

export default CoinsRow;
