import { Button } from '@stylin.js/elements';
import { FC } from 'react';

import LSTNFTsUnstakeFormButton from '../lst-nfts-unstake-form-button';
import { LSTNFTsButtonProps } from './lst-nftsl-button.types';

const LSTNFTsButton: FC<LSTNFTsButtonProps> = ({ status }) => {
  if (status === 'Ready to Get' || status === '12:12')
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
        bg={status === '12:12' ? '#C484F680' : '#C484F6'}
        disabled={status === '12:12'}
        cursor={status === '12:12' ? 'not-allowed' : 'pointer'}
        opacity={status === '12:12' ? 0.7 : 1}
      >
        Get LST
      </Button>
    );

  if (status === 'Withdrawing')
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

  return <LSTNFTsUnstakeFormButton />;
};

export default LSTNFTsButton;
