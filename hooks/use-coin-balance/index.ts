import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { BigNumber } from 'bignumber.js';
import useSWR from 'swr';

export const useCoinBalance = (type?: string, account?: string) => {
  const client = useSuiClient();
  const currentAccount = useCurrentAccount();

  const { data, ...props } = useSWR(
    [type, account ?? currentAccount?.address, useCoinBalance.name],
    async () => {
      const address = account || currentAccount?.address;

      if (!type || !address) return;

      const balance = await client.getBalance({
        owner: address,
        coinType: type,
      });

      return BigNumber(balance.totalBalance);
    }
  );

  return {
    balance: data,
    ...props,
  };
};
