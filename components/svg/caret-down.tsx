import { FC } from 'react';

import { SVGProps } from './svg.types';

const CaretDown: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 8 5" fill="none" {...props}>
    <path d="M4 5L8 0H0L4 5Z" fill="currentColor" />
  </svg>
);

export default CaretDown;
