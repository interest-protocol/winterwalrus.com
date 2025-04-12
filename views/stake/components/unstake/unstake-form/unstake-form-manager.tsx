import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

const UnstakeFormManager: FC = () => {
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue, getValues } = useFormContext();
  const { fees } = useFees(getValues('in.type'));

  const [coinOut, valueInBN] = useWatch({
    control,
    name: ['out.type', 'in.valueBN'],
  });

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
