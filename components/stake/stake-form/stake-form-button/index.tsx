import { TYPES } from '@interest-protocol/blizzard-sdk';
import { A, Button, P } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ExplorerMode, INTEREST_LABS } from '@/constants';
import { COIN_DECIMALS } from '@/constants/coins';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { useStake, useUnstake } from './stake-form-button.hooks';

const StakeFormButton: FC = () => {
  const stake = useStake();
  const unstake = useUnstake();
  const network = useNetwork();
  const { data } = useEpochData();
  const getExplorerUrl = useGetExplorerUrl();
  const { control, getValues, setValue } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.coin' });

  const reset = () => {
    setValue('in.value', '0');
    setValue('out.value', '0');
    setValue('validator', INTEREST_LABS);
  };

  const onSuccess = (toastId: string) => () => {
    toast.dismiss(toastId);
    toast.success(
      coinOut === TYPES[network].STAKED_WAL
        ? 'Unstaked successfully'
        : 'Staked successfully!'
    );
    reset();
  };

  const onFailure = (toastId: string) => (error?: string) => {
    toast.dismiss(toastId);
    toast.error(error ?? 'Error executing transaction');
  };

  const handleStake = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;

    const id = toast.loading('Staking...');

    try {
      const isAfterVote =
        data && data.currentEpoch
          ? 0.5 < 1 - data.msUntilNextEpoch / data.epochDurationMs
          : false;

      const { digest, time } = await stake({
        coinOut,
        isAfterVote,
        coinIn: form.in.coin,
        nodeId: form.validator,
        onSuccess: onSuccess(id),
        onFailure: onFailure(id),
        coinValue: BigInt(
          FixedPointMath.toBigNumber(
            form.in.value,
            COIN_DECIMALS[form.in.coin]
          ).toFixed(0)
        ),
      });

      toast(
        <A
          target="_blank"
          href={getExplorerUrl(digest, ExplorerMode.Transaction)}
        >
          <P>Transaction executed in {time / 1000}s</P>
          <P fontSize="0.875rem" opacity="0.75">
            See on Explorer
          </P>
        </A>
      );
    } catch (e) {
      onFailure(id)((e as Error).message);
    }
  };

  const handleUnstake = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;

    const id = toast.loading('Unstaking...');

    try {
      const { digest, time } = await unstake({
        coinIn: form.in.coin,
        onSuccess: onSuccess(id),
        onFailure: onFailure(id),
        coinValue: BigInt(
          FixedPointMath.toBigNumber(
            form.in.value,
            COIN_DECIMALS[form.in.coin]
          ).toFixed(0)
        ),
      });

      toast(
        <A
          target="_blank"
          href={getExplorerUrl(digest, ExplorerMode.Transaction)}
        >
          <P>Transaction executed in {time / 1000}s</P>
          <P fontSize="0.875rem" opacity="0.75">
            See on Explorer
          </P>
        </A>
      );
    } catch (e) {
      onFailure(id)((e as Error).message);
    }
  };

  return (
    <Button
      all="unset"
      py="1rem"
      px="1.5rem"
      bg="#99EFE4"
      color="#0C0F1D"
      cursor="pointer"
      fontWeight="500"
      textAlign="center"
      position="relative"
      borderRadius="0.625rem"
      onClick={
        coinOut === TYPES[network].STAKED_WAL ? handleUnstake : handleStake
      }
    >
      {coinOut === TYPES[network].STAKED_WAL ? 'Unstake' : 'Stake'}
    </Button>
  );
};

export default StakeFormButton;
