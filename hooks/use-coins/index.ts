import { TYPES } from '@interest-protocol/blizzard-sdk';
import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import { values } from 'ramda';
import useSWR from 'swr';

import { LST_TYPES } from '@/constants';

export const useCoins = () => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Record<string, BigNumber>>(
    [currentAccount?.address, useCoins.name],
    async () => {
      if (!currentAccount) return {};

      const coins = await client.getAllBalances({
        owner: currentAccount?.address,
      });

      return coins.reduce(
        (acc, { coinType, totalBalance }) =>
          [
            normalizeStructTag(SUI_TYPE_ARG),
            normalizeStructTag(TYPES.WAL),
            ...LST_TYPES.map(normalizeStructTag),
            ...values(POOLS).map(({ lpCoinType }) => lpCoinType),
          ].includes(normalizeStructTag(coinType))
            ? {
                ...acc,
                [normalizeStructTag(coinType)]: BigNumber(totalBalance),
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
