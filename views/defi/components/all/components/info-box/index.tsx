import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { IInfoBox } from './info-box.types';

const InfoBox: FC<IInfoBox> = ({ label, value, icon }) => {
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
      {icon ? (
        <Div display="flex" alignItems="center" gap="0.25rem">
          {icon}
          <P
            color="#FFFFFF"
            fontSize="0.75rem"
            fontWeight="500"
            fontFamily={'JetBrains Mono'}
          >
            {value}
          </P>
        </Div>
      ) : (
        <P color="#FFFFFF" fontSize="0.75rem" fontWeight="500">
          {value}
        </P>
      )}
      <P color="#FFFFFF80" fontSize="0.75rem">
        {label}
      </P>
    </Div>
  );
};

export default InfoBox;
