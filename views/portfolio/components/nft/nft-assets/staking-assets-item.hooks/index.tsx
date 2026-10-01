import { useCurrentAccount } from '@mysten/dapp-kit-react';
import { normalizeStructTag } from '@mysten/sui/utils';
import BigNumber from 'bignumber.js';
import { useState } from 'react';

import { toasting } from '@/components/toast';
import { ExplorerMode, NFT_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { StakingObject } from '@/interface';
import { TYPES } from '@/lib/blizzard';
import { ZERO_BIG_NUMBER } from '@/utils';
import { TxResult } from '@/utils/utils.types';

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

  const account = useCurrentAccount();
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
    (action: string, stopLoading: () => void) => (txResult: TxResult) => {
      stopLoading();
      toasting.success({
        action,
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
            ({ objectType }) =>
              NFT_TYPES.includes(normalizeStructTag(objectType))
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
              txResult.balanceChanges.reduce(
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
