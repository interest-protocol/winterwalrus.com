import { FC, useEffect } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const PoolTabs: FC = () => {
  const { tab, setTab } = useTabState();

  useEffect(() => {
    setTab(0);
  }, []);

  return <Tabs tabs={['Deposit', 'Withdraw']} tab={tab} setTab={setTab} />;
};

export default PoolTabs;
