import { FC } from 'react';

import { SVGProps } from './svg.types';

const Dot: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 8 9" fill="none" {...props}>
    <circle cx="4" cy="4.5" r="4" fill="currentColor" />
  </svg>
);

export default Dot;
