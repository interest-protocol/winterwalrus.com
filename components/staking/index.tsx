import { Div, H3, P, Strong } from '@stylin.js/elements';
import { FC } from 'react';

import StakingAssets from './staking-assets';

const Staking: FC = () => (
  <Div
    p="1rem"
    gap="1rem"
    bg="#FFFFFF0D"
    display="flex"
    color="#ffffff"
    position="sticky"
    borderRadius="1rem"
    flexDirection="column"
    border="1px solid #FFFFFF1A"
  >
    <Div display="flex" justifyContent="space-between" alignItems="center">
      <H3 fontSize="1rem" fontWeight="600">
        Your Staked Wal
      </H3>
      <P
        p="0.5rem"
        color="#fff"
        borderRadius="0.5rem"
        fontFamily="JetBrains Mono"
        border="1px solid #99EFE44D"
      >
        0{' '}
        <Strong color="#99EFE4" fontFamily="inherit">
          WAL
        </Strong>
      </P>
    </Div>
    <StakingAssets />
  </Div>
);

export default Staking;
