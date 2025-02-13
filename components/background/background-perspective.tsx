import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';

import Motion from '../motion';
import { GridSVG } from '../svg';

const ITEMS = 2;

const BackgroundPerspective: FC = () => {
  const { x, y } = useBackgroundMotionTranslate();

  return (
    <Motion
      layout
      zIndex="-1"
      scale="1.5"
      height="100vh"
      display="grid"
      color="#629590"
      position="fixed"
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
  );
};

export default BackgroundPerspective;
