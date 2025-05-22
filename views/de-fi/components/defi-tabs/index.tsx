import { values } from 'ramda';
import { FC, useMemo } from 'react';

import { Tabs } from '@/components';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';
import { useTabState } from '@/hooks/use-tab-manager';

const DefiTabs: FC = () => {
  const { tab, setTab } = useTabState();
  const { data: epochData } = useEpochData();
  const { objectsActivation } = useAppState();

  const objectsToActivate = useMemo(
    () =>
      values(objectsActivation).filter(
        (activationEpoch) =>
          epochData && activationEpoch <= epochData.currentEpoch
      ).length,
    [objectsActivation, epochData]
  );

  const tabs = [
    'All',
    'Lending',
    'AMM',
    `CPD ${objectsToActivate ? `(${objectsToActivate})` : ''}`,
  ];

  return <Tabs tabs={tabs} setTab={setTab} tab={tab} />;
};

export default DefiTabs;
