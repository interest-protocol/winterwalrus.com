import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import BigNumber from 'bignumber.js';
import { isNil } from 'ramda';
import { useFormContext } from 'react-hook-form';

import { toasting } from '@/components/toast';
import { ExplorerMode } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { ZERO_BIG_NUMBER } from '@/utils';

import { usePoolData } from '../../../pool-stats/pool-stats.hook';
import { IPoolForm } from '../../pool-form.types';
import { useAddLiquidity } from './use-add-liquidity';
import { useRemoveLiquidity } from './use-remove-liquidity';

export const useLiquidity = () => {
  const { update } = useAppState();
  const addLiquidity = useAddLiquidity();
  const getExplorerUrl = useGetExplorerUrl();
  const removeLiquidity = useRemoveLiquidity();
  const { getValues, setValue } = useFormContext<IPoolForm>();
  const { mutate } = usePoolData(getValues('pool.id'));

  const reset = () => {
    setValue('pool.value', '0');
    setValue('pool.valueBN', ZERO_BIG_NUMBER);
    setValue(
      'coins',
      getValues('coins').map((coin) => ({
        ...coin,
        valueBN: ZERO_BIG_NUMBER,
        value: '0',
      }))
    );
  };

  const onAddFailure = (stopLoading: () => void) => (error?: string) => {
    stopLoading();
    toasting.error({
      action: 'Add Liquidity',
      message: error ?? 'Error executing transaction',
    });
  };

  const onAddSuccess =
    (stopLoading: () => void) => (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action: 'Liquidity Added',
        message: 'See on explorer',
        link: getExplorerUrl(
          dryTx.effects.transactionDigest,
          ExplorerMode.Transaction
        ),
      });
      mutate();

      update(({ balances }) => ({
        balances: (
          getValues('coins') as ReadonlyArray<{
            type: string;
            valueBN: BigNumber;
          }>
        ).reduce(
          (acc, { type, valueBN }) => ({
            ...acc,
            [type]: balances[type].minus(valueBN),
          }),
          {
            ...balances,
            [getValues('pool.type')]: (
              balances[getValues('pool.type')] ?? ZERO_BIG_NUMBER
            ).plus(getValues('pool.valueBN')),
          }
        ),
      }));

      reset();
    };

  const onRemoveFailure = (stopLoading: () => void) => (error?: string) => {
    stopLoading();
    reset();
    toasting.error({
      action: 'Remove Liquidity',
      message: error ?? 'Error executing transaction',
    });
  };

  const onRemoveSuccess =
    (stopLoading: () => void) => (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action: 'Liquidity Removed',
        message: 'See on explorer',
        link: getExplorerUrl(
          dryTx.effects.transactionDigest,
          ExplorerMode.Transaction
        ),
      });
      mutate();

      update(({ balances }) => ({
        balances: (
          getValues('coins') as ReadonlyArray<{
            type: string;
            valueBN: BigNumber;
          }>
        ).reduce(
          (acc, { type, valueBN }) => ({
            ...acc,
            [type]: balances[type].plus(valueBN),
          }),
          {
            ...balances,
            [getValues('pool.type')]: (
              balances[getValues('pool.type')] ?? ZERO_BIG_NUMBER
            ).minus(getValues('pool.valueBN')),
          }
        ),
      }));

      reset();
    };

  const handleAddLiquidity = async () => {
    const dismiss = toasting.loading({ message: 'Adding Liquidity...' });
    try {
      await addLiquidity({
        onSuccess: onAddSuccess(dismiss),
        onFailure: onAddFailure(dismiss),
        poolId: getValues('pool.id'),
        coins: getValues('coins').map((coin) => ({
          type: coin.type,
          balance: BigInt(coin.valueBN.toFixed(0)),
        })),
      });
    } catch (e) {
      onAddFailure(dismiss)((e as Error).message);
    }
  };

  const handleRemoveLiquidity = async () => {
    const dismiss = toasting.loading({ message: 'Removing Liquidity...' });

    const selectedCoinIndex = getValues('selectedCoinIndex');
    const selectedCoinType = !isNil(selectedCoinIndex)
      ? getValues(`coins.${selectedCoinIndex}.type`)
      : null;

    try {
      await removeLiquidity({
        pool: getValues('pool.id'),
        coinType: selectedCoinType,
        lpType: getValues('pool.type'),
        onSuccess: onRemoveSuccess(dismiss),
        onFailure: onRemoveFailure(dismiss),
        coinsLength: getValues('coins').length,
        lpAmount: BigInt(getValues('pool.valueBN').toFixed(0)),
      });
    } catch (e) {
      onRemoveFailure(dismiss)((e as Error).message);
    }
  };

  return {
    addLiquidity: handleAddLiquidity,
    removeLiquidity: handleRemoveLiquidity,
  };
};
