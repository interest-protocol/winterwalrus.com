import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { NFT, Stake } from '@/components';
import Stats from '@/components/stats';
import Unstake from '@/components/unstake';
import { useTabState } from '@/hooks/use-tab-manager';

import Tabs from './tabs';

const Content: FC = () => {
  const { tab } = useTabState();

  return (
    <Div
      mx="auto"
      gap="1rem"
      display="flex"
      maxWidth="34rem"
      position="relative"
      borderRadius="1rem"
      flexDirection="column"
      px={['0.5rem', '2rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Tabs />
      {
        [
          <Stake key={unikey()} />,
          <Unstake key={unikey()} />,
          <NFT key={unikey()} />,
          <Stats key={unikey()} />,
        ][tab]
      }
    </Div>
  );
};
export default Content;
