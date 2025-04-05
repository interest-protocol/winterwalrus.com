import {
  Div,
  H1,
  Header as HTMLHeader,
  Span,
  Strong,
} from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import Settings from '../settings';
import MiniStats from '../stats/mini-stats';
import { ExternalLinkSVG, LogoSVG } from '../svg';
import Wallet from '../wallet';

const Header: FC = () => (
  <HTMLHeader
    p="1rem"
    mx="auto"
    display="flex"
    maxWidth="1440px"
    position="relative"
    alignItems="center"
    justifyContent="space-between"
  >
    <Div display="flex" alignItems="center" gap={['1rem', '1rem', '2rem']}>
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
      <Div display={['none', 'block']}>
        <MiniStats />
      </Div>
    </Div>
    <Div display="flex" gap={['0.5rem', '1rem']} alignItems="center">
      <Link target="_blank" href="https://t.co/1XNRy4vOZ0">
        <Div
          gap="0.5rem"
          display="flex"
          color="#FFFFFF80"
          alignItems="center"
          nHover={{ color: '#99EFE4' }}
        >
          <Span>Docs</Span>
          <ExternalLinkSVG maxWidth="1rem" width="100%" />
        </Div>
      </Link>
      <Wallet />
      <Settings />
    </Div>
  </HTMLHeader>
);

export default Header;
