import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/hooks/use-network';

import { useStakeAction } from './stake-form-button.hooks';

const StakeFormButton: FC = () => {
  const network = useNetwork();
  const { control, getValues } = useFormContext();
  const { onStake, onUnstake, loading } = useStakeAction();

  const coinIn = getValues('in.type');
  const coinOut = useWatch({ control, name: 'out.type' });
  const amountIn = useWatch({ control, name: 'in.value' });

  const insufficientAmount =
    normalizeStructTag(coinIn) === normalizeStructTag(TYPES[network].WAL) &&
    Number(amountIn) &&
    Number(amountIn) < 1;

  const disabled = insufficientAmount || loading;

  return (
    <Button
      all="unset"
      py="1rem"
      px="1.5rem"
      color="#0C0F1D"
      fontWeight="500"
      textAlign="center"
      position="relative"
      disabled={disabled}
      borderRadius="0.625rem"
      opacity={disabled ? 0.7 : 1}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientAmount ? '#FF898B' : '#99EFE4'}
      onClick={coinOut === TYPES[network].STAKED_WAL ? onUnstake : onStake}
    >
      {insufficientAmount
        ? 'You must stake at least 1 WAL'
        : normalizeStructTag(coinOut) ===
            normalizeStructTag(TYPES[network].STAKED_WAL)
          ? loading
            ? 'Unstaking...'
            : 'Unstake'
          : loading
            ? 'Staking...'
            : 'Stake'}
    </Button>
  );
};

export default StakeFormButton;
