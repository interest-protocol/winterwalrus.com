import BigNumber from 'bignumber.js';
import useSWR from 'swr';

import { SdkPool } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import useInterestStableSdk from '../use-interest-stable-sdk';

export const usePoolPrice = (pool?: SdkPool) => {
  const interestStableSdk = useInterestStableSdk();

  const {
    data: price,
    isLoading: loadingPrice,
    ...rest
  } = useSWR(['price', pool?.objectId, interestStableSdk], async () => {
    if (!interestStableSdk || !pool?.objectId) return;

    const { amountOut } = await interestStableSdk.quoteSwap({
      pool: pool.objectId,
      coinInType: pool.coinTypes[0],
      coinOutType: pool.coinTypes[1],
      amountIn: String(FixedPointMath.toBigNumber(1)),
    });

    return FixedPointMath.toNumber(BigNumber(String(amountOut)));
  });

  return { loadingPrice, price, ...rest };
};
