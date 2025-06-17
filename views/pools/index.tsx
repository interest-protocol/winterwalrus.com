import { Div } from '@stylin.js/elements';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Layout } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

import { LiquidityPools, PoolsPerformance } from './components';
import PoolsSearch from './components/pools-search';
import PoolsTable from './components/pools-table';
import PoolsTabs from './components/pools-tabs';

const Pools: FC = () => {
  const form = useForm({ defaultValues: { search: '' } });
  const { setTab } = useTabState();

  useEffect(() => {
    setTab(0);
  }, []);

  return (
    <Layout>
      <FormProvider {...form}>
        <Div
          mx="auto"
          width="100%"
          gap="2rem"
          display="flex"
          maxWidth="53.5rem"
          my={['1rem', '3rem']}
          flexDirection="column"
          px={['0.5rem', '2rem']}
        >
          <Div
            gap="1rem"
            display="flex"
            justifyContent="space-between"
            width={['100%', '100%', '100%', '53.5rem']}
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <Div flexShrink="0" width={['100%', '100%', '100%', '16.4375rem']}>
              <LiquidityPools />
            </Div>
            <Div width={['100%', '100%', '100%', '36.0625rem']}>
              <PoolsPerformance />
            </Div>
          </Div>
          <Div
            gap="1rem"
            display="flex"
            justifyContent="space-between"
            flexDirection={['column', 'row']}
            alignItems={['stretch', 'center']}
            width={['100%', '100%', '100%', '53.5rem']}
          >
            <PoolsTabs />
            <PoolsSearch />
          </Div>
          <PoolsTable />
        </Div>
      </FormProvider>
    </Layout>
  );
};

export default Pools;
