import { FC } from 'react';

import { SVGProps } from './svg.types';

const Info: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_48_2198)">
      <path
        d="M6 0C2.70445 0 0 2.70445 0 6C0 9.29555 2.70445 12 6 12C9.29555 12 12 9.29555 12 6C12 2.70445 9.29555 0 6 0ZM6.70312 8.8125C6.70312 9.20011 6.38761 9.51562 6 9.51562C5.61239 9.51562 5.29688 9.20011 5.29688 8.8125V5.29688C5.29688 4.90927 5.61239 4.59375 6 4.59375C6.38761 4.59375 6.70312 4.90927 6.70312 5.29688V8.8125ZM6 3.89062C5.61239 3.89062 5.29688 3.57511 5.29688 3.1875C5.29688 2.79989 5.61239 2.48438 6 2.48438C6.38761 2.48438 6.70312 2.79989 6.70312 3.1875C6.70312 3.57511 6.38761 3.89062 6 3.89062Z"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </g>
    <defs>
      <clipPath id="clip0_48_2198">
        <rect width="12" height="12" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Info;
