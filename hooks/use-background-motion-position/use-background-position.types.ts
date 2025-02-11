import { MotionValue } from 'motion/react';

export interface UseBackgroundMotionTranslate {
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  setTranslate: (args: {
    x?: MotionValue<number>;
    y?: MotionValue<number>;
  }) => void;
}
