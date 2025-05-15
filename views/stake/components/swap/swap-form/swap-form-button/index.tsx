import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { values } from 'ramda';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardButton from '@/components/wallet-button/wallet-guard-button';
import { useCoins } from '@/hooks/use-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useSwapAction } from './swap-form-button.hooks';

const SwapFormButton: FC = () => {
  const { coins } = useCoins();
  const { onSwap, loading } = useSwapAction();
  const { control, getValues } = useFormContext();

  const [amountIn, amountOut, coinIn, coinOut, quoting] = useWatch({
    control,
    name: ['in.value', 'out.value', 'in.type', 'out.type', 'quoting'],
  });

  const insufficientBalance =
    !!Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[getValues('in.type')] ?? ZERO_BIG_NUMBER);

  const minAmountOut = 1;

  const insufficientAmountOut =
    !values(POOLS).some(({ coinTypes }) =>
      coinTypes.every((coin) => [coinIn, coinOut].includes(coin))
    ) &&
    !!Number(amountOut) &&
    Number(amountOut) < minAmountOut;

  const disabled =
    quoting || loading || insufficientBalance || insufficientAmountOut;

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
      onClick={disabled ? undefined : onSwap}
      nHover={!disabled && { bg: '#74D5C9' }}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientBalance ? '#FF898B' : disabled ? '#99EFE480' : '#EE2B5B'}
    >
      {insufficientBalance
        ? 'Insufficient Balance'
        : quoting
          ? 'Quoting...'
          : insufficientAmountOut
            ? 'You must swap to at least 1'
            : loading
              ? 'Swapping...'
              : 'Swap'}
    </WalletGuardButton>
  );
};

export default SwapFormButton;
