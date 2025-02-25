import { FC } from 'react';

import { SVGProps } from './svg.types';

const ExternalLink: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 13"
    fill="none"
    {...props}
  >
    <path
      d="M13 4.5L13 0.5M13 0.5H9M13 0.5L7.66667 5.83333M5.66667 1.83333H4.2C3.0799 1.83333 2.51984 1.83333 2.09202 2.05132C1.71569 2.24307 1.40973 2.54903 1.21799 2.92535C1 3.35318 1 3.91323 1 5.03333V9.3C1 10.4201 1 10.9802 1.21799 11.408C1.40973 11.7843 1.71569 12.0903 2.09202 12.282C2.51984 12.5 3.0799 12.5 4.2 12.5H8.46667C9.58677 12.5 10.1468 12.5 10.5746 12.282C10.951 12.0903 11.2569 11.7843 11.4487 11.408C11.6667 10.9802 11.6667 10.4201 11.6667 9.3V7.83333"
      stroke="currentColor"
      strokeOpacity="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ExternalLink;
