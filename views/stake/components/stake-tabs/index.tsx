import { FC, useEffect } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const StakeTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const tabs = ['Stake', 'Unstake', 'Swap'];

  useEffect(() => {
    setTab(0);
  }, []);

  return <Tabs tabs={tabs} setTab={setTab} tab={tab} />;
};

export default StakeTabs;
