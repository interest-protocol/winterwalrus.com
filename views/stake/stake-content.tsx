import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useTabState } from '@/hooks/use-tab-manager';

import {
  Epoch,
  NFT,
  Stake,
  StakeTabs,
  Swap,
  Transmute,
  Unstake,
} from './components';

const StakeContent: FC = () => {
  const { tab } = useTabState();

  return (
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      display="flex"
      borderRadius="1rem"
      flexDirection="column"
      px={['0.5rem', '2rem']}
      width={['100%', '34rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <StakeTabs />
      {
        [
          <Stake key={unikey()} />,
          <Unstake key={unikey()} />,
          <Transmute key={unikey()} />,
          <Swap key={unikey()} />,
          <NFT key={unikey()} />,
        ][tab]
      }
      <Epoch />
    </Div>
  );
};
export default StakeContent;
