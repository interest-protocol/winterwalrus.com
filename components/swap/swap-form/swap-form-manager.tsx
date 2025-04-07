import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

const SwapFormManager: FC = () => {
  const { fees } = useFees();
  const { nodes } = useAllowedNodes();
  const { data: quotes } = useQuotes();
  const { control, setValue, getValues } = useFormContext();
  const validator = useReadLocalStorage(VALIDATOR_STORAGE_KEY);

  const coinOut = useWatch({ control, name: 'out.type' });
  const valueInBN = useWatch({ control, name: 'in.valueBN' });

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

    const favNode = nodes.find(({ id }) => id === validator);

    if (favNode) {
      if (favNode.id === getValues('validator')) return;

      setValue('validator', favNode.id);
      return;
    }

    setValue('validator', nodes[0].id);
  }, [nodes, coinOut, validator]);

  useEffect(() => {
    if (!quotes || !fees) return;

    if (!valueInBN || valueInBN.isZero()) {
      setValue('out.value', 0);
      setValue('out.valueBN', ZERO_BIG_NUMBER);
      return;
    }

    const rate = quotes.quoteLst;

    if (!rate) return;

    const valueBN = valueInBN.times(1 - fees.staking / 100).times(rate);

    setValue('out.valueBN', valueBN);
    setValue('out.value', FixedPointMath.toNumber(valueBN));
  }, [valueInBN, quotes, coinOut, fees]);

  return null;
};

export default SwapFormManager;
