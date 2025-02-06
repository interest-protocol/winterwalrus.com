import { useSpring } from 'motion/react';
import { FC, useEffect } from 'react';

import { useBackgroundTranslate } from '@/hooks/use-background-position';

const BackgroundProvider: FC = () => {
  const { setTranslate } = useBackgroundTranslate();

  const x = useSpring(0);
  const y = useSpring(0);

  useEffect(() => {
    setTranslate({ x, y });
  }, []);

  return null;
};

export default BackgroundProvider;
