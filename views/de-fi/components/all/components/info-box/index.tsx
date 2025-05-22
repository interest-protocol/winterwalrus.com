import { Div, P } from '@stylin.js/elements';
import Image from 'next/image';
import { FC } from 'react';

import { IInfoBox } from './info-box.types';

const InfoBox: FC<IInfoBox> = ({ label, value, iconImages }) => {
  const displayValue = label === 'SEND Points' && !value ? '--' : value;

  return (
    <Div
      p="0.75rem"
      bg="#1A1A1A"
      gap="0.25rem"
      display="flex"
      alignItems="center"
      borderRadius="0.5rem"
      flexDirection="column"
      justifyContent="center"
    >
      {iconImages && iconImages.length === 2 ? (
        <Div gap="0.25rem" display="flex" alignItems="center">
          <Div
            height="1rem"
            width="1.4rem"
            position="relative"
            marginRight="0.5rem"
          >
            <Image
              width={16}
              height={16}
              alt="icon 1"
              src={iconImages[0]}
              style={{
                position: 'absolute',
                left: 0,
                borderRadius: '50%',
                zIndex: 2,
              }}
            />
            <Image
              width={16}
              height={16}
              alt="icon 2"
              src={iconImages[1]}
              style={{
                position: 'absolute',
                left: '0.75rem',
                borderRadius: '50%',
                zIndex: 1,
              }}
            />
          </Div>
          <P
            color="#FFFFFF"
            fontWeight="500"
            fontSize="0.75rem"
            fontFamily={'JetBrains Mono'}
          >
            {displayValue}
          </P>
        </Div>
      ) : (
        <P
          color="#FFFFFF"
          fontWeight="500"
          fontSize="0.75rem"
          fontFamily={'JetBrains Mono'}
        >
          {displayValue}
        </P>
      )}
      <P color="#FFFFFF80" fontSize="0.75rem">
        {label}
      </P>
    </Div>
  );
};

export default InfoBox;
