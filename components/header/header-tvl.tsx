import { Div, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useWalPrice } from '@/hooks/use-wal-price';
import { formatMoney } from '@/utils';

import useStats from '../../hooks/use-stats';

const HeaderTVL: FC = () => {
  const { data, isLoading } = useStats();
  const { data: price, isLoading: priceLoading } = useWalPrice();

  return (
    <Div
      gap="0.25rem"
      display="flex"
      p={['0.625rem', '0.825rem']}
      border="1px solid #99EFE44D"
      borderRadius={['0.5rem', '0.75rem']}
      fontSize={['0.625rem', '0.75rem', '0.875rem']}
      nHover={{ bg: '#99EFE480', borderColor: '#99EFE44D' }}
    >
      <P color="#FFFFFF80">TVL</P>
      <Div textAlign="right" display="flex" gap="0.25rem">
        <P color="#FFFFFF" fontFamily="JetBrains Mono" whiteSpace="nowrap">
          {(!data || !price) && (isLoading || priceLoading) ? (
            <Skeleton width="4rem" />
          ) : (
            `${formatMoney(
              data ? Number(data.totalTvl) * (price ?? 1) : 0,
              2,
              true
            )} USD`
          )}
        </P>{' '}
        <Span color="#FFFFFF80">|</Span>{' '}
        <P color="#FFFFFF" fontFamily="JetBrains Mono" whiteSpace="nowrap">
          {(!data || !price) && (isLoading || priceLoading) ? (
            <Skeleton width="4rem" />
          ) : (
            `${formatMoney(data ? Number(data.totalTvl) : 0, 2, true)} WAL`
          )}
        </P>
      </Div>
    </Div>
  );
};

export default HeaderTVL;
