import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { Tabs } from '@/components';
import useMetadata from '@/hooks/use-metadata';
import { usePool } from '@/hooks/use-pool';
import { usePoolPrice } from '@/hooks/use-pool-price';
import { useTabState } from '@/hooks/use-tab-manager';
import { formatDollars, formatMoney } from '@/utils';
import { usePoolsMetricsOvertime } from '@/views/pools/components/pools-stats/pools-stats.hooks';

import { usePoolData } from '../pool-stats/pool-stats.hooks';
import { PoolChart } from './pool-chart';
import { PoolCoinsSummary } from './pool-coins-summary';

const PoolPerformance: FC = () => {
  const pool = usePool();
  const { data } = usePoolData(pool?.objectId);
  const { innerTabs, setInnerTab } = useTabState();

  const { price, loadingPrice } = usePoolPrice(pool);
  const { data: metadata, isLoading: loadingMetadata } = useMetadata(
    pool?.coinTypes
  );
  const { latestTvl, latestVolume, latestFees } = usePoolsMetricsOvertime(
    'daily',
    pool?.objectId
  );

  const tab = innerTabs['pool-performance'] ?? 0;

  const tabs = ['TVL', 'Volume', 'Fees'];
  const value = [
    formatDollars(latestTvl),
    formatDollars(latestVolume),
    formatDollars(latestFees),
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
          <P color="#FFFFFF80">
            {tabs[tab] === 'Volume' && '24H'} {tabs[tab]}
          </P>
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            {value}
          </P>
        </Div>
        <Tabs setTab={setTab} tabs={tabs} tab={tab} />
      </Div>
      <PoolChart />
      <PoolCoinsSummary />
      <Div display="grid" gridTemplateColumns={['1fr', '1fr 1fr']} gap="0.5rem">
        <Div
          gap="0.25rem"
          display="flex"
          p="1.25rem 1rem"
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
          <P color="#FFFFFF80">Fee</P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          p="1.25rem 1rem"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          whiteSpace="nowrap"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
          mb={['0.5rem', '0']}
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            1{' '}
            {loadingMetadata ? (
              <Skeleton width="2rem" />
            ) : (
              metadata?.[pool?.coinTypes[0]]?.symbol
            )}{' '}
            ≈{' '}
            {loadingPrice ? (
              <Skeleton width="1rem" />
            ) : (
              formatMoney(Number(price?.toFixed(2)))
            )}{' '}
            {loadingMetadata ? (
              <Skeleton width="2rem" />
            ) : (
              metadata?.[pool?.coinTypes[1]]?.symbol
            )}
          </P>
          <P color="#FFFFFF80">Current price</P>
        </Div>
      </Div>
    </Div>
  );
};

export default PoolPerformance;
