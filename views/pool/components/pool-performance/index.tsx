import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

import { PoolChart } from './pool-chart';
import { PoolCoinsSummary } from './pool-coins-summary';

const PoolPerformance: FC = () => {
  const { innerTabs, setInnerTab } = useTabState();
  const tab = innerTabs['pool-performance'] ?? 0;

  const tabs = ['TVL', 'Volume', 'Fees'];

  const setTab = (tab: number) => {
    setInnerTab('pool-performance', tab);
  };

  return (
    <Div
      p="1rem"
      gap="1rem"
      bg="#FFFFFF0D"
      display="flex"
      overflowX="auto"
      border="1px solid"
      borderRadius="1rem"
      alignItems="stretch"
      flexDirection="column"
      borderColor="#FFFFFF1A"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <Div>
          <P color="#FFFFFF80">{tabs[tab]}</P>
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            $1.43K
          </P>
        </Div>

        <Tabs setTab={setTab} tabs={tabs} tab={tab} />
      </Div>

      <PoolChart />

      <PoolCoinsSummary />

      <Div display="flex" flexDirection={['column', 'row']} gap="0.5rem">
        <Div
          p="0.8125rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="6rem"
          flex={1}
          mb={['0.5rem', '0']}
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            2%
          </P>
          <P color="#FFFFFF80">Fee tier</P>
        </Div>
        <Div
          p="0.8125rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          minWidth="6rem"
          flex={1}
          mb={['0.5rem', '0']}
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            1 WAL ≈ 0.45 sWal
          </P>
          <P color="#FFFFFF80">Current price</P>
        </Div>
      </Div>
    </Div>
  );
};

export default PoolPerformance;
