import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { normalizeStructTag } from '@mysten/sui/utils';
import { P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { path } from 'ramda';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ExplorerMode, INTEREST_LABS, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useStake } from './use-stake';

export const useStakeAction = () => {
  const stake = useStake();
  const { data } = useEpochData();
  const { update } = useAppState();
  const account = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);

  const { control, getValues, setValue } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.type' });

  const reset = () => {
    setValue('in.value', '0');
    setValue('out.value', '0');
    setValue('validator', INTEREST_LABS);
  };

  const onSuccess =
    (toastId: string) => (dryTx: DryRunTransactionBlockResponse) => {
      toast.dismiss(toastId);
      toast.success(
        <Link
          target="_blank"
          href={getExplorerUrl(
            dryTx.effects.transactionDigest,
            ExplorerMode.Transaction
          )}
        >
          <P>Staked successfully!</P>
          <P fontSize="0.875" opacity="0.75">
            See on explorer
          </P>
        </Link>
      );

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
              [normalizeStructTag(object.objectType)]:
                FixedPointMath.toBigNumber(
                  getValues(
                    coinOut === TYPES.STAKED_WAL ? 'out.value' : 'in.value'
                  )
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
            balances: dryTx.balanceChanges.reduce(
              (acc, { coinType, amount, owner }) =>
                path(['AddressOwner'], owner) === account?.address
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

  const onFailure = (toastId: string) => (error?: string) => {
    toast.dismiss(toastId);
    toast.error(error ?? 'Error executing transaction');
  };

  const onStake = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;
    setLoading(true);
    const id = toast.loading('Staking...');

    try {
      const isAfterVote =
        data && data.currentEpoch
          ? 0.5 < 1 - data.msUntilNextEpoch / data.epochDurationMs
          : false;

      await stake({
        coinOut,
        isAfterVote,
        coinIn: form.in.type,
        nodeId: form.validator,
        onSuccess: onSuccess(id),
        onFailure: onFailure(id),
        coinValue: BigInt(
          FixedPointMath.toBigNumber(form.in.value, 9).toFixed(0)
        ),
      });
    } catch (e) {
      onFailure(id)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onStake, loading };
};
