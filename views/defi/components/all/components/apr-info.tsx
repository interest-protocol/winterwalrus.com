import { Div, P } from '@stylin.js/elements';
import type { FC } from 'react';

interface APRInfoProps {
  apr: string;
}

const APRInfo: FC<APRInfoProps> = ({ apr }) => {
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
        {apr}
      </P>
      <P color="#FFFFFF80" fontSize="0.75rem">
        APR
      </P>
    </Div>
  );
};

export default APRInfo;
