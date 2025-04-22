import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { toasting } from '@/components/toast';
import { ExplorerMode } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { typeFromMaybeNftType, ZERO_BIG_NUMBER } from '@/utils';

import { useSwap } from './use-swap';

export const useSwapAction = () => {
  const swap = useSwap();
  const { update } = useAppState();
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);
  const { control, getValues, setValue } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.type' });

  const reset = () => {
    setValue('in.value', '0');
    setValue('out.value', '0');
    setValue('in.valueBN', ZERO_BIG_NUMBER);
    setValue('out.valueBN', ZERO_BIG_NUMBER);
  };

  const onSuccess =
    (stopLoading: () => void) => (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action: 'Swapped',
        message: 'See on explorer',
        link: getExplorerUrl(
          dryTx.effects.transactionDigest,
          ExplorerMode.Transaction
        ),
      });

      update(({ balances }) => ({
        balances: {
          ...balances,
          [getValues('out.type')]: (
            balances[getValues('out.type')] ?? ZERO_BIG_NUMBER
          ).plus(getValues('out.valueBN')),
          [getValues('in.type')]: (
            balances[getValues('in.type')] ?? ZERO_BIG_NUMBER
          ).minus(getValues('out.valueBN')),
        },
      }));

      reset();
    };

  const onFailureSwap = (stopLoading: () => void) => (error?: string) => {
    stopLoading();
    toasting.error({
      action: 'Swap',
      message: error ?? 'Error executing transaction',
    });
  };

  const onSwap = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;
    setLoading(true);
    const dismiss = toasting.loading({ message: 'Swapping...' });

    try {
      await swap({
        coinInType: form.in.type,
        onSuccess: onSuccess(dismiss),
        onFailure: onFailureSwap(dismiss),
        coinOutType: typeFromMaybeNftType(coinOut),
        coinInValue: BigInt(form.in.valueBN.toFixed(0)),
        coinOutValue: BigInt(form.out.valueBN.toFixed(0)),
      });
    } catch (e) {
      onFailureSwap(dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onSwap, loading };
};
