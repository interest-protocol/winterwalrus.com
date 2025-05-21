import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import WalletGuardButton from '@/components/wallet-button/wallet-guard-button';
import { useCoins } from '@/hooks/use-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useTransmuteAction } from './transmute-form-button.hooks';

const TransmuteFormButton: FC = () => {
  const { coins } = useCoins();
  const { control, getValues } = useFormContext();
  const { onTransmute, loading } = useTransmuteAction();

  const amountIn = useWatch({ control, name: 'in.value' });

  const minMaxAmountIn = 1.1;

  const insufficientAmountIn =
    !!Number(amountIn) && Number(amountIn) < minMaxAmountIn;

  const insufficientBalance =
    !!Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[getValues('in.type')] ?? ZERO_BIG_NUMBER);

  const disabled = loading || insufficientAmountIn || insufficientBalance;

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
      onClick={disabled ? undefined : onTransmute}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      bg={insufficientBalance ? '#FF898B' : disabled ? '#EE2B5B80' : '#EE2B5B'}
      nHover={
        !disabled && {
          bg: '#74D5C9',
        }
      }
    >
      {insufficientBalance
        ? 'Insufficient Balance'
        : loading
          ? 'Transmuting...'
          : insufficientAmountIn
            ? `You must transmute at least ${minMaxAmountIn}`
            : 'Transmute'}
    </WalletGuardButton>
  );
};

export default TransmuteFormButton;
