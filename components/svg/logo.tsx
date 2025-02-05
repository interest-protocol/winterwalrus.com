import { FC } from 'react';

import { SVGProps } from './svg.types';

const Logo: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 417 461"
    fill="none"
    {...props}
  >
    <path d="M208.5 0V194L0 461L208.5 0Z" fill="#3E415D" />
    <path d="M208.5 1V194L417 460.785L208.5 1Z" fill="#3E415D" />
    <rect x="113" y="301" width="193" height="94" fill="#3E415E" />
    <path
      d="M209.854 361L306 395.147L209.854 430L113 395.147L209.854 361Z"
      fill="#3E415E"
    />
    <mask
      id="mask0_2_35"
      style={{ maskType: 'alpha' }}
      maskUnits="userSpaceOnUse"
      x="113"
      y="330"
      width="193"
      height="94"
    >
      <rect x="113" y="330" width="193" height="94" fill="#B9B9B9" />
    </mask>
    <g mask="url(#mask0_2_35)">
      <path
        d="M210 256.5L413.5 329L210 403L5 329L210 256.5Z"
        fill="url(#paint0_radial_2_35)"
        fillOpacity="0.2"
      />
    </g>
    <path
      d="M209.676 245L393 310.324L209.676 377L25 310.324L209.676 245Z"
      fill="#262736"
    />
    <defs>
      <radialGradient
        id="paint0_radial_2_35"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(209.25 329.75) rotate(90) scale(73.25 204.25)"
      >
        <stop offset="0.338542" />
        <stop offset="1" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

export default Logo;
