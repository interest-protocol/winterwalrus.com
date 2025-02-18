import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { COIN_DECIMALS } from '@/constants/ coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { useStake } from './stake-form-button.hook';

const StakeFormButton: FC = () => {
  const stake = useStake();
  const { getValues } = useFormContext();

  const handleStake = async () => {
    const form = getValues();

    const { digest, time } = await stake({
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
      px="2rem"
      m="0.2rem"
      color="#0C0F1D"
      height="2.8rem"
      textAlign="center"
      position="relative"
      borderRadius="5rem"
      onClick={handleStake}
      backdropFilter="blur(16px)"
      bg="linear-gradient(0deg, #99EFE4 15.38%, rgba(153, 239, 228, 0.50) 83.65%)"
    >
      Stake
    </Button>
  );
};

export default StakeFormButton;
