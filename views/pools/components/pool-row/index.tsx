import { Div, Img, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Routes, RoutesEnum } from '@/constants';
import useMetadata from '@/hooks/use-metadata';

import { PoolRowProps } from './pool-row.types';

const PoolRow: FC<PoolRowProps> = ({ lpCoinType, id }) => {
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
        gridTemplateColumns="2fr repeat(5, 1fr)"
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
            <Span>{metadata?.[lpCoinType]?.symbol.replace('s-', '')}</Span>
          )}
        </Div>
        <Span textAlign="center">--</Span>
        <Span textAlign="center">--</Span>
        <Span textAlign="center">--</Span>
        <Span textAlign="center">--</Span>
        <Span textAlign="center">--</Span>
      </Div>
    </Link>
  );
};

export default PoolRow;
