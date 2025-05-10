import { Div, Span } from '@stylin.js/elements';
import React from 'react';

import { TooltipIconProps } from './tooltip.types';

const TooltipIcon: React.FC<TooltipIconProps> = ({ icon: Icon, text }) => {
  return (
    <Div
      position="relative"
      display="inline-block"
      nHover={{
        span: {
          visibility: 'visible',
          opacity: 1,
        },
      }}
    >
      <Icon width="0.75rem" height="0.75rem" />
      <Span
        visibility="hidden"
        opacity="0"
        position="absolute"
        transform="translateX(-50%)"
        bottom="120%"
        left="50%"
        zIndex="10"
        lineHeight="1.2"
        bg="#333"
        color="#fff"
        p="8px"
        borderRadius="6px"
        whiteSpace="normal"
        fontSize="0.9rem"
        maxWidth="180px"
        width="max-content"
        textAlign="center"
        transition="opacity 0.4s ease-in-out"
        boxShadow="inset 0 0 0 1px #888"
      >
        {text}
      </Span>
    </Div>
  );
};

export default TooltipIcon;
