import { A, Button, P } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

import { ExplorerMode } from '@/constants';
import { COIN_DECIMALS } from '@/constants/coins';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { useStake } from './stake-form-button.hook';

const StakeFormButton: FC = () => {
  const stake = useStake();
  const { data } = useEpochData();
  const getExplorerUrl = useGetExplorerUrl();

  const { getValues } = useFormContext();

  const onSuccess = (toastId: string) => () => {
    toast.dismiss(toastId);
    toast.success('Dry executed!');
  };

  const onFailure = (toastId: string) => (error?: string) => {
    toast.dismiss(toastId);
    toast.error(error ?? 'Error on execute transaction');
  };

  const handleStake = async () => {
    const form = getValues();

    if (!form.in.value || !form.out.value) return;

    const id = toast.loading('Executing');

    try {
      const isAfterVote =
        data && data.currentEpoch
          ? 0.5 < 1 - data.msUntilNextEpoch / data.epochDurationMs
          : false;

      const { digest, time } = await stake({
        isAfterVote,
        coinIn: form.in.coin,
        nodeId: form.validator,
        coinOut: form.out.coin,
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
      onFailure((e as Error).message);
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
      onClick={handleStake}
      borderRadius="0.625rem"
    >
      Stake
    </Button>
  );
};

export default StakeFormButton;
