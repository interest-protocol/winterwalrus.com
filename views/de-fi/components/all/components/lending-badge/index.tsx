import { Div, P } from '@stylin.js/elements';
import Image from 'next/image';
import { FC } from 'react';

import { ILendingBadge } from './lending-badge.types';

const LendingBadge: FC<ILendingBadge> = ({ platform, imageUrl }) => {
  return (
    <Div display="flex" alignItems="center" gap="0.5rem">
      <Image
        src={imageUrl}
        alt={platform}
        width={24}
        height={24}
        style={{ borderRadius: '50%' }}
      />
      <P
        color="#FFFFFF"
        fontSize="1.125rem"
        fontWeight="500"
        fontFamily="JetBrains Mono"
      >
        Lend on {platform}
      </P>
    </Div>
  );
};

export default LendingBadge;
