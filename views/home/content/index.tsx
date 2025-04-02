import { Div } from '@stylin.js/elements';
import { FC, useState } from 'react';
import unikey from 'unikey';

import { NFT, Stake } from '@/components';
import Unstake from '@/components/unstake';

import Tabs from './tabs';

const Content: FC = () => {
  const [tab, setTab] = useState(0);

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
      <Tabs tab={tab} setTab={setTab} />
      {
        [
          <Stake key={unikey()} />,
          <Unstake key={unikey()} />,
          <NFT key={unikey()} />,
        ][tab]
      }
    </Div>
  );
};
export default Content;
