import { FC } from 'react';

import { SVGProps } from './svg.types';

const SnowWal: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 1000 1000"
    fill="none"
    {...props}
  >
    <path d="M1000 0H0V1000H1000V0Z" fill="#10121F" />
    <path
      d="M414 782H306V638H270V494H234V386H198V278H270V386H306V494H342V674H378V566H414V386H450V278H558V386H594V566H630V674H666.75V494H702V386H738V278H801V386H774V494H738V638H702V782H594V710H558V566H522V386H486V566H450V710H414V782Z"
      fill="#A4DBD8"
    />
  </svg>
);

export default SnowWal;
