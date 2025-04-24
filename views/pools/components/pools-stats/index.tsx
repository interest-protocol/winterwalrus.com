import { Div, P } from '@stylin.js/elements';
import { FC, useState } from 'react';

import { PoolsChart } from './pools-chart';
import { usePoolsMetricsOvertime } from './pools-stats.hooks';

const PoolsPerformance: FC = () => {
  const { totalTvl } = usePoolsMetricsOvertime();

  const [interval, setInterval] = useState<'D' | 'W' | 'M'>('D');

  return (
    <Div
      p="1rem"
      bg="#FFFFFF0D"
      border="1px solid"
      borderRadius="1rem"
      borderColor="#FFFFFF1A"
    >
      <Div
        mb="0.5rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Div>
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            ${totalTvl?.toLocaleString('en-US')}
          </P>
          <P color="#FFFFFF80">Total Value Locked</P>
        </Div>
        <Div
          p="0.25rem"
          gap="0.5rem"
          display="flex"
          border="1px solid #99EFE44D"
          borderRadius="0.25rem"
        >
          {(['D', 'W', 'M'] as const).map((intendedInterval) => (
            <Div
              fontSize="0.875rem"
              borderRadius="0.25rem"
              key={intendedInterval}
              padding="0.5rem 0.75rem"
              onClick={() => setInterval(intendedInterval)}
              color={interval === intendedInterval ? '#99EFE480' : '#99EFE4'}
              pointerEvents={interval === intendedInterval ? 'none' : undefined}
              backgroundColor={
                interval === intendedInterval ? '#99EFE480' : 'transparent'
              }
              style={{
                cursor: interval === intendedInterval ? 'default' : 'pointer',
              }}
            >
              {intendedInterval}
            </Div>
          ))}
        </Div>
      </Div>
      <PoolsChart
        agg={
          interval === 'D' ? 'daily' : interval === 'W' ? 'weekly' : 'monthly'
        }
      />
    </Div>
  );
};

export default PoolsPerformance;
