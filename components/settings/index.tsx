import { useCurrentAccount } from '@mysten/dapp-kit';
import { Button, Div, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { CogSVG } from '../svg';

const Settings: FC = () => {
  const account = useCurrentAccount();

  if (!account) return null;

  return (
    <Div>
      <Button
        all="unset"
        color="#fff"
        lineHeight="0"
        cursor="pointer"
        borderRadius="0.75rem"
        border="1px solid #99EFE44D"
      >
        <Span
          p="1rem"
          display="inline-block"
          transition="all 300ms linear"
          nHover={{ rotate: '90deg', color: '#99EFE4' }}
        >
          <CogSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Span>
      </Button>
    </Div>
  );
};

export default Settings;
