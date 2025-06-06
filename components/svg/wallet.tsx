import { FC } from 'react';

import { SVGProps } from './svg.types';

const Wallet: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 17"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.2407 11.2462H13.8674C12.2865 11.2462 10.9999 9.9604 10.999 8.3804C10.999 6.79873 12.2857 5.51206 13.8674 5.51123H17.2407C17.5857 5.51123 17.8657 5.79123 17.8657 6.13623C17.8657 6.48123 17.5857 6.76123 17.2407 6.76123H13.8674C12.9749 6.76206 12.249 7.4879 12.249 8.37956C12.249 9.2704 12.9757 9.99623 13.8674 9.99623H17.2407C17.5857 9.99623 17.8657 10.2762 17.8657 10.6212C17.8657 10.9662 17.5857 11.2462 17.2407 11.2462Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.2488 8.95288H13.9888C13.6438 8.95288 13.3638 8.67288 13.3638 8.32788C13.3638 7.98288 13.6438 7.70288 13.9888 7.70288H14.2488C14.5938 7.70288 14.8738 7.98288 14.8738 8.32788C14.8738 8.67288 14.5938 8.95288 14.2488 8.95288Z"
      fill="currentColor"
    />
    <mask
      id="mask0_31_259"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="18"
      height="17"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.666748 0.5H17.8656V16.4774H0.666748V0.5Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_31_259)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.66484 1.75C3.59817 1.75 1.9165 3.43167 1.9165 5.49833V11.4792C1.9165 13.5458 3.59817 15.2275 5.66484 15.2275H12.8682C14.9348 15.2275 16.6157 13.5458 16.6157 11.4792V5.49833C16.6157 3.43167 14.9348 1.75 12.8682 1.75H5.66484ZM12.8682 16.4775H5.66484C2.909 16.4775 0.666504 14.235 0.666504 11.4792V5.49833C0.666504 2.74167 2.909 0.5 5.66484 0.5H12.8682C15.624 0.5 17.8657 2.74167 17.8657 5.49833V11.4792C17.8657 14.235 15.624 16.4775 12.8682 16.4775Z"
        fill="currentColor"
      />
    </g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.5707 5.53174H5.07153C4.72653 5.53174 4.44653 5.25174 4.44653 4.90674C4.44653 4.56174 4.72653 4.28174 5.07153 4.28174H9.5707C9.9157 4.28174 10.1957 4.56174 10.1957 4.90674C10.1957 5.25174 9.9157 5.53174 9.5707 5.53174Z"
      fill="currentColor"
    />
  </svg>
);

export default Wallet;
