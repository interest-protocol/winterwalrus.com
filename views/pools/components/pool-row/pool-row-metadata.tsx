import { Div, Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import useMetadata from '@/hooks/use-metadata';

import { PoolRowMetadataProps } from './pool-row.types';

const PoolRowMetadata: FC<PoolRowMetadataProps> = ({ lpCoinType }) => {
  const { data: metadata, isLoading: metadataLoading } = useMetadata([
    lpCoinType,
  ]);

  return (
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
  );
};

export default PoolRowMetadata;
