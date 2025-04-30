import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useTabState } from '@/hooks/use-tab-manager';
import { formatDollars, formatMoney } from '@/utils';

import { PortfolioTabHeaderProps } from './portfolio-tab-header.types';

const PortfolioTabHeader: FC<PortfolioTabHeaderProps> = ({
  usdValue,
  walValue,
  loading,
}) => {
  const { tab } = useTabState();

  return (
    <Div
      flex={1}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <P color="#fff">{['LSTs', 'Native Staked WAL', 'NFTs', 'Coins'][tab]}</P>

      {loading ? (
        <Div display="flex" gap="1rem">
          <Skeleton width="4rem" height="2.3rem" />
          <Skeleton width="4rem" height="2.3rem" />
        </Div>
      ) : (
        <Div display="flex" gap="1rem">
          {walValue !== undefined && walValue >= 0 && (
            <Div
              fontFamily="JetBrains Mono"
              color="#FFF"
              fontSize="1rem"
              borderRadius="0.5rem"
              padding="0.5rem"
              border="1px solid #99EFE44D"
            >
              {formatMoney(walValue)} WAL
            </Div>
          )}
          {usdValue !== undefined && usdValue >= 0 && (
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
      )}
    </Div>
  );
};

export default PortfolioTabHeader;
