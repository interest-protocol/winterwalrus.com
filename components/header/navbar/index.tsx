import { Div, Nav, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { map, toPairs } from 'ramda';
import { FC } from 'react';

import { ExternalLinkSVG } from '@/components/svg';
import { Routes, RoutesEnum } from '@/constants';

const Navbar: FC = () => {
  const { pathname } = useRouter();

  const links = map(
    ([key, href]) => ({
      href,
      label: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase(),
      active:
        (key === RoutesEnum.Stake && pathname === Routes[RoutesEnum.Stake]) ||
        (key !== RoutesEnum.Stake && pathname.includes(Routes[key])),
    }),
    toPairs(Routes)
  );

  return (
    <Nav display={['none', 'none', 'none', 'flex']} gap="2.5rem">
      {links.map(({ href, label, active }) => (
        <Link key={label} href={href} shallow>
          <Span
            nHover={{ color: '#99EFE480' }}
            color={active ? '#99EFE4' : '#FFFFFF80'}
          >
            {label}
          </Span>
        </Link>
      ))}
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
    </Nav>
  );
};

export default Navbar;
