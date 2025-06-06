import { FC } from 'react';

import { SVGProps } from './svg.types';

const Logo: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 22 22"
    fill="none"
    {...props}
  >
    <path
      d="M11 1V17M11 17V21M11 17L14 20M11 17L8 20M14 2L11 5L8 2M2.34 6L5.804 8M5.804 8L16.196 14M5.804 8L4.706 3.902M5.804 8L1.706 9.098M16.196 14L19.66 16M16.196 14L20.294 12.902M16.197 14L17.295 18.099M19.66 6L16.196 8M16.196 8L5.804 14M16.196 8L17.294 3.902M16.196 8L20.294 9.098M5.804 14L2.34 16M5.804 14L1.706 12.902M5.804 14L4.706 18.1"
      strokeWidth="1.5"
      stroke="#99EFE4"
      strokeLinecap="round"
    />
  </svg>
);

export default Logo;
