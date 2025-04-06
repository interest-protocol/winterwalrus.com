import { AnimatePresence } from 'motion/react';
import { FC } from 'react';
import Countdown from 'react-countdown';

import { TOAST_DURATION } from '@/constants/toast';

import Motion from '../motion';
import { ToastTimerProps } from './toast.types';

const ToastTimer: FC<ToastTimerProps> = ({ color, loading }) => {
  if (loading)
    return (
      <Motion left="0" right="0" bottom="0" width="100%" position="absolute">
        <Motion
          layout
          bg={color}
          height="0.15rem"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: [0, 1] }}
          transition={{
            duration: 1,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </Motion>
    );

  return (
    <AnimatePresence>
      <Countdown
        date={Date.now() + TOAST_DURATION}
        renderer={({ seconds }) => (
          <Motion
            left="0"
            right="0"
            bottom="0"
            width="100%"
            position="absolute"
          >
            <Motion
              layout
              bg={color}
              height="0.15rem"
              initial={{ width: '100%' }}
              transition={{ duration: 1, ease: 'linear' }}
              animate={{
                width: `${(((seconds - 1) * 1000) / TOAST_DURATION) * 100}%`,
              }}
            />
          </Motion>
        )}
      />
    </AnimatePresence>
  );
};

export default ToastTimer;
