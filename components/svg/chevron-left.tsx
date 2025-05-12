import { FC } from 'react';

import { SVGProps } from './svg.types';

const ChevronLeft: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M12.5 17.2253C12.3417 17.2253 12.1834 17.1669 12.0584 17.0419L6.62502 11.6086C5.74169 10.7253 5.74169 9.27526 6.62502 8.39193L12.0584 2.95859C12.3 2.71693 12.7 2.71693 12.9417 2.95859C13.1834 3.20026 13.1834 3.60026 12.9417 3.84193L7.50836 9.27526C7.10836 9.67526 7.10836 10.3253 7.50836 10.7253L12.9417 16.1586C13.1834 16.4003 13.1834 16.8003 12.9417 17.0419C12.8167 17.1586 12.6584 17.2253 12.5 17.2253Z"
      fill="currentColor"
    />
  </svg>
);

export default ChevronLeft;
