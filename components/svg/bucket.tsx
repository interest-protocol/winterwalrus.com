import { FC } from 'react';

import { SVGProps } from './svg.types';

const Bucket: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 20 21"
    fill="none"
    {...props}
  >
    <g clipPath="url(#clip0_2417_2114)">
      <path
        d="M19.75 10.5C19.75 5.11522 15.3848 0.75 10 0.75C4.61522 0.75 0.25 5.11522 0.25 10.5C0.25 15.8848 4.61522 20.25 10 20.25C15.3848 20.25 19.75 15.8848 19.75 10.5Z"
        fill="black"
      />
      <path
        d="M19.75 10.5C19.75 5.11522 15.3848 0.75 10 0.75C4.61522 0.75 0.25 5.11522 0.25 10.5C0.25 15.8848 4.61522 20.25 10 20.25C15.3848 20.25 19.75 15.8848 19.75 10.5Z"
        stroke="white"
        strokeWidth="0.5"
      />
      <path
        d="M5 11.3731C5 9.51477 5.83666 7.78558 6.83763 6.42871H7.1465C6.56816 7.20216 5.44925 8.82399 5.27291 10.8361C5.27291 10.8361 7.1465 9.30443 9.81796 10.8361C12.4894 12.3678 14.363 10.8361 14.363 10.8361C14.1867 8.82399 13.0678 7.20216 12.4894 6.42871H12.7983C13.7993 7.78558 14.6359 9.51477 14.6359 11.3731C14.6359 13.8428 12.669 16.1889 9.81796 16.1889C6.96688 16.1889 5 13.8428 5 11.3731Z"
        fill="white"
      />
      <path
        d="M11.583 4.5L12.2944 5.4644H7.2417L7.95314 4.5H11.583Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_2417_2114">
        <rect width="20" height="21" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Bucket;
