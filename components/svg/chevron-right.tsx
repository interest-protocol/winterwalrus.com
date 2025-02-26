import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronRight: FC<SVGProps> = ({ maxHeight, maxWidth, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.52864 3.52876C5.78899 3.26841 6.2111 3.26841 6.47145 3.52876L10.4714 7.52876C10.7318 7.78911 10.7318 8.21122 10.4714 8.47157L6.47145 12.4716C6.2111 12.7319 5.78899 12.7319 5.52864 12.4716C5.26829 12.2112 5.26829 11.7891 5.52864 11.5288L9.05723 8.00016L5.52864 4.47157C5.26829 4.21122 5.26829 3.78911 5.52864 3.52876Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronRight;
