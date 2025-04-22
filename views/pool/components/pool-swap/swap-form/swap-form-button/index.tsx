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

  const amountIn = useWatch({ control, name: 'in.value' });

  const insufficientBalance =
    !!Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[getValues('in.type')] ?? ZERO_BIG_NUMBER);

  const disabled = loading || insufficientBalance;

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
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientBalance ? '#FF898B' : '#99EFE4'}
    >
      {insufficientBalance
        ? 'Insufficient Balance'
        : loading
          ? 'Swapping...'
          : 'Swap'}
    </WalletGuardButton>
  );
};

export default SwapFormButton;
