import { Button } from '@stylin.js/elements';
import { FC } from 'react';

import NativeStakedWalUnstakeFormButton from '../native-staked-unstake-form-button';
import { NativeStakedWalButtonProps } from './native-staked-wal-row';

const NativeStakedWalButton: FC<NativeStakedWalButtonProps> = ({ status }) => {
  if (status === 'ready-to-get')
    return (
      <Button
        all="unset"
        py="1rem"
        px="1.5rem"
        color="#0C0F1D"
        fontWeight="500"
        textAlign="center"
        position="relative"
        borderRadius="0.625rem"
        bg="#99EFE4"
      >
        Withdraw
      </Button>
    );

  if (status === 'withdrawing')
    return (
      <Button
        all="unset"
        py="1rem"
        px="1.5rem"
        color="#0C0F1D"
        fontWeight="500"
        textAlign="center"
        position="relative"
        disabled
        borderRadius="0.625rem"
        opacity={0.7}
        cursor="not-allowed"
        bg="#99EFE4"
      >
        Withdraw
      </Button>
    );

  return <NativeStakedWalUnstakeFormButton />;
};

export default NativeStakedWalButton;
