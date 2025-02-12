import { AnimatePresence } from 'motion/react';
import { FC } from 'react';

import BackgroundPerspective from './background-perspective';
import BackgroundSnow from './background-snow';

const Background: FC = () => (
  <AnimatePresence>
    <BackgroundPerspective />
    <BackgroundSnow />
  </AnimatePresence>
);

export default Background;
