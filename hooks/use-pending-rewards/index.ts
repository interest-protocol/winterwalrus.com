import { WalrusSDK } from '@interest-protocol/walrus-sdk';
import useSWR from 'swr';

export const usePendingRewards = (id: string) => {
  const walrusSdk = new WalrusSDK();

  return useSWR(['pending-rewards', id], () =>
    walrusSdk.calculatePendingRewards(id)
  );
};
