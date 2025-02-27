import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const Wal: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => {
  const id = useId();

  return (
    <svg
      style={{ maxWidth, maxHeight }}
      viewBox="0 0 1000 1000"
      fill="none"
      {...props}
    >
      <g clipPath={`url(#clip0_${id})`}>
        <path d="M1000 0H0V1000H1000V0Z" fill="#97F0E5" />
        <path
          d="M415 782H307V638H271V494H235V386H199V278H271V386H307V494H343V674H379V566H415V386H451V278H559V386H595V566H631V674H667.75V494H703V386H739V278H802V386H775V494H739V638H703V782H595V710H559V566H523V386H487V566H451V710H415V782Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id={`clip0_${id}`}>
          <rect width="1000" height="1000" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Wal;
