import { TYPES } from '@interest-protocol/blizzard-sdk';
import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardButton from '@/components/wallet-button/wallet-guard-button';
import { useCoins } from '@/hooks/use-coins';
import { useFees } from '@/hooks/use-fees';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useSwapAction } from './swap-form-button.hooks';

const SwapFormButton: FC = () => {
  const { coins } = useCoins();
  const { onStake, loading } = useSwapAction();
  const { control, getValues } = useFormContext();
  const { fees } = useFees(getValues('in.type'));

  const amountIn = useWatch({ control, name: 'in.value' });

  const minAmountIn = 1 + (fees?.transmute ?? 0) / 100;

  const minMaxAmountIn = fees?.transmute ? 1.1 : 1;

  const insufficientAmountIn =
    !!Number(amountIn) && Number(amountIn) < minAmountIn;

  const insufficientBalance =
    !!Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[getValues('in.type')] ?? ZERO_BIG_NUMBER);

  const isSwap = getValues(['in.type', 'out.type']).includes(TYPES.WAL);

  const hasMarket =
    isSwap &&
    values(POOLS).some(({ coinTypes }) =>
      coinTypes.every((type) =>
        getValues(['in.type', 'out.type']).includes(type)
      )
    );

  const disabled =
    loading ||
    (isSwap && !hasMarket) ||
    insufficientAmountIn ||
    insufficientBalance;

  return (
    <WalletGuardButton
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
      bg={insufficientBalance ? '#FF898B' : '#99EFE4'}
    >
      {insufficientBalance
        ? 'Insufficient Balance'
        : isSwap
          ? !hasMarket
            ? 'Has no market'
            : loading
              ? 'Swapping...'
              : 'Swap'
          : loading
            ? 'Transmuting...'
            : insufficientAmountIn
              ? `You must transmute at least ${minMaxAmountIn}`
              : 'Transmute'}
    </WalletGuardButton>
  );
};

export default SwapFormButton;
