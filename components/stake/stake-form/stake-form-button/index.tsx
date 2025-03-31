import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useCoins } from '@/hooks/use-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useStakeAction } from './stake-form-button.hooks';

const StakeFormButton: FC = () => {
  const { coins } = useCoins();
  const { onStake, loading } = useStakeAction();
  const { control, getValues } = useFormContext();

  const coinIn = getValues('in.type');
  const coinOut = getValues('out.type');

  const amountIn = useWatch({ control, name: 'in.value' });
  const amountOut = useWatch({ control, name: 'out.value' });

  const insufficientBalance =
    Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[coinIn] ?? ZERO_BIG_NUMBER);

  const insufficientAmountIn =
    coinIn &&
    normalizeStructTag(coinIn) === normalizeStructTag(TYPES.WAL) &&
    Number(amountIn) &&
    Number(amountIn) < 1;

  const insufficientAmountOut =
    coinOut &&
    normalizeStructTag(coinOut) === normalizeStructTag(TYPES.WAL) &&
    Number(amountOut) &&
    Number(amountOut) < 1;

  const insufficientAmount =
    insufficientAmountOut || insufficientAmountIn || insufficientBalance;

  const validator = getValues('validator');

  const disabled = !validator || insufficientAmount || loading;

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
      onClick={disabled ? undefined : onStake}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientAmount ? '#FF898B' : '#99EFE4'}
    >
      {!validator
        ? 'Select a validator '
        : insufficientAmountIn
          ? 'You must stake at least 1 WAL'
          : insufficientAmountOut
            ? 'You must unstake at least 1 sWAL'
            : insufficientBalance
              ? 'Insufficient Balance'
              : loading
                ? 'Staking...'
                : 'Stake'}
    </Button>
  );
};

export default StakeFormButton;
