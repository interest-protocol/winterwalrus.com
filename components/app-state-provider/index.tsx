import { FC, useEffect } from 'react';

import { useAppState } from '@/hooks/use-app-state';
import { useCoins } from '@/hooks/use-coins';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const AppStateProvider: FC = () => {
  const { coins } = useCoins();
  const { update } = useAppState();
  const { principalByType, stakingObjectIds } = useStakingObjects();

  useEffect(() => {
    if (!coins) return;

    update(({ balances }) => ({ balances: { ...balances, ...coins } }));
  }, [coins]);

  useEffect(() => {
    console.log('>> update ', { principalByType });

    if (!principalByType || !stakingObjectIds) return;

    update(({ balances }) => ({
      stakingObjectIds,
      principalsByType: principalByType,
      balances: { ...balances, ...principalByType },
    }));
  }, [principalByType, stakingObjectIds]);

  return null;
};

export default AppStateProvider;
