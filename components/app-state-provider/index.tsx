import { useCurrentAccount } from '@mysten/dapp-kit';
import { FC, useEffect } from 'react';

import { useAppState } from '@/hooks/use-app-state';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const AppStateProvider: FC = () => {
  const { update } = useAppState();
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
