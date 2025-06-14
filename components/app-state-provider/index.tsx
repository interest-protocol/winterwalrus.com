import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { normalizeStructTag, SUI_TYPE_ARG } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import useSWR from 'swr';

import { useAppState } from '@/hooks/use-app-state';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const AppStateProvider: FC = () => {
  const { update } = useAppState();
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
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
  }, [currentAccount]);

  useEffect(() => {
    if (!coins) return;

    update(({ balances }) => ({ balances: { ...balances, ...coins } }));
  }, [coins]);

  useSWR(
    ['sui-balance', currentAccount],
    () => {
      if (!currentAccount) return;

      suiClient
        .getBalance({ coinType: SUI_TYPE_ARG, owner: currentAccount?.address })
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

  useEffect(() => {
    if (!principalByType || !stakingObjectIds) return;

    update(({ balances }) => ({
      stakingObjectIds,
      objectsActivation,
      principalsByType: principalByType,
      balances: { ...balances, ...principalByType, ...balancesByLst },
    }));
  }, [principalByType, stakingObjectIds, objectsActivation, balancesByLst]);

  useEffect(() => {
    update({ loadingObjects });
  }, [loadingObjects]);

  useEffect(() => {
    update({ loadingCoins });
  }, [loadingCoins]);

  return null;
};

export default AppStateProvider;
