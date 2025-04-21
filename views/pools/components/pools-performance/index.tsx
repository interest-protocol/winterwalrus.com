import { Div, P } from '@stylin.js/elements';
import { FC, useState } from 'react';

import { PoolsChart } from './pools-chart';

const PoolsPerformance: FC = () => {
  const [interval, setInterval] = useState<'D' | 'W' | 'M'>('D');

  return (
    <Div
      flex={1}
      p="1rem"
      bg="#FFFFFF0D"
      border="1px solid"
      borderRadius="1rem"
    >
      <Div
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb="0.5rem"
      >
        <Div>
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            $143,023,310.98
          </P>
          <P color="#FFFFFF80">Total Value Locked</P>
        </Div>

        <Div
          display="flex"
          gap="0.5rem"
          border="1px solid #99EFE44D"
          borderRadius="0.25rem"
          p="0.25rem"
        >
          {(['D', 'W', 'M'] as const).map((intv) => (
            <Div
              key={intv}
              padding="0.5rem 0.75rem"
              borderRadius="0.25rem"
              pointerEvents={interval === intv ? 'none' : undefined}
              onClick={() => setInterval(intv)}
              fontSize={'0.875rem'}
              backgroundColor={interval === intv ? '#99EFE480' : 'transparent'}
              color={interval === intv ? '#99EFE480' : '#99EFE4'}
              style={{ cursor: interval === intv ? 'default' : 'pointer' }}
            >
              {intv}
            </Div>
          ))}
        </Div>
      </Div>

      <PoolsChart />
    </Div>
  );
};

export default PoolsPerformance;
