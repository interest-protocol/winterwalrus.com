import { FC } from 'react';

import { useBackgroundMotionTranslate } from '@/hooks/use-background-motion-position';

import Motion from '../motion';

const BackgroundBlur: FC = () => {
  const { x, y } = useBackgroundMotionTranslate();

  return (
    <Motion
      inset="0"
      zIndex="-1"
      scale="1.5"
      position="fixed"
      filter="blur(50px)"
      transition={{ ease: 'linear' }}
      style={{ x, y, originX: 'center', originY: 'center' }}
      bg="linear-gradient(180deg, #000000AA,#000000EE), url(/bg.png)"
      backgroundPosition="top left"
      backgroundSize="cover"
    />
  );
};

export default BackgroundBlur;
