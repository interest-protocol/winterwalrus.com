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
          flex="1"
          mx="auto"
          gap="1rem"
          width="100%"
          display="flex"
          borderRadius="1rem"
          flexDirection="column"
          px={['0.5rem', '2rem']}
          maxWidth={['100%', '51.5rem']}
          my={['1rem', '1rem', '1rem', '1rem', '3rem']}
        >
          <Div
            width="100%"
            display="grid"
            color="#FFFFFF80"
            fontSize="0.875rem"
            gap={['0.5rem', '1rem']}
            gridTemplateColumns={['1fr', '1fr', '1fr calc(100% - 16rem)']}
          >
            <LiquidityPools />
            <PoolsPerformance />
          </Div>
          <Div
            width="100%"
            display="flex"
            gap={['0.5rem', '1rem']}
            justifyContent="space-between"
            flexDirection={['column', 'row']}
            alignItems={['stretch', 'center']}
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
