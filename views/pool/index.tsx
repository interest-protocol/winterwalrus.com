import { Button, Div, H2 } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { Layout } from '@/components';
import { ChevronLeftSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

import { PoolStats, PoolTabs } from './components';

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
      <Div display="flex" gap="1rem" alignItems="center" color="#ffffff">
        <Link href={Routes[RoutesEnum.Pools]}>
          <Button all="unset" nHover={{ color: '#99EFE4' }}>
            <ChevronLeftSVG maxWidth="1.25rem" width="100%" />
          </Button>
        </Link>
        <H2 fontSize="1.25rem" fontWeight="600">
          Add Liquidity
        </H2>
      </Div>
      <PoolTabs />
      <Div
        gap="1.32rem"
        display="grid"
        gridTemplateColumns={['1fr', '1fr', '1fr', '3fr 2fr']}
      >
        <Div border="1px solid red" p="1rem"></Div>
        <PoolStats />
      </Div>
    </Div>
  </Layout>
);

export default Pool;
