import { FC } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const PoolsTabs: FC = () => {
  const { tab, setTab } = useTabState();

  return <Tabs tabs={['All Pools', 'My Position']} setTab={setTab} tab={tab} />;
};

export default PoolsTabs;
