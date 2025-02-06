import { MotionValue } from 'motion/react';

export interface UseBackgroundTranslate {
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  setTranslate: (args: {
    x: MotionValue<number>;
    y: MotionValue<number>;
  }) => void;
}
