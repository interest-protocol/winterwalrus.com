import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { path } from 'ramda';
import { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { toasting } from '@/components/toast';
import { ExplorerMode, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { ZERO_BIG_NUMBER } from '@/utils';

import { useLSTNFTsUnstake } from './use-lst-nfts-unstake';

export const useLSTNFTsUnstakeAction = () => {
  const unstake = useLSTNFTsUnstake();
  const { update } = useAppState();
  const account = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);
  const { control, getValues } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.type' });

  const onSuccess =
    (stopLoading: () => void) => (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action: 'Unstake',
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
        coinOutValue: BigInt(form.out.valueBN.toFixed(0)),
      });
    } catch (e) {
      onFailure(dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onUnstake, loading };
};
