import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useCoins } from '@/hooks/use-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useUnstakeAction } from './unstake-form-button.hooks';

const UnstakeFormButton: FC = () => {
  const { coins } = useCoins();
  const { control, getValues } = useFormContext();
  const { onUnstake, loading } = useUnstakeAction();

  const coinIn = getValues('in.type');
  const coinOut = getValues('out.type');

  const amountIn = useWatch({ control, name: 'in.value' });
  const amountOut = useWatch({ control, name: 'out.value' });

  const insufficientBalance =
    Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[coinIn] ?? ZERO_BIG_NUMBER);

  const insufficientAmountOut =
    normalizeStructTag(coinOut) === normalizeStructTag(TYPES.STAKED_WAL) &&
    Number(amountOut) &&
    Number(amountOut) < 1;

  const insufficientAmount = insufficientAmountOut || insufficientBalance;

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
      onClick={disabled ? undefined : onUnstake}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientAmount ? '#FF898B' : '#99EFE4'}
    >
      {insufficientAmountOut
        ? 'You must unstake at least 1 sWAL'
        : insufficientBalance
          ? 'Insufficient Balance'
          : loading
            ? 'Unstaking...'
            : 'Unstake'}
    </Button>
  );
};

export default UnstakeFormButton;
