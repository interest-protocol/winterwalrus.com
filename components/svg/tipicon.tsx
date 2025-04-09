import React from 'react';

type TooltipIconProps = {
  icon: React.ElementType;
  text: string;
};

const TooltipIcon: React.FC<TooltipIconProps> = ({ icon: Icon, text }) => {
  return (
    <div className="tooltip-wrapper">
      <Icon width="0.75rem" height="0.75rem" />
      <span className="tooltip-text">{text}</span>

      <style>
        {`
          .tooltip-wrapper {
            position: relative;
            display: inline-block;
          }

          .tooltip-text {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            transform:translateX(-50%);
            bottom: 120%;
            left: 50%;
            z-index:10;
            line-height:1.2;
            background: #333;
            color: #fff;
            padding: 8px 8px;
            border-radius: 6px;
            white-space: normal;
            
            font-size: 0.9rem;
            max-width:180px;
            width:max-content;
            text-align:center;
            transition: opacity 0.4s ease-in-out;
            box-shadow: inset 0 0 0 1px #888;

          }

          .tooltip-wrapper:hover .tooltip-text {
            visibility: visible;
            opacity: 1;
            
          }
        `}
      </style>
    </div>
  );
};

export default TooltipIcon;
