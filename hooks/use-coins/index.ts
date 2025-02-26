import { OBJECT_TYPES, TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag } from '@mysten/sui/utils';
import useSWR from 'swr';

import { useNetwork } from '../use-network';

export const useCoins = () => {
  const network = useNetwork();
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR<Record<string, string>>(
    [currentAccount?.address, useCoins.name],
    async () => {
      if (!currentAccount) return {};

      const coins = await client.getAllBalances({
        owner: currentAccount?.address,
      });

      return coins.reduce(
        (acc, { coinType, totalBalance }) =>
          [
            normalizeStructTag(TYPES[network].WAL),
            normalizeStructTag(OBJECT_TYPES[network].SNOW),
          ].includes(normalizeStructTag(coinType))
            ? {
                ...acc,
                [coinType]: totalBalance,
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
