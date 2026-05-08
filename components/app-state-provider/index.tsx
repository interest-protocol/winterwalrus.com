import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { FC, useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { useAppState } from '@/hooks/use-app-state';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const signRecord = (record?: Record<string, BigNumber>) =>
  record
    ? Object.entries(record)
        .map(([k, v]) => `${k}:${v.toFixed()}`)
        .sort()
        .join('|')
    : '';

const signNumberRecord = (record?: Record<string, number>) =>
  record
    ? Object.entries(record)
        .map(([k, v]) => `${k}:${v}`)
        .sort()
        .join('|')
    : '';

const AppStateProvider: FC = () => {
  const { update } = useAppState();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const accountAddress = currentAccount?.address;
  const { coins, mutate: mutateCoins, isLoading: loadingCoins } = useCoins();
  const {
    balancesByLst,
    principalByType,
    stakingObjectIds,
    objectsActivation,
    isLoading: loadingObjects,
    mutate: mutateStakingObjects,
  } = useStakingObjects();

  const mutate = () => {
    mutateCoins();
    mutateStakingObjects();
  };

  useEffect(() => {
    update({ mutate });
  }, []);

  useEffect(() => {
    update({
      balances: {},
      mutate: () => {},
      loadingCoins: false,
      principalsByType: {},
      stakingObjectIds: [],
      objectsActivation: {},
      loadingObjects: false,
    });
  }, [accountAddress]);

  const coinsSig = useMemo(() => signRecord(coins), [coins]);

  useEffect(() => {
    if (!coins) return;

    update(({ balances }) => ({ balances: { ...balances, ...coins } }));
  }, [coinsSig]);

  useSWR(
    ['sui-balance', accountAddress],
    () => {
      if (!accountAddress) return;

      suiClient
        .getBalance({ coinType: SUI_TYPE_ARG, owner: accountAddress })
        .then((balance) => {
          update(({ balances }) => ({
            balances: {
              ...balances,
              [normalizeStructTag(SUI_TYPE_ARG)]: BigNumber(
                balance.totalBalance
              ),
              [SUI_TYPE_ARG]: BigNumber(balance.totalBalance),
            },
          }));
        });
    },
    { refreshInterval: 10000 }
  );

  const stakingSig = useMemo(
    () =>
      [
        signRecord(principalByType),
        signRecord(balancesByLst),
        stakingObjectIds?.join(',') ?? '',
        signNumberRecord(objectsActivation),
      ].join('#'),
    [principalByType, balancesByLst, stakingObjectIds, objectsActivation]
  );

  useEffect(() => {
    if (!principalByType || !stakingObjectIds) return;

    update(({ balances }) => ({
      stakingObjectIds,
      objectsActivation,
      principalsByType: principalByType,
      balances: { ...balances, ...principalByType, ...balancesByLst },
    }));
  }, [stakingSig]);

  useEffect(() => {
    update({ loadingObjects });
  }, [loadingObjects]);

  useEffect(() => {
    update({ loadingCoins });
  }, [loadingCoins]);

  return null;
};

export default AppStateProvider;
