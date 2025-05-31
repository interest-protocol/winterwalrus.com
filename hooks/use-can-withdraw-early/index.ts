import { WalrusSDK } from '@interest-protocol/walrus-sdk';
import useSWR from 'swr';

export const useCanWithdrawEarly = (id: string) => {
  const walrusSdk = new WalrusSDK();

  return useSWR(['can-withdraw-early', id], () =>
    walrusSdk.canWithdrawEarly(id)
  );
};
