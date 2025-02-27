import { SHARED_OBJECTS, TYPES } from '@interest-protocol/blizzard-sdk';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

import { COIN_DECIMALS } from '@/constants/coins';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';
import { useNetwork } from '@/hooks/use-network';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const StakeFormManager: FC = () => {
  const network = useNetwork();
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();
  const { control, setValue, getValues } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.coin' });

  const [valueIn] = useDebounce(useWatch({ control, name: 'in.value' }), 1000);

  useEffect(() => {
    if (!epoch) return;

    if (isNaN(valueIn) || !valueIn || Number(valueIn) === 0) {
      setValue('out.value', 0);
      return;
    }

    blizzardSdk[
      coinOut === TYPES[network].WAL ? 'toWalAtEpoch' : 'toLstAtEpoch'
    ]({
      epoch: epoch.currentEpoch,
      value: BigInt(
        FixedPointMath.toBigNumber(
          valueIn,
          COIN_DECIMALS[getValues('in.coin')]
        ).toFixed(0)
      ),
      blizzardStaking: SHARED_OBJECTS.testnet.SNOW_STAKING({ mutable: true })
        .objectId,
    }).then((outValue) =>
      setValue(
        'out.value',
        FixedPointMath.toNumber(
          BigNumber(outValue ?? 0),
          COIN_DECIMALS[getValues('out.coin')]
        )
      )
    );
  }, [valueIn, epoch]);

  return null;
};

export default StakeFormManager;
