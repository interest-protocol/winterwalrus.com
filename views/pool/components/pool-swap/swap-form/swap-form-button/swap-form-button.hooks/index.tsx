import { TYPES } from '@interest-protocol/blizzard-sdk';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { toasting } from '@/components/toast';
import { ExplorerMode, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { typeFromMaybeNftType, ZERO_BIG_NUMBER } from '@/utils';

import { useSwap } from './use-swap';

export const useSwapAction = () => {
  const swap = useSwap();
  const { data } = useEpochData();
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

      update(
        ({
          balances,
          stakingObjectIds,
          principalsByType: oldPrincipalsByType,
        }) => {
          const possiblyDeletedObjects = stakingObjectIds.filter(
            (stakingObjectId) =>
              !dryTx.objectChanges.find(
                (object) =>
                  object.type === 'deleted' &&
                  NFT_TYPES.includes(object.objectType) &&
                  object.objectId === stakingObjectId
              )
          );

          const possiblyCreatedObjects = dryTx.objectChanges.reduce(
            (acc, object) =>
              object.type === 'created' &&
              NFT_TYPES.includes(normalizeStructTag(object.objectType))
                ? [...acc, object]
                : acc,
            [] as ReadonlyArray<{ objectId: string; objectType: string }>
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
            balances: {
              ...balances,
              ...principalsByType,
              ...({
                [getValues('out.type')]: (
                  balances[getValues('out.type')] ?? ZERO_BIG_NUMBER
                ).plus(getValues('out.valueBN')),
                [getValues('in.type')]: (
                  balances[getValues('in.type')] ?? ZERO_BIG_NUMBER
                ).plus(getValues('in.valueBN')),
              } as Record<string, BigNumber>),
            },
          };
        }
      );

      reset();
    };

  const onFailure = (stopLoading: () => void) => (error?: string) => {
    stopLoading();
    toasting.error({
      action: 'Swap',
      message: error ?? 'Error executing transaction',
    });
  };

  const onStake = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;
    setLoading(true);
    const dismiss = toasting.loading({ message: 'Staking...' });

    try {
      const isAfterVote =
        data && data.currentEpoch
          ? 0.5 < 1 - data.msUntilNextEpoch / data.epochDurationMs
          : false;

      await swap({
        isAfterVote,
        coinIn: form.in.type,
        nodeId: form.validator,
        onSuccess: onSuccess(dismiss),
        onFailure: onFailure(dismiss),
        coinOut: typeFromMaybeNftType(coinOut),
        coinValue: BigInt(form.in.valueBN.toFixed(0)),
      });
    } catch (e) {
      onFailure(dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onStake, loading };
};
