import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useWalPrice } from '@/hooks/use-wal-price';
import { formatMoney } from '@/utils';

import useStats from '../../hooks/use-stats';

const HeaderTVL: FC = () => {
  const { data, isLoading } = useStats();
  const { data: price, isLoading: priceLoading } = useWalPrice();

  return (
    <Div gap="0.5rem" display="flex" fontSize="0.875rem" alignItems="center">
      <P color="#FFFFFF80" display={['none', 'block']}>
        TVL:{' '}
      </P>
      <Div textAlign="right">
        <P color="#FFFFFF" fontFamily="JetBrains Mono" whiteSpace="nowrap">
          {(!data || !price) && (isLoading || priceLoading) ? (
            <Skeleton width="4rem" />
          ) : (
            `${formatMoney(
              data ? Number(data.totalTvl) * (price ?? 1) : 0
            )} USD`
          )}
        </P>
        <P color="#FFFFFF" fontFamily="JetBrains Mono" whiteSpace="nowrap">
          {(!data || !price) && (isLoading || priceLoading) ? (
            <Skeleton width="4rem" />
          ) : (
            `${formatMoney(data ? Number(data.totalTvl) : 0)} WAL`
          )}
        </P>
      </Div>
    </Div>
  );
};

export default HeaderTVL;
