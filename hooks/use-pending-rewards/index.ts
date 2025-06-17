import useSWR from 'swr';

import useWalrusSdk from '../use-walrus-sdk';

export const usePendingRewards = (id: string) => {
  const walrusSdk = useWalrusSdk();

  return useSWR(
    [usePendingRewards.name, 'pending-rewards', id, walrusSdk],
    () => {
      if (!walrusSdk) return;

      return walrusSdk.calculatePendingRewards(id);
    }
  );
};
