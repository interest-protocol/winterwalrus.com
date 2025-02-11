import { Div } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';

import { useBackgroundTranslate } from '@/hooks/use-background-position';

import { LogoSVG } from '../svg';

const Motion = motion.create(Div);

const BackgroundSnow: FC = () => {
  const { Y, X } = useBackgroundTranslate();
  const [delay, setDelay] = useState(0);
  const [items, setItems] = useState<
    ReadonlyArray<[number, number, number, number]>
  >([]);

  useEffect(() => {
    if (!X || !Y) return;

    if (Date.now() < delay) return;

    setItems([...items, [X, Y, window.innerHeight, Math.random()]]);
    setDelay(Date.now() + 250);
  }, [X]);

  return (
    <>
      {items.map(([x, y, maxY, factor], index) => (
        <Motion
          key={index}
          position="fixed"
          initial={{ x, y }}
          transition={{ duration: 3 + factor * 4 }}
          filter="drop-shadow(0 0 0.25rem #0C0F1D)"
          animate={{ y: [y, maxY - 16 * 3 * ((30 + factor * 70) / 100)] }}
        >
          <LogoSVG
            maxWidth="3rem"
            maxHeight="3rem"
            width={`${30 + factor * 70}%`}
          />
        </Motion>
      ))}
    </>
  );
};
export default BackgroundSnow;
