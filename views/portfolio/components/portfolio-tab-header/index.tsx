import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { useAppState } from '@/hooks/use-app-state';
import { useTabState } from '@/hooks/use-tab-manager';
import { formatDollars } from '@/utils';

const PortfolioTabHeader: FC = () => {
  const { tab } = useTabState();
  const { balances } = useAppState();

  console.log('balances', balances);

  const walValue = [10, 12, 5, 32][tab];
  const usdValue = [90, 100, 40, 330][tab];

  return (
    <Div
      flex={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <P color="#fff">{['LSTs', 'Native Staked WAL', 'NFTs', 'Coins'][tab]}</P>

      <Div display="flex" gap="1rem">
        <Div
          fontFamily="JetBrains Mono"
          color="#FFF"
          fontSize="1rem"
          borderRadius="0.5rem"
          padding="0.5rem"
          border="1px solid #99EFE44D"
        >
          {walValue} WAL
        </Div>
        {usdValue && (
          <Div
            fontFamily="JetBrains Mono"
            color="#FFF"
            fontSize="1rem"
            borderRadius="0.5rem"
            padding="0.5rem"
            border="1px solid #99EFE44D"
          >
            {formatDollars(usdValue)}
          </Div>
        )}
      </Div>
    </Div>
  );
};

export default PortfolioTabHeader;
