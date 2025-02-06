import { FC } from 'react';

import { SVGProps } from './svg.types';

const Logout: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 18"
    fill="none"
    {...props}
  >
    <path
      d="M12 5V3C12 2.46957 11.7893 1.96086 11.4142 1.58579C11.0391 1.21071 10.5304 1 10 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V15C1 15.5304 1.21071 16.0391 1.58579 16.4142C1.96086 16.7893 2.46957 17 3 17H10C10.5304 17 11.0391 16.7893 11.4142 16.4142C11.7893 16.0391 12 15.5304 12 15V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 9H19M19 9L16 6M19 9L16 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Logout;
