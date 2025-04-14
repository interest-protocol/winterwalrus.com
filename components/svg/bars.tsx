import { FC } from 'react';

import { SVGProps } from './svg.types';

const Bars: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 12"
    fill="none"
    {...props}
  >
    <path
      d="M0.75 0.75H17.25M0.75 6H17.25M0.75 11.25H17.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Bars;
