import { Div } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { Routes, RoutesEnum } from '@/constants';

import { PoolRowProps } from './pool-row.types';
import PoolRowButton from './pool-row-button';
import PoolRowMetadata from './pool-row-metadata';
import PoolRowMetrics from './pool-row-metrics';
import PoolRowMetricsMobile from './pool-row-metrics-mobile';

const PoolRow: FC<Omit<PoolRowProps, 'objectId'>> = ({
  id,
  position,
  lpCoinType,
}) => (
  <Link href={`${Routes[RoutesEnum.Pools]}/${id}`} shallow>
    <Div
      p="1rem"
      color="#ffffff"
      border="1px solid"
      fontSize="0.875rem"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      gap={['0.25rem', 'unset']}
      display={['grid', 'none']}
      gridTemplateColumns="1fr auto"
    >
      <PoolRowMetadata lpCoinType={lpCoinType} />
      <PoolRowButton />
      <Div
        p="1rem"
        mt="0.5rem"
        gap="0.5rem"
        display="grid"
        border="1px solid"
        gridColumn="span 2"
        borderColor="#FFFFFF1A"
        borderRadius="0.5rem"
        gridTemplateColumns="1fr 1fr"
      >
        <PoolRowMetricsMobile position={position} />
      </Div>
    </Div>
    <Div
      p="1rem"
      color="#ffffff"
      border="1px solid"
      fontSize="0.875rem"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      gap={['0.25rem', 'unset']}
      display={['none', 'grid']}
      gridTemplateColumns="2fr repeat(5, 1fr) 43px"
      nHover={{ borderColor: '#EE2B5BD', bg: '#EE2B5B33' }}
    >
      <PoolRowMetadata lpCoinType={lpCoinType} />
      <PoolRowMetrics position={position} />
      <PoolRowButton />
    </Div>
  </Link>
);

export default PoolRow;
