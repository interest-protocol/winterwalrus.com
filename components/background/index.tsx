import { Div } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import unikey from 'unikey';

import { useBackgroundTranslate } from '@/hooks/use-background-position';

import { GridSVG } from '../svg';

const ITEMS = 2;

const Motion = motion.create(Div);

const Background: FC = () => {
  const { x, y } = useBackgroundTranslate();

  return (
    <AnimatePresence>
      <Motion
        layout
        scale="1.5"
        height="100vh"
        display="grid"
        position="fixed"
        zIndex="-1"
        overflow="hidden"
        alignItems="center"
        transition={{ ease: 'linear' }}
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
            <Motion
              animate={{
                filter: [
                  'drop-shadow(0 0 0.25rem #45837B)',
                  'drop-shadow(0 0 0.25rem #45837B00)',
                ],
              }}
              transition={{
                duration: 1,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              <GridSVG width="50vw" maxWidth="100vw" maxHeight="100%" />
            </Motion>
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
