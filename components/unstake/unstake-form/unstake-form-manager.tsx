import { TYPES } from '@interest-protocol/blizzard-sdk';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { LST_TYPES_MAP } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

const UnstakeFormManager: FC = () => {
  const { fees } = useFees();
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue } = useFormContext();

  const [coinIn, coinOut, valueInBN] = useWatch({
    control,
    name: ['in.type', 'out.type', 'in.valueBN'],
  });

  const { query } = useRouter();
  const lst = String(query.lst).toUpperCase();

  useEffect(() => {
    console.log({ fn: UnstakeFormManager.name });

    console.log({ coinIn, type: LST_TYPES_MAP[lst] });
    if (coinIn === LST_TYPES_MAP[lst]) return;

    console.log({ coinIn });
    setValue('in.type', LST_TYPES_MAP[lst]);
    console.log({ coinOut, type: TYPES.WAL });
    if (coinOut === TYPES.WAL) return;

    console.log({ coinOut });
    setValue('out.type', TYPES.WAL);
  }, [coinIn, coinOut]);

  useEffect(() => {
    if (!epoch || !quotes || !fees) return;

    if (!valueInBN || valueInBN.isZero()) {
      setValue('out.value', 0);
      setValue('out.valueBN', ZERO_BIG_NUMBER);
      return;
    }

    const rate = quotes.quoteSWal;

    if (!rate) return;

    const valueBN = valueInBN.times(1 - fees.unstaking / 100).times(rate);

    setValue('out.valueBN', valueBN);
    setValue('out.value', FixedPointMath.toNumber(valueBN));
  }, [valueInBN, epoch, quotes, coinOut]);

  return null;
};

export default UnstakeFormManager;
