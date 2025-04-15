import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import Countdown from 'react-countdown';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';

import { useCoins } from '@/hooks/use-coins';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useUnstakeAction } from './unstake-form-button.hooks';
import UnstakeFormButtonPreview from './unstake-form-button-preview';

const UnstakeFormButton: FC = () => {
  const { fees } = useFees();
  const { coins } = useCoins();
  const form = useFormContext();
  const { data } = useEpochData();
  const { setContent } = useModal();
  const { onUnstake, loading } = useUnstakeAction();
  const percentage = +(
    data && data.currentEpoch
      ? ((data.epochDurationMs - data.msUntilNextEpoch) * 100) /
        data.epochDurationMs
      : 0
  ).toFixed(2);

  const isAfterVotes = percentage > 50;

  const { control, getValues } = form;

  const coinIn = getValues('in.type');
  const amountIn = useWatch({ control, name: 'in.value' });

  const minAmountIn = 1 + (fees?.unstaking ?? 0) / 100;

  const minMaxAmountIn = fees?.unstaking ? 1.1 : 1;

  const insufficientBalance =
    Number(amountIn) &&
    Number(amountIn) >
      FixedPointMath.toNumber(coins?.[coinIn] ?? ZERO_BIG_NUMBER);

  const insufficientAmountIn =
    coinIn && Number(amountIn) && Number(amountIn) < minAmountIn;

  const insufficientAmount = insufficientAmountIn || insufficientBalance;

  const disabled = isAfterVotes || insufficientAmount || loading;

  const handleUnstake = () =>
    setContent(
      <FormProvider {...form}>
        <UnstakeFormButtonPreview onProceed={onUnstake} />
      </FormProvider>,
      {
        title: 'Preview Unstake',
      }
    );

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
      onClick={disabled ? undefined : handleUnstake}
      bg={insufficientAmount ? '#FF898B' : '#99EFE4'}
    >
      {isAfterVotes ? (
        <>
          Unavailable until{' '}
          <Countdown date={Date.now() + (data?.msUntilNextEpoch ?? 0)} />
        </>
      ) : insufficientAmountIn ? (
        `You must unstake at least ${minMaxAmountIn}`
      ) : insufficientBalance ? (
        'Insufficient Balance'
      ) : loading ? (
        'Unstaking...'
      ) : (
        'Unstake'
      )}
    </Button>
  );
};

export default UnstakeFormButton;
