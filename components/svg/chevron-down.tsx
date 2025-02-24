import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronDown: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 10 5"
    fill="none"
    {...props}
  >
    <path
      d="M1.66675 1.3335L4.1162 3.78295C4.60435 4.2711 5.39581 4.2711 5.88396 3.78295L8.33341 1.3335"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ChevronDown;
