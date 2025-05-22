import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { ILendingBadge } from './lending-badge.types';

const LendingBadge: FC<ILendingBadge> = ({ platform, badgeColor }) => {
  return (
    <Div display="flex" alignItems="center" gap="0.5rem">
      <Div
        width="1.5rem"
        height="1.5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        bg={badgeColor}
        color="#FFFFFF"
        fontSize="0.75rem"
      >
        {platform.charAt(0)}
      </Div>
      <P
        color="#FFFFFF"
        fontSize="0.875rem"
        fontWeight="500"
        fontFamily="JetBrains Mono"
      >
        Lend on {platform}
      </P>
    </Div>
  );
};

export default LendingBadge;
