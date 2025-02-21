import { FC } from 'react';

import { SVGProps } from './svg.types';

const Snow: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 27 27"
    fill="none"
    {...props}
  >
    <rect
      x="27"
      y="27"
      width="27"
      height="27"
      transform="rotate(180 27 27)"
      fill="#0E111B"
    />
    <path
      d="M14 4V20M14 20V24M14 20L17 23M14 20L11 23M17 5L14 8L11 5M5.33999 9L8.80399 11M8.80399 11L19.196 17M8.80399 11L7.70599 6.902M8.80399 11L4.70599 12.098M19.196 17L22.66 19M19.196 17L23.294 15.902M19.197 17L20.295 21.099M22.66 9L19.196 11M19.196 11L8.80399 17M19.196 11L20.294 6.902M19.196 11L23.294 12.098M8.80399 17L5.33999 19M8.80399 17L4.70599 15.902M8.80399 17L7.70599 21.1"
      stroke="#99EFE4"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default Snow;
