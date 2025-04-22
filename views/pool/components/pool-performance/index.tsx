import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { Tabs } from '@/components';
import { usePool } from '@/hooks/use-poll';
import { useTabState } from '@/hooks/use-tab-manager';
import { useWalPrice } from '@/hooks/use-wal-price';
import { formatMoney } from '@/utils';
import { usePoolsMetricsOvertime } from '@/views/pools/pools-metrics.hook';

import { usePoolData } from '../pool-stats/pool-stats.hook';
import { PoolChart } from './pool-chart';
import { PoolCoinsSummary } from './pool-coins-summary';

const PoolPerformance: FC = () => {
  const { innerTabs, setInnerTab } = useTabState();
  const tab = innerTabs['pool-performance'] ?? 0;
  const { totalTvl, totalVolume, totalFees } = usePoolsMetricsOvertime();
  const { data: walData } = useWalPrice();

  const pool = usePool();
  const { data } = usePoolData(pool?.objectId);

  const tabs = ['TVL', 'Volume', 'Fees'];
  const value = [
    formatMoney(totalTvl),
    formatMoney(totalVolume),
    (totalFees > 0 ? totalFees.toFixed(2) : '0.00') + '%',
  ][tab];

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
            ${value}
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
          minWidth="max-content"
          mb={['0.5rem', '0']}
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            {Number(data?.fees?.fee ?? 0) / 10 ** 16}%
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
            1 WAL ≈ {walData} sWal
          </P>
          <P color="#FFFFFF80">Current price</P>
        </Div>
      </Div>
    </Div>
  );
};

export default PoolPerformance;
