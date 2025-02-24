import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { COIN_DECIMALS } from '@/constants/ coins';
import useEpochData from '@/hooks/use-epoch-data';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { useStake } from './stake-form-button.hook';

const StakeFormButton: FC = () => {
  const stake = useStake();

  const { data } = useEpochData();

  const { getValues } = useFormContext();

  const handleStake = async () => {
    const form = getValues();

    const isAfterVote =
      data && data.currentEpoch
        ? 0.5 < 1 - data.msUntilNextEpoch / data.epochDurationMs
        : false;

    const { digest, time } = await stake({
      isAfterVote,
      coinOut: form.out.coin,
      coinValue: BigInt(
        FixedPointMath.toBigNumber(
          form.in.value,
          COIN_DECIMALS[form.in.coin]
        ).toFixed(0)
      ),
    });

    console.log({
      digest,
      time,
    });
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
