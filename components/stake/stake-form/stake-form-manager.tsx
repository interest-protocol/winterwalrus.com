import { SHARED_OBJECTS } from '@interest-protocol/blizzard-sdk';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { COIN_DECIMALS } from '@/constants/ coins';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';

const StakeFormManager: FC = () => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();
  const { control, setValue, getValues } = useFormContext();

  const [valueIn] = useDebounce(
    useWatch({
      control,
      name: 'in.value',
    }),
    1000
  );

  useEffect(() => {
    if (!epoch) return;

    if (isNaN(valueIn) || !valueIn || Number(valueIn) === 0) {
      setValue('out.value', 0);
      return;
    }

    blizzardSdk
      .toLstAtEpoch({
        epoch: epoch.currentEpoch,
        value: BigInt(valueIn * 10 ** COIN_DECIMALS[getValues('in.coin')]),
        blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({ mutable: true })
          .objectId,
      })
      .then((outValue) =>
        setValue(
          'out.value',
          Number(outValue) / 10 ** COIN_DECIMALS[getValues('out.coin')]
        )
      );
  }, [valueIn, epoch]);

  return null;
};

export default StakeFormManager;
