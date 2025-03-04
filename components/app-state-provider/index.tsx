import { FC, useEffect } from 'react';

import { useAppState } from '@/hooks/use-app-state';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const AppStateProvider: FC = () => {
  const { update } = useAppState();
  const { coins, mutate: mutateCoins, isLoading: loadingCoins } = useCoins();
  const {
    principalByType,
    stakingObjectIds,
    isLoading: loadingObjects,
    mutate: mutateStakingObjects,
  } = useStakingObjects();

  useEffect(() => {
    update({
      mutate: () => {
        mutateCoins();
        mutateStakingObjects();
      },
    });
  }, []);

  useEffect(() => {
    if (!coins) return;

    update(({ balances }) => ({ balances: { ...balances, ...coins } }));
  }, [coins]);

  useEffect(() => {
    if (!principalByType || !stakingObjectIds) return;

    update(({ balances }) => ({
      stakingObjectIds,
      principalsByType: principalByType,
      balances: { ...balances, ...principalByType },
    }));
  }, [principalByType, stakingObjectIds]);

  useEffect(() => {
    update({ loadingObjects });
  }, [loadingObjects]);

  useEffect(() => {
    update({ loadingCoins });
  }, [loadingCoins]);

  return null;
};

export default AppStateProvider;
