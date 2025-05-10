import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const TransmuteFormManager: FC = () => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();
  const { control, getValues, setValue } = useFormContext();

  const { fees } = useFees(getValues('in.type'));
  const coinInValue = useWatch({ control, name: 'in.valueBN' });

  useEffect(() => {
    if (!blizzardSdk || !coinInValue || !epoch || !fees) return;

    blizzardSdk
      .toWalAtEpoch({
        epoch: epoch.currentEpoch,
        blizzardStaking: STAKING_OBJECT[getValues('in.type')],
        value: coinInValue.times(1 - fees.transmute / 100).toFixed(0),
      })
      .then((walAmount) => {
        if (!walAmount) return;

        blizzardSdk
          .toLstAtEpoch({
            value: walAmount,
            epoch: epoch.currentEpoch,
            blizzardStaking: STAKING_OBJECT[getValues('out.type')],
          })
          .then((amountOut) => {
            setValue('out.valueBN', BigNumber(String(amountOut)));
            setValue(
              'out.value',
              FixedPointMath.toNumber(BigNumber(String(amountOut)))
            );
          });
        setValue(
          'in.valueNoFeeBN',
          BigNumber(coinInValue.times(1 - fees.transmute / 100).toFixed(0))
        );
      });
  }, [coinInValue]);

  return null;
};

export default TransmuteFormManager;
