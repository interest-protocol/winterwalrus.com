import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';
import { useSafeHeight } from '@/hooks/use-safe-height';

import Motion from '../motion';

const BackgroundBlur: FC = () => {
  const safeHeight = useSafeHeight();
  const { x, y } = useBackgroundMotionTranslate();

  return (
    <Motion
      inset="0"
      zIndex="-1"
      scale="1.5"
      position="fixed"
      transition={{ ease: 'linear' }}
      style={{ x, y, originX: 'center', originY: 'center' }}
      bg="linear-gradient(180deg, #000000A3,#000), url(/bg.png)"
      backgroundPosition="top left"
      backgroundSize="cover"
    >
      <Div width="100vw" height={safeHeight} backdropFilter="blur(100px)" />
    </Motion>
  );
};

export default BackgroundBlur;
