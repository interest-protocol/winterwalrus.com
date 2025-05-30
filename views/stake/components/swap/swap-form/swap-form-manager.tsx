import { TYPES } from '@interest-protocol/blizzard-sdk';
import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STAKING_OBJECT } from '@/constants';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const SwapFormManager: FC = () => {
  const blizzardSdk = useBlizzardSdk();
  const { data: epoch } = useEpochData();
  const interestStableSdk = useInterestStableSdk();
  const { control, getValues, setValue } = useFormContext();

  const { fees } = useFees(getValues('in.type'));

  const [coinIn, coinOut, coinInValue] = useWatch({
    control,
    name: ['in.type', 'out.type', 'in.valueBN'],
  });

  useEffect(() => {
    if (!interestStableSdk || !coinInValue || !blizzardSdk || !epoch) return;

    const pool = values(POOLS).find(({ coinTypes }) =>
      coinTypes.every((type) => [coinIn, coinOut].includes(type))
    );

    setValue('quoting', true);

    if (pool) {
      interestStableSdk
        .quoteSwap({
          coinInType: coinIn,
          pool: pool.objectId,
          coinOutType: coinOut,
          amountIn: BigInt(coinInValue.toFixed(0)),
        })
        .then(({ amountOut }) => {
          setValue('out.valueBN', BigNumber(String(amountOut)));
          setValue('in.valueNoFeeBN', BigNumber(String(amountOut)));
          setValue(
            'out.value',
            FixedPointMath.toNumber(BigNumber(String(amountOut)))
          );
        })
        .catch()
        .finally(() => setValue('quoting', false));

      return;
    }

    if (!fees) return;

    if (coinOut === TYPES.WAL) {
      blizzardSdk
        .toWalAtEpoch({
          epoch: epoch.currentEpoch,
          blizzardStaking: STAKING_OBJECT[getValues('in.type')],
          value: coinInValue
            .times(1 - fees.transmute / 100)
            .decimalPlaces(0, 1)
            .toFixed(0),
        })
        .then(async (walAmount) => {
          if (!walAmount) return;

          await blizzardSdk
            .toLstAtEpoch({
              value: walAmount,
              epoch: epoch.currentEpoch,
              blizzardStaking: STAKING_OBJECT[TYPES.WWAL],
            })
            .then(async (wWalAmount) => {
              if (!wWalAmount) return;

              const pool = values(POOLS).find(({ coinTypes }) =>
                coinTypes.every((type) => [coinOut, TYPES.WWAL].includes(type))
              );

              if (!pool) return;

              await interestStableSdk
                .quoteSwap({
                  pool: pool.objectId,
                  coinOutType: coinOut,
                  coinInType: TYPES.WWAL,
                  amountIn: BigInt(wWalAmount),
                })
                .then(({ amountOut }) => {
                  setValue('out.valueBN', BigNumber(String(amountOut)));
                  setValue(
                    'out.value',
                    FixedPointMath.toNumber(BigNumber(String(amountOut)))
                  );
                })
                .catch();
            });

          setValue(
            'in.valueNoFeeBN',
            BigNumber(coinInValue.times(1 - fees.transmute / 100).toFixed(0))
          );
        })
        .finally(() => setValue('quoting', false));

      return;
    }

    blizzardSdk
      .toWalAtEpoch({
        epoch: epoch.currentEpoch,
        blizzardStaking: STAKING_OBJECT[getValues('in.type')],
        value: coinInValue.times(1 - fees.transmute / 100).toFixed(0),
      })
      .then(async (walAmount) => {
        if (!walAmount) return;

        await blizzardSdk
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
      })
      .finally(() => setValue('quoting', false));
  }, [coinIn, coinOut, coinInValue]);

  return null;
};

export default SwapFormManager;
