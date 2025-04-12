import { Div, Nav, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { values } from 'ramda';
import { FC } from 'react';

import { ExternalLinkSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

const Navbar: FC = () => {
  const { pathname } = useRouter();

  return (
    <Nav display={['none', 'none', 'none', 'flex']} gap="2.5rem">
      <Link href={Routes[RoutesEnum.Stake]} shallow>
        <Span
          nHover={{ color: '#99EFE480' }}
          color={
            values(Routes)
              .slice(1)
              .some((route) => pathname.includes(route))
              ? '#FFFFFF80'
              : '#99EFE4'
          }
        >
          Stake
        </Span>
      </Link>
      <Link href={Routes[RoutesEnum.Pools]} shallow>
        <Span
          nHover={{ color: '#99EFE480' }}
          color={
            pathname.includes(Routes[RoutesEnum.Pools])
              ? '#99EFE4'
              : '#FFFFFF80'
          }
        >
          Pools
        </Span>
      </Link>
      <Link href={Routes[RoutesEnum.Stats]} shallow>
        <Span
          nHover={{ color: '#99EFE480' }}
          color={
            pathname.includes(Routes[RoutesEnum.Stats])
              ? '#99EFE4'
              : '#FFFFFF80'
          }
        >
          Stats
        </Span>
      </Link>
      <Link
        target="_blank"
        href="https://interest-protocol.gitbook.io/winter-walrus"
      >
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
      <Link
        target="_blank"
        href="https://app.sentio.xyz/share/zc5tzoh0e45tx1a2"
      >
        <Div
          gap="0.5rem"
          display="flex"
          color="#FFFFFF80"
          alignItems="center"
          nHover={{ color: '#99EFE4' }}
        >
          <Span>Metrics</Span>
          <ExternalLinkSVG maxWidth="1rem" width="100%" />
        </Div>
      </Link>
    </Nav>
  );
};
export default Navbar;
