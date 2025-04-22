import { Div, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import useSWR from 'swr';

import { Tabs } from '@/components';
import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import useMetadata from '@/hooks/use-metadata';
import { usePool } from '@/hooks/use-poll';
import { useTabState } from '@/hooks/use-tab-manager';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney } from '@/utils';
import { usePoolsMetricsOvertime } from '@/views/pools/components/pools-stats/pools-stats.hooks';

import { usePoolData } from '../pool-stats/pool-stats.hooks';
import { PoolChart } from './pool-chart';
import { PoolCoinsSummary } from './pool-coins-summary';

const PoolPerformance: FC = () => {
  const pool = usePool();
  const { data } = usePoolData(pool?.objectId);
  const { innerTabs, setInnerTab } = useTabState();
  const interestStableSdk = useInterestStableSdk();
  const { totalTvl, totalVolume, totalFees } = usePoolsMetricsOvertime();

  const { data: metadata, isLoading: loadingMetadata } = useMetadata(
    pool?.coinTypes
  );

  const tab = innerTabs['pool-performance'] ?? 0;

  const tabs = ['TVL', 'Volume', 'Fees'];
  const value = [
    formatMoney(totalTvl),
    formatMoney(totalVolume),
    (totalFees > 0 ? totalFees.toFixed(2) : '0.00') + '%',
  ][tab];

  const setTab = (tab: number) => {
    setInnerTab('pool-performance', tab);
  };

  const { data: price, isLoading: loadingPrice } = useSWR(
    ['price', pool?.objectId, interestStableSdk],
    async () => {
      if (!interestStableSdk || !pool?.objectId) return;

      const { amountOut } = await interestStableSdk.quoteSwap({
        pool: pool.objectId,
        coinInType: pool.coinTypes[0],
        coinOutType: pool.coinTypes[1],
        amountIn: String(FixedPointMath.toBigNumber(1)),
      });

      return FixedPointMath.toNumber(BigNumber(String(amountOut)));
    }
  );

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
          <P color="#FFFFFF80">Fee tier</P>
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
