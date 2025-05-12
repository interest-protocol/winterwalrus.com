import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useBlizzardSdk from '@/hooks/use-blizzard-sdk';
import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const SwapFormManager: FC = () => {
  const blizzardSdk = useBlizzardSdk();
  const interestStableSdk = useInterestStableSdk();
  const { control, getValues, setValue } = useFormContext();

  const coinInValue = useWatch({ control, name: 'in.valueBN' });

  useEffect(() => {
    if (!interestStableSdk || !blizzardSdk || !coinInValue) return;

    const coins = getValues(['in.type', 'out.type']);

    const pool = values(POOLS).find(({ coinTypes }) =>
      coinTypes.every((type) => coins.includes(type))
    );

    if (!pool) return;

    interestStableSdk
      .quoteSwap({
        pool: pool.objectId,
        coinInType: getValues('in.type'),
        coinOutType: getValues('out.type'),
        amountIn: BigInt(coinInValue.toFixed(0)),
      })
      .then(({ amountOut }) => {
        setValue('out.valueBN', BigNumber(String(amountOut)));
        setValue(
          'out.value',
          FixedPointMath.toNumber(BigNumber(String(amountOut)))
        );
      });
  }, [coinInValue]);

  return null;
};

export default SwapFormManager;
