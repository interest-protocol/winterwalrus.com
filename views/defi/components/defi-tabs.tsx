import { FC, useEffect } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const DeFiTabs: FC = () => {
  const { tab, setTab } = useTabState();

  useEffect(() => {
    setTab(0);
  }, []);

  return (
    <Tabs tab={tab} setTab={setTab} tabs={['All', 'Lending', 'AMM', 'CDP']} />
  );
};

export default DeFiTabs;
