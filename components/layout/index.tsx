import { Main } from '@stylin.js/elements';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';
import { useBackgroundTranslate } from '@/hooks/use-background-position';

import Background from '../background';
import Header from '../header';

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
      <Background />
      <Header />
      {children}
    </Main>
  );
};
export default Layout;
