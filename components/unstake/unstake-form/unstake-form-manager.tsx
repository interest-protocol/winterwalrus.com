import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const UnstakeFormManager: FC = () => {
  const { fees } = useFees();
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.type' });
  const valueIn = useWatch({ control, name: 'in.value' });

  useEffect(() => {
    if (!epoch || !quotes || !fees) return;

    if (isNaN(valueIn) || !valueIn || Number(valueIn) === 0) {
      setValue('out.value', 0);
      return;
    }

    const rate = quotes.quoteSWal;

    if (!rate) return;

    setValue(
      'out.value',
      FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(valueIn)
          .times(1 - fees.unstaking / 100)
          .times(rate)
      )
    );
  }, [valueIn, epoch, quotes, coinOut]);

  return null;
};

export default UnstakeFormManager;
