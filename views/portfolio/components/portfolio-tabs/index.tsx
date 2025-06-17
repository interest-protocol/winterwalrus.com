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
      tab={tab}
      setTab={setTab}
      tabs={['LSTs', 'Native StakedWal', 'LST NFTs', 'Coins']}
    />
  );
};

export default PortfolioTabs;
