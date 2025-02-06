import { Header as HTMLHeader } from '@stylin.js/elements';
import { FC } from 'react';

import { LogoSVG } from '../svg';
import Wallet from '../wallet';

const Header: FC = () => {
  return (
    <HTMLHeader
      p="2rem"
      display="flex"
      position="relative"
      alignItems="center"
      justifyContent="space-between"
    >
      <LogoSVG maxWidth="2.5rem" maxHeight="2.5rem" width="100%" />
      <Wallet />
    </HTMLHeader>
  );
};

export default Header;
