import { Div, H1, Header as HTMLHeader, Strong } from '@stylin.js/elements';
import { FC } from 'react';

import Settings from '../settings';
import { LogoSVG } from '../svg';
import WalletButton from '../wallet-button';
import HeaderTVL from './header-tvl';
import Navbar from './navbar';

const Header: FC = () => (
  <HTMLHeader
    mx="auto"
    width="100%"
    display="flex"
    maxWidth="1440px"
    position="relative"
    alignItems="center"
    p={['0.5rem', '1rem']}
    justifyContent="space-between"
  >
    <Div display="flex" alignItems="center" gap={['0.5rem', '1rem', '2rem']}>
      <Div display="flex" alignItems="center" gap="1rem">
        <LogoSVG maxWidth="2rem" maxHeight="2rem" width="100%" />
        <H1
          mx="auto"
          color="#FFFFFF"
          maxWidth="20rem"
          fontSize="2.25rem"
          textAlign="center"
          fontFamily="PPNeueBit"
          display={['none', 'none', 'block']}
        >
          <Strong color="#99EFE4" fontFamily="PPNeueBit">
            Winter{' '}
          </Strong>
          Walrus
        </H1>
      </Div>
      <Navbar />
    </Div>
    <Div display="flex" gap={['0.5rem', '1rem']} alignItems="center">
      <HeaderTVL />
      <WalletButton />
      <Settings />
    </Div>
  </HTMLHeader>
);

export default Header;
