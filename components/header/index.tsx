import { Div, H1, Header as HTMLHeader, Strong } from '@stylin.js/elements';
import { FC } from 'react';

import Settings from '../settings';
import { LogoSVG } from '../svg';
import Wallet from '../wallet';

const Header: FC = () => (
  <HTMLHeader
    p="2rem"
    display="flex"
    position="relative"
    alignItems="center"
    justifyContent="space-between"
  >
    <Div display="flex" alignItems="center" gap="1rem">
      <LogoSVG maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
      <H1
        mx="auto"
        fontSize="3rem"
        color="#FFFFFF"
        maxWidth="20rem"
        textAlign="center"
        fontFamily="PPNeueBit"
        display={['none', 'none', 'block']}
      >
        <Strong color="#99EFE4" fontFamily="PPNeueBit">
          Winter
        </Strong>{' '}
        Walrus
      </H1>
    </Div>
    <Div display="flex" gap="1rem">
      <Settings />
      <Wallet />
    </Div>
  </HTMLHeader>
);

export default Header;
