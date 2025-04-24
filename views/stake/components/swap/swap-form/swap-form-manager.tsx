import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import BigNumber from 'bignumber.js';
import { values } from 'ramda';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const SwapFormManager: FC = () => {
  const interestStableSdk = useInterestStableSdk();
  const { control, getValues, setValue } = useFormContext();

  const coinInValue = useWatch({ control, name: 'in.valueBN' });

  useEffect(() => {
    if (!interestStableSdk || !coinInValue) return;

    const coins = getValues(['in.type', 'out.type']);

    const pool = values(POOLS).find(({ coinTypes }) =>
      coinTypes.every((type) => coins.includes(type))
    );

    if (!pool || !interestStableSdk['quoteSwap']) return;

    interestStableSdk
      .quoteSwap({
        pool: pool.objectId,
        coinInType: getValues('in.type'),
        coinOutType: getValues('out.type'),
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
      .catch();

    return;
  }, [coinInValue]);

  return null;
};

export default SwapFormManager;
