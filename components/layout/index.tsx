import { Div, Footer, Main, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';
import { useBackgroundTranslate } from '@/hooks/use-background-position';

import Header from '../header';
import { ExternalLinkSVG } from '../svg';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { x, y } = useBackgroundMotionTranslate();
  const { setTranslate } = useBackgroundTranslate();

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    setTranslate({ X: e.clientX });
    setTranslate({ Y: e.clientY });
    x?.set(-(e.nativeEvent.x - window.innerWidth / 2) * 0.1);
    y?.set(-(e.nativeEvent.y - window.innerHeight / 2) * 0.1);
  };

  const handleMouseLeave = () => {
    x?.set(0);
    y?.set(0);
  };

  return (
    <Main
      display="flex"
      minHeight="100vh"
      position="relative"
      flexDirection="column"
      onMouseLeave={handleMouseLeave}
      onMouseMoveCapture={handleMouseMove}
    >
      <Header />
      {children}
      <Footer display="flex" justifyContent="center" py="1.5rem" gap="1rem">
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
            <Span>Documentation</Span>
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
      </Footer>
    </Main>
  );
};
export default Layout;
