import { useCurrentAccount } from '@mysten/dapp-kit-react';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { toasting } from '@/components/toast';
import { ExplorerMode, INTEREST_LABS, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { TYPES } from '@/lib/blizzard';
import { ZERO_BIG_NUMBER } from '@/utils';
import { TxResult } from '@/utils/utils.types';

import { useUnstake } from './use-unstake';

export const useUnstakeAction = () => {
  const unstake = useUnstake();
  const { update } = useAppState();
  const account = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);
  const { control, getValues, setValue } = useFormContext();
  const coinOut = useWatch({ control, name: 'out.type' });

  const reset = () => {
    setValue('in.value', '0');
    setValue('out.value', '0');
    setValue('in.valueBN', ZERO_BIG_NUMBER);
    setValue('out.valueBN', ZERO_BIG_NUMBER);
    setValue('validator', INTEREST_LABS);
  };

  const onSuccess = (stopLoading: () => void) => (txResult: TxResult) => {
    stopLoading();
    toasting.success({
      action: 'Unstake',
      message: 'See on explorer',
      link: getExplorerUrl(txResult.digest, ExplorerMode.Transaction),
    });

    update(
      ({
        balances,
        stakingObjectIds,
        principalsByType: oldPrincipalsByType,
      }) => {
        const possiblyDeletedObjects = stakingObjectIds.filter(
          (stakingObjectId) =>
            !txResult.deletedObjectIds.includes(stakingObjectId)
        );

        const possiblyCreatedObjects = txResult.createdObjects.filter(
          ({ objectType }) => NFT_TYPES.includes(normalizeStructTag(objectType))
        );

        const principalsByType = possiblyCreatedObjects.reduce(
          (acc, object) => ({
            ...acc,
            [normalizeStructTag(object.objectType)]: getValues(
              coinOut === TYPES.STAKED_WAL ? 'out.valueBN' : 'in.valueBN'
            ).plus(
              acc[normalizeStructTag(object.objectType)] ?? ZERO_BIG_NUMBER
            ),
          }),
          oldPrincipalsByType
        );

        return {
          principalsByType,
          stakingObjectIds: [
            ...possiblyDeletedObjects,
            ...possiblyCreatedObjects.map(({ objectId }) => objectId),
          ],
          balances: txResult.balanceChanges.reduce(
            (acc, { coinType, amount, address }) =>
              address === account?.address
                ? {
                    ...acc,
                    [normalizeStructTag(coinType)]: BigNumber(amount).plus(
                      acc[coinType] ?? ZERO_BIG_NUMBER
                    ),
                  }
                : acc,
            { ...balances, ...principalsByType }
          ),
        };
      }
    );

    reset();
  };

  const onFailure = (stopLoading: () => void) => (error?: string) => {
    stopLoading();
    toasting.error({
      action: 'Unstake',
      message: error ?? 'Error executing transaction',
    });
  };

  const onUnstake = async () => {
    const form = getValues();

    if (
      !form.in.valueBN ||
      form.in.valueBN.isZero() ||
      !form.out.valueBN ||
      form.out.valueBN.isZero()
    )
      return;
    setLoading(true);
    const dismiss = toasting.loading({ message: 'Unstaking...' });

    try {
      await unstake({
        coinIn: form.in.type,
        onSuccess: onSuccess(dismiss),
        onFailure: onFailure(dismiss),
        coinInValue: BigInt(form.in.valueBN.toFixed(0)),
        coinOutValue: BigInt(form.in.valueNoFeeBN.toFixed(0)),
      });
    } catch (e) {
      onFailure(dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onUnstake, loading };
};
