import { Button, Div } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC, useMemo } from 'react';
import unikey from 'unikey';

import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';

import { TabsProps } from './content.types';

const Tabs: FC<TabsProps> = ({ tab, setTab }) => {
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

  return (
    <Div display="flex" gap="0.5rem">
      {[
        'Stake',
        'Unstake',
        `NFT ${objectsToActivate ? `(${objectsToActivate})` : ''}`,
      ].map((text, index) => (
        <Button
          all="unset"
          py="0.5rem"
          px="0.75rem"
          key={unikey()}
          cursor="pointer"
          border="1px solid"
          borderColor="#99EFE4"
          borderRadius="0.75rem"
          onClick={() => setTab(index)}
          color={tab === index ? '#292929' : 'white'}
          bg={tab === index ? '#99EFE4' : 'transparent'}
        >
          {text}
        </Button>
      ))}
    </Div>
  );
};

export default Tabs;
