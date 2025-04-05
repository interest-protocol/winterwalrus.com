import { normalizeStructTag } from '@mysten/sui/utils';
import { Button, Div, H2, H3, Img, P } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';
import { useLocalStorage } from 'usehooks-ts';

import { LST_TYPES, STATS_PRICE_STORAGE_KEY } from '@/constants';
import useMetadata from '@/hooks/use-metadata';
import { useWalPrice } from '@/hooks/use-wal-price';
import { formatMoney } from '@/utils';

import useStats from './stats.hooks';

const Stats: FC = () => {
  const { data: price } = useWalPrice();
  const { data, isLoading } = useStats();
  const { data: metadata, isLoading: loadingMetadata } = useMetadata(LST_TYPES);
  const [statsInUSD, setStatsInUSD] = useLocalStorage(
    STATS_PRICE_STORAGE_KEY,
    false
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
              borderColor="#99EFE4"
              borderRadius="0.625rem"
              onClick={() => setStatsInUSD(Boolean(index))}
              color={statsInUSD === Boolean(index) ? '#292929' : 'white'}
              bg={statsInUSD === Boolean(index) ? '#99EFE4' : 'transparent'}
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
              `${statsInUSD ? '$' : ''}${formatMoney(
                data
                  ? values(data).reduce(
                      (acc, { tvl }) => (!isNaN(tvl) ? acc + Number(tvl) : acc),
                      0
                    ) * (statsInUSD && price ? price : 1)
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
            <P fontFamily="JetBrains Mono">LST</P>
            <P textAlign="center" fontFamily="JetBrains Mono">
              Total Staked
            </P>
            <P textAlign="center" fontFamily="JetBrains Mono">
              Total Users
            </P>
          </Div>
          {LST_TYPES.map((type) => (
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
                      width="1.5rem"
                      height="1.5rem"
                      borderRadius="0.25rem"
                      alt={metadata?.[normalizeStructTag(type)].symbol}
                      src={metadata?.[normalizeStructTag(type)].iconUrl}
                    />
                    <P>{metadata?.[normalizeStructTag(type)].symbol}</P>
                  </>
                )}
              </Div>
              <P textAlign="center" fontFamily="JetBrains Mono">
                {!data && isLoading ? (
                  <Skeleton width="5rem" />
                ) : (
                  `${statsInUSD ? '$' : ''}${formatMoney(
                    data
                      ? Number(data[type].tvl) *
                          (statsInUSD && price ? price : 1)
                      : 0
                  )}${!statsInUSD ? ' WAL' : ''}`
                )}
              </P>
              <P textAlign="center" fontFamily="JetBrains Mono">
                {!data && isLoading ? (
                  <Skeleton width="5rem" />
                ) : data ? (
                  formatMoney(Number(data[type].total_users)).split('.')[0]
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

export default Stats;
