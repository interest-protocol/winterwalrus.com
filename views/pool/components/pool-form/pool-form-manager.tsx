import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import BigNumber from 'bignumber.js';
import { useRouter } from 'next/router';
import { isNil } from 'ramda';
import { FC, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useSWR from 'swr';

import useInterestStableSdk from '@/hooks/use-interest-stable-sdk';
import { useTabState } from '@/hooks/use-tab-manager';
import { SdkPool } from '@/interface';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { IPoolForm } from './pool-form.types';

const PoolFormManager: FC = () => {
  const { tab } = useTabState();
  const { query } = useRouter();
  const interestStableSdk = useInterestStableSdk();
  const { control, setValue } = useFormContext<IPoolForm>();

  const [coins, lpCoinValue, selectedCoinIndex] = useWatch({
    control,
    name: ['coins', 'pool.valueBN', 'selectedCoinIndex'],
  });
  const pool = useMemo(
    () => (POOLS as Record<string, SdkPool>)[String(query.pool)],
    [query.pool]
  );

  useSWR([pool], () => {
    if (!pool) return;

    setValue(
      'coins',
      pool.coinTypes.map((type) => ({
        type,
        value: '0',
        valueBN: ZERO_BIG_NUMBER,
      }))
    );
    setValue('pool', {
      id: pool.objectId,
      type: pool.lpCoinType,
      value: '0',
      valueBN: ZERO_BIG_NUMBER,
    });
  });

  useSWR([coins], () => {
    if (!pool || !interestStableSdk || tab || !coins.length) return;

    if (!coins?.some((coin) => Number(coin?.value))) {
      setValue('pool.valueBN', ZERO_BIG_NUMBER);
      setValue('pool.value', '0');
      return;
    }

    setValue('quoting', true);

    interestStableSdk
      .quoteAddLiquidity({
        pool: pool.objectId,
        amountsIn: coins.map(({ valueBN }: { valueBN: BigNumber }) =>
          BigInt(valueBN.toFixed(0))
        ),
      })
      .then((amount) => {
        setValue('pool.valueBN', BigNumber(String(amount)));
        setValue(
          'pool.value',
          String(FixedPointMath.toNumber(BigNumber(String(amount))))
        );
      })
      .finally(() => {
        setValue('quoting', false);
      });
  });

  useSWR([lpCoinValue, selectedCoinIndex], () => {
    if (!pool || !interestStableSdk || !tab) return;

    if (!lpCoinValue || lpCoinValue?.isZero()) {
      setValue(
        'coins',
        coins.map((coin) => ({
          ...coin,
          value: '0',
          valueBN: ZERO_BIG_NUMBER,
        }))
      );
      return;
    }

    setValue('quoting', true);

    if (isNil(selectedCoinIndex)) {
      interestStableSdk
        ?.quoteRemoveLiquidity({
          pool: pool.objectId,
          lpCoinAmount: BigInt(lpCoinValue.toFixed(0)),
        })
        .then((amounts: ReadonlyArray<bigint>) => {
          coins.forEach((_, index) => {
            setValue(
              `coins.${index}.valueBN`,
              BigNumber(String(amounts[index]))
            );
            setValue(
              `coins.${index}.value`,
              String(FixedPointMath.toNumber(BigNumber(String(amounts[index]))))
            );
          });
        })
        .finally(() => {
          setValue('quoting', false);
        });
    } else
      interestStableSdk
        ?.quoteRemoveLiquidityOneCoin({
          pool: pool.objectId,
          coinOutType: coins[selectedCoinIndex].type,
          lpCoinAmount: BigInt(lpCoinValue.toFixed(0)),
        })
        .then(({ amountOut }) => {
          setValue(
            `coins.${selectedCoinIndex}.valueBN`,
            BigNumber(String(amountOut))
          );
          setValue(
            `coins.${selectedCoinIndex}.value`,
            String(FixedPointMath.toNumber(BigNumber(String(amountOut))))
          );
        })
        .finally(() => {
          setValue('quoting', false);
        });
  });

  return null;
};

export default PoolFormManager;
