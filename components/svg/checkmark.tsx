import { FC } from 'react';

import { SVGProps } from './svg.types';

type CheckmarkProps = SVGProps & {
  color?: string;
};

const Checkmark: FC<CheckmarkProps> = ({
  maxWidth,
  maxHeight,
  color = 'currentColor',
  ...props
}) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 20"
    fill="none"
    {...props}
  >
    <path
      d="M5 10.5L9 14.5L15 7.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Checkmark;
