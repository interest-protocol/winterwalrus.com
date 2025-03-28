import { Button, Div } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC, useMemo, useState } from 'react';
import unikey from 'unikey';

import { NFT, Stake } from '@/components';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';

const Content: FC = () => {
  const [tab, setTab] = useState(0);
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
    <Div
      mx="auto"
      gap="1rem"
      display="flex"
      maxWidth="34rem"
      position="relative"
      borderRadius="1rem"
      mt={['1rem', '3rem']}
      flexDirection="column"
      px={['0.5rem', '2rem']}
    >
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
      {
        [
          <Stake key={unikey()} />,
          <Stake key={unikey()} />,
          <NFT key={unikey()} />,
        ][tab]
      }
    </Div>
  );
};
export default Content;
