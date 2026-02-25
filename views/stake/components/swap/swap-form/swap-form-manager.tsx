import { TYPES } from '@interest-protocol/blizzard-sdk';
import BigNumber from 'bignumber.js';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { STAKING_OBJECT } from '@/constants';
import useAftermathSdk from '@/hooks/use-aftermath-sdk';
import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const SwapFormManager: FC = () => {
  const blizzardSdk = useBlizzardSdk();
  const aftermathSdk = useAftermathSdk();
  const { data: epoch } = useEpochData();
  const { control, getValues, setValue } = useFormContext();

  const { fees } = useFees(getValues('in.type'));

  const [coinIn, coinOut, coinInValue] = useWatch({
    control,
    name: ['in.type', 'out.type', 'in.valueBN'],
  });

  useEffect(() => {
    if (!aftermathSdk || !coinInValue || !blizzardSdk || !epoch) return;

    const needsTransmute = coinIn !== TYPES.WAL && coinIn !== TYPES.WWAL;

    setValue('quoting', true);

    if (!needsTransmute) {
      // Path 1: Direct swap (WAL↔WWAL) via Aftermath Router
      const router = aftermathSdk.Router();

      router
        .getCompleteTradeRouteGivenAmountIn({
          coinInType: coinIn,
          coinOutType: coinOut,
          coinInAmount: BigInt(coinInValue.toFixed(0)),
        })
        .then((route) => {
          setValue('out.valueBN', BigNumber(String(route.coinOut.amount)));
          setValue('in.valueNoFeeBN', coinInValue);
          setValue(
            'out.value',
            FixedPointMath.toNumber(BigNumber(String(route.coinOut.amount)))
          );
        })
        .catch()
        .finally(() => setValue('quoting', false));

      return;
    }

    if (!fees) return;

    if (coinOut === TYPES.WAL) {
      // Path 2: LST→WAL (transmute to wWAL, then Aftermath Router wWAL→WAL)
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

          const wWalAmount = await blizzardSdk.toLstAtEpoch({
            value: walAmount,
            epoch: epoch.currentEpoch,
            blizzardStaking: STAKING_OBJECT[TYPES.WWAL],
          });

          if (!wWalAmount) return;

          const router = aftermathSdk.Router();

          await router
            .getCompleteTradeRouteGivenAmountIn({
              coinInType: TYPES.WWAL,
              coinOutType: TYPES.WAL,
              coinInAmount: BigInt(wWalAmount),
            })
            .then((route) => {
              setValue('out.valueBN', BigNumber(String(route.coinOut.amount)));
              setValue(
                'out.value',
                FixedPointMath.toNumber(BigNumber(String(route.coinOut.amount)))
              );
            })
            .catch();

          setValue(
            'in.valueNoFeeBN',
            BigNumber(coinInValue.times(1 - fees.transmute / 100).toFixed(0))
          );
        })
        .finally(() => setValue('quoting', false));

      return;
    }

    // Path 3: LST→WWAL (transmute only, no AMM)
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
