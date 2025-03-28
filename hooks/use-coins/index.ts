import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

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
            normalizeStructTag(TYPES.WWAL),
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
