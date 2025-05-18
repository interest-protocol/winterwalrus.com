import { Div, P } from '@stylin.js/elements';
import type { FC } from 'react';

interface TVLInfoProps {
  tvl: string;
}

const TVLInfo: FC<TVLInfoProps> = ({ tvl }) => {
  return (
    <Div
      p="0.75rem"
      display="flex"
      bg="#1A1A1A"
      borderRadius="0.5rem"
      flexDirection="column"
      gap="0.25rem"
      alignItems="center"
      justifyContent="center"
    >
      <P color="#FFFFFF" fontSize="0.75rem" fontWeight="500">
        {tvl}
      </P>
      <P color="#FFFFFF80" fontSize="0.75rem">
        TVL
      </P>
    </Div>
  );
};

export default TVLInfo;
