import { Div, Main } from '@stylin.js/elements';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';
import { useBackgroundTranslate } from '@/hooks/use-background-position';

import Header from '../header';
import MiniStats from '../stats/mini-stats';

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
      minHeight="100vh"
      position="relative"
      onMouseLeave={handleMouseLeave}
      onMouseMoveCapture={handleMouseMove}
    >
      <Div
        mx="auto"
        py="0.5rem"
        bg="#C484F6"
        textAlign="center"
        justifyContent="center"
        display={['flex', 'none']}
      >
        <MiniStats />
      </Div>
      <Header />
      {children}
    </Main>
  );
};
export default Layout;
