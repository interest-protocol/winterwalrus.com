import { TYPES } from '@interest-protocol/blizzard-sdk';
import { DryRunTransactionBlockResponse } from '@mysten/sui/client';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { path } from 'ramda';
import { useMemo, useState } from 'react';

import { toasting } from '@/components/toast';
import { ExplorerMode, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { StakingObject } from '@/interface';
import { ZERO_BIG_NUMBER } from '@/utils';

import { StakingAssetsItemModal } from '../staking-assets-item-modals';
import { useBurn } from './use-burn';
import { useUnstake } from './use-unstake';

export const useStakingAction = (
  stakingObject: StakingObject | null | undefined,
  isActivated: (epoch: number) => boolean,
  canWithdrawEarly?: boolean
) => {
  const burn = useBurn();
  const unstake = useUnstake();
  const { update } = useAppState();
  const { setContent } = useModal();

  const account = useMemo(
    () => ({
      address:
        '0xc23ea8e493616b1510d9405ce05593f8bd1fb30f44f92303ab2c54f6c8680ecb',
    }),
    []
  );
  const getExplorerUrl = useGetExplorerUrl();
  const [loading, setLoading] = useState(false);

  if (!stakingObject)
    return {
      loading,
      onBurn: () => {},
    };

  const {
    lst,
    type,
    state,
    objectId,
    principal,
    withdrawEpoch,
    activationEpoch,
  } = stakingObject;

  const onSuccess =
    (action: string, stopLoading: () => void) =>
    (dryTx: DryRunTransactionBlockResponse) => {
      stopLoading();
      toasting.success({
        action,
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
            balances:
              dryTx.balanceChanges.reduce(
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
              ) ?? balances,
          };
        }
      );
    };

  const onFailure =
    (action: string, stopLoading: () => void) => (error?: string) => {
      stopLoading();
      toasting.error({
        action,
        message: error ?? 'Error executing transaction',
      });
    };

  const onUnstake = async () => {
    setLoading(true);
    const dismiss = toasting.loading({
      message:
        state === 'Staked' && !canWithdrawEarly ? 'Unstaking' : 'Withdrawing',
    });

    try {
      await unstake({
        objectId,
        canWithdrawEarly,
        onSuccess: onSuccess(
          state === 'Staked' && !canWithdrawEarly ? 'Unstake' : 'Withdraw',
          dismiss
        ),
        onFailure: onFailure(
          state === 'Staked' && !canWithdrawEarly ? 'Unstake' : 'Withdraw',
          dismiss
        ),
      });
    } catch (e) {
      onFailure(
        state === 'Staked' && !canWithdrawEarly ? 'Unstake' : 'Withdraw',
        dismiss
      )((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onGetLST = async () => {
    setLoading(true);
    const dismiss = toasting.loading({
      message: 'Getting LST...',
    });

    try {
      await burn({
        lst,
        objectId,
        onSuccess: onSuccess('Get LST', dismiss),
        onFailure: onFailure('Get LST', dismiss),
      });
    } catch (e) {
      onFailure('Get LST', dismiss)((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const onBurn = async () => {
    if (!isActivated(withdrawEpoch ?? activationEpoch)) return;

    if (type === TYPES.STAKED_WAL) {
      return setContent(
        <StakingAssetsItemModal
          onClick={onUnstake}
          mode={
            state === 'Staked' && !canWithdrawEarly ? 'unstake' : 'withdraw'
          }
        />,
        {
          title:
            state === 'Staked' && !canWithdrawEarly
              ? 'Unstaking'
              : 'Withdrawal',
        }
      );
    }

    await onGetLST();
  };

  return { onBurn, onUnstake, loading };
};
