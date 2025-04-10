import { FC } from 'react';

import { SVGProps } from './svg.types';

const CaretUp: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg style={{ maxWidth, maxHeight }} viewBox="0 0 8 5" fill="none" {...props}>
    <path d="M0 5L4 0L8 5H0Z" fill="currentColor" />
  </svg>
);

export default CaretUp;
