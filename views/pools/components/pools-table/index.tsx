import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Div, P } from '@stylin.js/elements';
import { toPairs } from 'ramda';
import { FC, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import unikey from 'unikey';

import { useAppState } from '@/hooks/use-app-state';
import { useTabState } from '@/hooks/use-tab-manager';

import PoolRow from '../pool-row';

const PoolsTable: FC = () => {
  const { tab } = useTabState();
  const { balances } = useAppState();
  const { control } = useFormContext();
  const search = useWatch({ control, name: 'search' });

  const pools = useMemo(
    () =>
      toPairs(POOLS).filter(([, { lpCoinType, coinTypes }]) => {
        const normalizedSearch = search.trim().toLowerCase();

        if (normalizedSearch) {
          const foundLPToken = lpCoinType
            ?.toLowerCase()
            .includes(normalizedSearch);
          const foundAnyToken = coinTypes?.some((ct: string) =>
            ct.toLowerCase().includes(normalizedSearch)
          );

          const foundToken = foundLPToken || foundAnyToken;

          if (!foundToken) return false;
        }

        const isMyPosition = !!tab;

        if (!isMyPosition) return true;

        const hasLPToken =
          balances[normalizeStructTag(lpCoinType)] &&
          !balances[normalizeStructTag(lpCoinType)].isZero();

        return hasLPToken;
      }),
    [tab, balances, search]
  );

  return (
    <Div
      p="1rem"
      bg="#FFFFFF0D"
      display="flex"
      overflowX="auto"
      border="1px solid"
      borderRadius="1rem"
      alignItems="stretch"
      flexDirection="column"
      gap={['0.5rem', '1rem']}
      borderColor="#FFFFFF1A"
    >
      <Div
        px="1rem"
        display="grid"
        minWidth="30rem"
        color="#FFFFFF80"
        fontSize="0.875rem"
        gridTemplateColumns="2fr repeat(5, 1fr) 43px"
      >
        <Div gap="0.25rem" display="flex" alignItems="center">
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            Pool
          </P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            TVL
          </P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            APR
          </P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            1D Vol
          </P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            7D Vol
          </P>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
            {tab ? 'Position' : '30D Vol'}
          </P>
        </Div>
      </Div>
      <Div minWidth="30rem">
        {pools.length === 0 ? (
          <Div
            py="2rem"
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <P color="#FFFFFF80" fontSize="1rem">
              No pools found.
            </P>
          </Div>
        ) : (
          pools.map(([key, pool]) => (
            <PoolRow
              {...pool}
              id={key}
              key={unikey()}
              position={
                tab ? balances[normalizeStructTag(pool.lpCoinType)] : null
              }
            />
          ))
        )}
      </Div>
    </Div>
  );
};

export default PoolsTable;
