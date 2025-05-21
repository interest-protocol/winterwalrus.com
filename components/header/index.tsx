import { Div, Header as HTMLHeader } from '@stylin.js/elements';
import { FC } from 'react';

import Settings from '../settings';
import Logo from '../svg/logo';
import WalletButton from '../wallet-button';
import HeaderTVL from './header-tvl';
import Navbar from './navbar';

const Header: FC = () => (
  <HTMLHeader
    p="1rem"
    mx="auto"
    width="100%"
    display="flex"
    maxWidth="1440px"
    position="relative"
    alignItems="center"
    justifyContent="space-between"
  >
    <Div display="flex" alignItems="center" gap={['0.5rem', '1rem', '2rem']}>
      <Div display="flex" alignItems="center" gap="1rem">
        <Logo maxWidth="104" maxHeight="52" />
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
