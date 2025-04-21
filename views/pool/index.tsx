import { Button, Div, H2 } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { Layout } from '@/components';
import { ChevronLeftSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { PoolForm, PoolStats, PoolTabs } from './components';
import PoolPerformance from './components/pool-performance';

const Pool: FC = () => (
  <Layout>
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      width="100%"
      display="flex"
      borderRadius="1rem"
      flexDirection="column"
      px={['0.5rem', '2rem']}
      maxWidth={['100%', '53.5rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Div display="flex" gap="1rem" color="#ffffff">
        <Link href={Routes[RoutesEnum.Pools]}>
          <Button all="unset" nHover={{ color: '#99EFE4' }}>
            <ChevronLeftSVG maxWidth="1.25rem" width="100%" />
          </Button>
        </Link>
        <H2 fontSize="1rem" fontWeight="600">
          Add Liquidity
        </H2>
      </Div>

      <PoolStats />

      <Div
        gridTemplateColumns="3fr 3fr"
        flexDirection="column-reverse"
        gap={['3rem', '3rem', '3rem', '1.32rem']}
        display={['flex', 'flex', 'flex', 'grid']}
        alignItems={['stretch', 'stretch', 'stretch', 'start']}
      >
        <PoolPerformance />
        <Div display="flex" flexDirection="column" gap="1rem">
          <PoolTabs />
          <PoolForm />
        </Div>
      </Div>
    </Div>
  </Layout>
);

export default Pool;
