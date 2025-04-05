import { Div, P } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useWalPrice } from '@/hooks/use-wal-price';
import { formatDollars } from '@/utils';

import useStats from './stats.hooks';

const MiniStats: FC = () => {
  const { data: price } = useWalPrice();
  const { data, isLoading } = useStats();

  return (
    <Div gap="0.25rem" display="flex" fontSize="0.875rem">
      <P color="#FFFFFF80">TVL: </P>
      <P color="#FFFFFF" fontFamily="JetBrains Mono">
        {!data && isLoading ? (
          <Skeleton width="4rem" />
        ) : (
          formatDollars(
            data
              ? values(data).reduce(
                  (acc, { tvl }) => (!isNaN(tvl) ? acc + Number(tvl) : acc),
                  0
                ) * (price ?? 1)
              : 0
          )
        )}
      </P>
    </Div>
  );
};

export default MiniStats;
