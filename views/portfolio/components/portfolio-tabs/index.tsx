import { FC, useEffect } from 'react';

import { Tabs } from '@/components';
import { useTabState } from '@/hooks/use-tab-manager';

const PortfolioTabs: FC = () => {
  const { tab, setTab } = useTabState();

  useEffect(() => {
    setTab(0);
  }, []);

  return (
    <Tabs
      tabs={['LSTs', 'Native StakedWal', 'LST NFTs', 'Coins']}
      tab={tab}
      setTab={setTab}
    />
  );
};

export default PortfolioTabs;
