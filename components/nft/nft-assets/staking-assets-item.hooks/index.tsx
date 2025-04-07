import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { path } from 'ramda';
import { useState } from 'react';

import { toasting } from '@/components/toast';
import { ExplorerMode, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { StakingObject } from '@/interface';
import { ZERO_BIG_NUMBER } from '@/utils';

import {
  StakingAssetsItemUnstakeModal,
  StakingAssetsItemWithdrawModal,
} from '../staking-assets-item-modals';
import { useBurn } from './use-burn';

export const useStakingAction = (
  stakingObject: StakingObject | null | undefined,
  isActivated: (epoch: number) => boolean
) => {
  const burn = useBurn();
  const { update } = useAppState();
  const { setContent } = useModal();
  const account = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);

  if (!stakingObject)
    return {
      loading,
      onBurn: () => {},
    };

  const { type, state, objectId, principal, withdrawEpoch, activationEpoch } =
    stakingObject;

  const onSuccess =
    (stopLoading: () => void) => (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action: 'Withdraw',
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
              [normalizeStructTag(object.objectType)]: BigNumber(
                principal
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
      action: 'Withdraw',
      message: error ?? 'Error executing transaction',
    });
  };

  const onBurn = async () => {
    if (!isActivated(withdrawEpoch ?? activationEpoch)) return;

    if (type === TYPES.STAKED_WAL) {
      if (state === 'Staked')
        setContent(<StakingAssetsItemUnstakeModal />, {
          overlayProps: {
            alignItems: ['flex-end', 'center'],
          },
          containerProps: {
            display: 'flex',
            maxHeight: '90vh',
            maxWidth: ['100vw', '95vw'],
          },
        });
      else
        setContent(<StakingAssetsItemWithdrawModal />, {
          overlayProps: {
            alignItems: ['flex-end', 'center'],
          },
          containerProps: {
            display: 'flex',
            maxHeight: '90vh',
            maxWidth: ['100vw', '95vw'],
          },
        });
      return;
    }
    setLoading(true);
    const dismiss = toasting.loading({
      message: 'Withdrawing LST...',
    });

    try {
      await burn({
        objectId,
        onSuccess: onSuccess(dismiss),
        onFailure: onFailure(dismiss),
      });
    } catch (e) {
      onFailure(dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { onBurn, loading };
};
