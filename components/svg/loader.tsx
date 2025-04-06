import { Div } from '@stylin.js/elements';
import { motion } from 'motion/react';
import { FC, useId } from 'react';

import { SVGProps } from './svg.types';

const Motion = motion.create(Div);

const Loader: FC<SVGProps> = ({ maxWidth, maxHeight }) => {
  const id = useId();

  return (
    <>
      <Motion
        display="flex"
        position="relative"
        alignItems="flex-end"
        justifyContent="center"
        animate={{ rotate: ['0deg', '-365deg'] }}
        transition={{
          duration: 2,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        <Div
          width={maxWidth}
          height={maxHeight}
          clipPath={`url(#${id})`}
          bg="conic-gradient(from 180deg, currentColor, #F5B72200)"
        />
        <Div
          mb="1px"
          width="9.5px"
          height="9.5px"
          bg="currentColor"
          borderRadius="50%"
          position="absolute"
        />
      </Motion>
      <svg width="0" height="0" viewBox="0 0 64 65">
        <clipPath id={id}>
          <path d="M63.5952 32.5C63.5952 49.9494 49.4496 64.0949 32.0002 64.0949C14.5508 64.0949 0.405273 49.9494 0.405273 32.5C0.405273 15.0506 14.5508 0.905029 32.0002 0.905029C49.4496 0.905029 63.5952 15.0506 63.5952 32.5ZM9.85301 32.5C9.85301 44.7316 19.7687 54.6472 32.0002 54.6472C44.2318 54.6472 54.1474 44.7316 54.1474 32.5C54.1474 20.2684 44.2318 10.3528 32.0002 10.3528C19.7687 10.3528 9.85301 20.2684 9.85301 32.5Z" />
        </clipPath>
      </svg>
    </>
  );
};

export default Loader;
