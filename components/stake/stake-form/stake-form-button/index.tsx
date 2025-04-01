import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import { useCoins } from '@/hooks/use-coins';
import { useFees } from '@/hooks/use-fees';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useStakeAction } from './stake-form-button.hooks';

const StakeFormButton: FC = () => {
  const { fees } = useFees();
  const { coins } = useCoins();
  const { onStake, loading } = useStakeAction();
  const { nodes, isLoading } = useAllowedNodes();
  const { control, getValues } = useFormContext();

  const coinIn = getValues('in.type');
  const amountIn = useWatch({ control, name: 'in.value' });

  const minAmountIn =
    1 + (1 * (fees?.staking ?? 0)) / 100 + (1 * (fees?.unstaking ?? 0)) / 100;

  const maxMinAmount = fees?.staking || fees?.unstaking ? 1.1 : 1;

  const insufficientBalance =
    Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[coinIn] ?? ZERO_BIG_NUMBER);

  const insufficientAmountIn =
    coinIn &&
    normalizeStructTag(coinIn) === normalizeStructTag(TYPES.WAL) &&
    Number(amountIn) &&
    Number(amountIn) < minAmountIn;

  const insufficientAmount = insufficientAmountIn || insufficientBalance;

  const validator = getValues('validator');

  const disabled =
    !validator || insufficientAmount || loading || isLoading || !nodes?.length;

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
      {!nodes && isLoading
        ? 'Checking validators...'
        : nodes?.length && !validator
          ? 'Select a validator'
          : insufficientAmountIn
            ? `You must stake at least ${maxMinAmount}`
            : insufficientBalance
              ? 'Insufficient Balance'
              : loading
                ? 'Staking...'
                : 'Stake'}
    </Button>
  );
};

export default StakeFormButton;
