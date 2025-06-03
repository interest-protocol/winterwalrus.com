import useSWR from 'swr';

import useWalrusSdk from '../use-walrus-sdk';

export const useCanWithdrawEarly = (id: string) => {
  const walrusSdk = useWalrusSdk();

  return useSWR(
    [useCanWithdrawEarly.name, 'can-withdraw-early', id, walrusSdk],
    () => {
      if (!walrusSdk) return;

      return walrusSdk.canWithdrawEarly(id);
    }
  );
};
