import { AnimatePresence } from 'motion/react';
import { FC } from 'react';

import BackgroundBlur from './background-blur';

const Background: FC = () => (
  <AnimatePresence>
    <BackgroundBlur />
  </AnimatePresence>
);

export default Background;
