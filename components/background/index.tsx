import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion, useSpring } from 'motion/react';
import { FC, MouseEventHandler } from 'react';
import unikey from 'unikey';

import { GridSVG } from '../svg';

const ITEMS = 2;

const Motion = motion.create(Div);

const Background: FC = () => {
  const x = useSpring(0);
  const y = useSpring(0);

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    x.set(-(e.nativeEvent.x - window.innerWidth / 2) * 0.1);
    y.set(-(e.nativeEvent.y - window.innerHeight / 2) * 0.1);
  };

  return (
    <AnimatePresence>
      <Motion
        layout
        scale="1.5"
        height="100vh"
        display="grid"
        position="fixed"
        overflow="hidden"
        alignItems="center"
        transition={{ ease: 'linear' }}
        onMouseMoveCapture={handleMouseMove}
        gridTemplateColumns={`repeat(${ITEMS}, 1fr)`}
        style={{ x, y, originX: 'center', originY: 'center' }}
      >
        {Array.from({ length: ITEMS }, (_, index) => (
          <Div
            key={unikey()}
            overflow="hidden"
            position="relative"
            scale={!(index & 1) ? '1' : '-1'}
          >
            <GridSVG
              width="50vw"
              maxWidth="100vw"
              maxHeight="100%"
              // filter="drop-shadow(0 0 0.75rem #DC8889)"
            />
            <Div
              inset="0"
              position="absolute"
              backgroundImage="linear-gradient(270deg, #0C0F1D,#0C0F1DBB, #0C0F1D22, #0C0F1D00)"
            />
          </Div>
        ))}
      </Motion>
    </AnimatePresence>
  );
};

export default Background;
