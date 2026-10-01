import { useCurrentAccount, useCurrentClient } from '@mysten/dapp-kit-react';
import type { SuiClientTypes } from '@mysten/sui/client';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

import { LST_TYPES } from '@/constants';
import { TYPES } from '@/lib/blizzard';

export const useCoins = () => {
  const client = useCurrentClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Record<string, BigNumber>>(
    [currentAccount?.address, useCoins.name],
    async () => {
      if (!currentAccount) return {};

      const balances: SuiClientTypes.Balance[] = [];
      let cursor: string | null = null;

      do {
        const page: SuiClientTypes.ListBalancesResponse =
          await client.listBalances({
            owner: currentAccount.address,
            cursor,
          });

        balances.push(...page.balances);
        cursor = page.hasNextPage ? page.cursor : null;
      } while (cursor);

      return balances.reduce(
        (acc, { coinType, balance }) =>
          [
            normalizeStructTag(SUI_TYPE_ARG),
            normalizeStructTag(TYPES.WAL),
            ...LST_TYPES.map(normalizeStructTag),
          ].includes(normalizeStructTag(coinType))
            ? {
                ...acc,
                [normalizeStructTag(coinType)]: BigNumber(balance),
              }
            : acc,
        {}
      );
    }
  );

  return {
    coins: data,
    ...props,
  };
};
