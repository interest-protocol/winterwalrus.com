import { FC } from 'react';

import { SVGProps } from './svg.types';

const PizzaPart25Percent: FC<SVGProps> = ({
  maxWidth,
  maxHeight,
  ...props
}) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 14 16"
    fill="none"
    {...props}
  >
    <path
      d="M1.75 7.75C1.75 10.6484 4.10156 13 7 13C9.89844 13 12.25 10.6484 12.25 7.75C12.25 4.85156 9.89844 2.5 7 2.5V6.875C7 7.36719 6.58984 7.75 6.125 7.75H1.75ZM0 7.75C0 5.26172 1.3125 2.96484 3.5 1.70703C5.66016 0.449219 8.3125 0.449219 10.5 1.70703C12.6602 2.96484 14 5.26172 14 7.75C14 10.2656 12.6602 12.5625 10.5 13.8203C8.3125 15.0781 5.66016 15.0781 3.5 13.8203C1.3125 12.5625 0 10.2656 0 7.75Z"
      fill="currentColor"
    />
  </svg>
);

export default PizzaPart25Percent;
