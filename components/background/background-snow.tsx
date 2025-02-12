import { Div } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, useEffect, useState } from 'react';

import { useBackgroundTranslate } from '@/hooks/use-background-position';
import { useSafeHeight } from '@/hooks/use-safe-height';

import { GoldenLogoSVG, LogoSVG } from '../svg';

const Motion = motion.create(Div);

const BackgroundSnow: FC = () => {
  const maxHeight = useSafeHeight();
  const [delay, setDelay] = useState(0);
  const { Y, X } = useBackgroundTranslate();
  const [items, setItems] = useState<
    ReadonlyArray<[number, number, number, boolean]>
  >([]);

  useEffect(() => {
    if (!X || !Y) return;

    if (Date.now() < delay) return;

    setItems([...items, [X, Y, Math.random(), Math.random() < 0.01]]);
    setDelay(Date.now() + 250);
  }, [X]);

  return (
    <>
      {items.map(([x, y, factor, golden], index) => (
        <Motion
          zIndex="1"
          key={index}
          position="fixed"
          initial={{ x, y }}
          transition={{ duration: 3 + factor * 4 }}
          filter="drop-shadow(0 0 0.25rem #0C0F1D)"
          animate={{ y: maxHeight - 16 * 3 * ((30 + factor * 70) / 100) }}
        >
          {golden ? (
            <GoldenLogoSVG
              maxWidth="3rem"
              maxHeight="3rem"
              width={`${30 + factor * 70}%`}
            />
          ) : (
            <LogoSVG
              maxWidth="3rem"
              maxHeight="3rem"
              width={`${30 + factor * 70}%`}
            />
          )}
        </Motion>
      ))}
    </>
  );
};

export default BackgroundSnow;
