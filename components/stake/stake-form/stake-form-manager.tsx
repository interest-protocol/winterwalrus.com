import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const StakeFormManager: FC = () => {
  const { fees } = useFees();
  const { nodes } = useAllowedNodes();
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue, getValues } = useFormContext();
  const validator = useReadLocalStorage(VALIDATOR_STORAGE_KEY);

  const coinOut = useWatch({ control, name: 'out.type' });
  const valueIn = useWatch({ control, name: 'in.value' });

  useEffect(() => {
    if (nodes?.some(({ id }) => id === validator))
      setValue('validator', validator);
  }, [validator]);

  useEffect(() => {
    if (!nodes) return;

    if (!nodes.length) {
      if (!getValues('validator')) return;

      setValue('validator', undefined);
      return;
    }

    const node = nodes.find(({ id }) => id === validator);

    if (node) return;

    setValue('validator', nodes[0].id);
  }, [nodes]);

  useEffect(() => {
    if (!epoch || !quotes || !fees) return;

    if (isNaN(valueIn) || !valueIn || Number(valueIn) === 0) {
      setValue('out.value', 0);
      return;
    }

    const rate = quotes.quoteLst;

    if (!rate) return;

    setValue(
      'out.value',
      FixedPointMath.toNumber(
        FixedPointMath.toBigNumber(valueIn)
          .times(1 - fees.staking / 100)
          .times(rate)
      )
    );
  }, [valueIn, epoch, quotes, coinOut, fees]);

  return null;
};

export default StakeFormManager;
