import { normalizeStructTag } from '@mysten/sui/utils';
import { Button, Div, H2, H3, Img, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';
import { useLocalStorage } from 'usehooks-ts';

import { CaretDownSVG, CaretUpSVG } from '@/components/svg';
import { LST_TYPES, STATS_PRICE_STORAGE_KEY } from '@/constants';
import useMetadata from '@/hooks/use-metadata';
import useStats from '@/hooks/use-stats';
import { useWalPrice } from '@/hooks/use-wal-price';
import { formatDollars, formatMoney } from '@/utils';

import { StatsSorting, StatsSortingProps } from './statistics.types';

const Statistics: FC = () => {
  const { data: price } = useWalPrice();
  const { data, isLoading } = useStats();
  const [sorting, setSorting] = useState<StatsSorting | null>(null);
  const { data: metadata, isLoading: loadingMetadata } = useMetadata(LST_TYPES);
  const [statsInUSD, setStatsInUSD] = useLocalStorage(
    STATS_PRICE_STORAGE_KEY,
    false
  );

  const lstMap: Record<
    string,
    { tvl: string; total_users: string; lst: string }
  > =
    data?.data.reduce(
      (acc, curr) => ({ ...acc, [normalizeStructTag(curr.lst)]: curr }),
      {}
    ) ?? {};

  const onSort = (prop: StatsSortingProps) => () => {
    if (!sorting) return setSorting({ prop, desc: true });

    if (sorting.prop === prop) {
      if (!sorting.desc) return setSorting(null);
      return setSorting({ prop, desc: !sorting.desc });
    }

    return setSorting({ prop, desc: true });
  };

  const list = LST_TYPES.map((type) => ({
    type: normalizeStructTag(type),
    tvl: lstMap[type] ? Number(lstMap[type].tvl) : 0,
    users: lstMap[type] ? Number(lstMap[type]?.total_users) : 0,
    icon: metadata ? metadata[normalizeStructTag(type)].iconUrl : '',
    symbol: metadata ? metadata[normalizeStructTag(type)].symbol : '',
  })).toSorted((a, b) =>
    sorting
      ? (sorting.desc ? b : a)[sorting.prop] -
        (sorting.desc ? a : b)[sorting.prop]
      : 0
  );

  return (
    <Div display="flex" gap="1rem" flexDirection="column">
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <H2 color="#ffffff" fontSize="1rem" fontWeight="500">
          Statistics
        </H2>
        <Div display="flex" gap="0.5rem">
          {['WAL', 'USD'].map((value, index) => (
            <Button
              all="unset"
              px="0.5rem"
              py="0.25rem"
              key={unikey()}
              cursor="pointer"
              border="1px solid"
              fontSize="0.875rem"
              borderColor="#EE2B5B"
              borderRadius="0.625rem"
              onClick={() => setStatsInUSD(Boolean(index))}
              color={statsInUSD === Boolean(index) ? '#292929' : 'white'}
              bg={statsInUSD === Boolean(index) ? '#EE2B5B' : 'transparent'}
            >
              {value}
            </Button>
          ))}
        </Div>
      </Div>
      <Div
        p="1rem"
        gap="0.5rem"
        bg="#FFFFFF0D"
        display="grid"
        border="1px solid"
        borderRadius="1rem"
        borderColor="#FFFFFF1A"
        gridTemplateColumns="1fr 1fr"
      >
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            {!data && isLoading ? (
              <Skeleton width="4rem" />
            ) : (
              `${(statsInUSD ? formatDollars : formatMoney)(
                data
                  ? Number(data.totalTvl) * (statsInUSD && price ? price : 1)
                  : 0
              )}${!statsInUSD ? ' WAL' : ''}`
            )}
          </P>
          <P color="#FFFFFF80">TVL</P>
        </Div>
        <Div
          p="1rem"
          gap="0.25rem"
          display="flex"
          border="1px solid"
          alignItems="center"
          fontSize="0.875rem"
          flexDirection="column"
          borderRadius="0.625rem"
          borderColor="#FFFFFF1A"
        >
          <P color="#FFFFFF" fontFamily="JetBrains Mono">
            {!data && isLoading ? (
              <Skeleton width="4rem" />
            ) : (
              formatMoney(data ? Number(data.totalUsers) : 0).split('.')[0]
            )}
          </P>
          <P color="#FFFFFF80">Total Users</P>
        </Div>
      </Div>
      <Div
        p="1rem"
        gap="1rem"
        display="flex"
        bg="#FFFFFF0D"
        border="1px solid"
        borderRadius="1rem"
        flexDirection="column"
        borderColor="#FFFFFF1A"
      >
        <H3 color="#ffffff" fontSize="1rem" fontWeight="500">
          LSTs
        </H3>
        <Div display="flex" flexDirection="column" gap="0.5rem">
          <Div
            px="1rem"
            display="grid"
            color="#FFFFFF80"
            fontSize="0.875rem"
            gridTemplateColumns="4fr 5fr 3fr"
          >
            <Div
              gap="0.25rem"
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
            >
              <P fontFamily="JetBrains Mono">LST</P>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={onSort('tvl')}
              nHover={{ color: '#EE2B5B' }}
            >
              <P textAlign="center" fontFamily="JetBrains Mono">
                TVL
              </P>
              <Div display="flex" flexDirection="column" gap="0.125rem">
                {!sorting ||
                sorting.prop !== 'tvl' ||
                sorting?.desc == false ? (
                  <CaretUpSVG maxHeight="0.25rem" width="100%" />
                ) : null}
                {!sorting || sorting.prop !== 'tvl' || sorting?.desc == true ? (
                  <CaretDownSVG maxHeight="0.25rem" width="100%" />
                ) : null}
              </Div>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              cursor="pointer"
              alignItems="center"
              justifyContent="center"
              onClick={onSort('users')}
              nHover={{ color: '#EE2B5B' }}
            >
              <P textAlign="center" fontFamily="JetBrains Mono">
                Users
              </P>
              <Div display="flex" flexDirection="column" gap="0.125rem">
                <Div display="flex" flexDirection="column" gap="0.125rem">
                  {!sorting ||
                  sorting.prop !== 'users' ||
                  sorting?.desc == false ? (
                    <CaretUpSVG maxHeight="0.25rem" width="100%" />
                  ) : null}
                  {!sorting ||
                  sorting.prop !== 'users' ||
                  sorting?.desc == true ? (
                    <CaretDownSVG maxHeight="0.25rem" width="100%" />
                  ) : null}
                </Div>
              </Div>
            </Div>
          </Div>
          {list.map(({ type, tvl, icon, symbol, users }) => (
            <Div
              p="1rem"
              key={type}
              display="grid"
              color="#ffffff"
              border="1px solid"
              fontSize="0.875rem"
              borderColor="#FFFFFF1A"
              borderRadius="0.625rem"
              gridTemplateColumns="4fr 5fr 3fr"
            >
              <Div display="flex" gap="0.5rem" alignItems="center">
                {loadingMetadata ? (
                  <>
                    <Skeleton width="1.5rem" height="1.5rem" />
                    <Skeleton width="5rem" height="1rem" />
                  </>
                ) : (
                  <>
                    <Img
                      src={icon}
                      alt={symbol}
                      width="1.5rem"
                      height="1.5rem"
                      borderRadius="0.25rem"
                    />
                    <P>{symbol}</P>
                  </>
                )}
              </Div>
              <P textAlign="center" fontFamily="JetBrains Mono">
                {!data && isLoading ? (
                  <Skeleton width="5rem" />
                ) : (
                  `${statsInUSD ? '$' : ''}${formatMoney(
                    data ? tvl * (statsInUSD && price ? price : 1) : 0
                  )}${!statsInUSD ? ' WAL' : ''}`
                )}
              </P>
              <P textAlign="center" fontFamily="JetBrains Mono">
                {!data && isLoading ? (
                  <Skeleton width="5rem" />
                ) : data ? (
                  formatMoney(users).split('.')[0]
                ) : (
                  0
                )}
              </P>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  );
};

export default Statistics;
