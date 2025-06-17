import { FC, useEffect } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const PoolsTabs: FC = () => {
  const { tab, setTab } = useTabState();

  useEffect(() => {
    setTab(0);
  }, [setTab]);

  return <Tabs tabs={['All Pools', 'My Position']} setTab={setTab} tab={tab} />;
};

export default PoolsTabs;
