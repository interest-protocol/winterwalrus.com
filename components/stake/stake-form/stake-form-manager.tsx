import { TYPES } from '@interest-protocol/blizzard-sdk';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useReadLocalStorage } from 'usehooks-ts';

import { LST_TYPES_MAP, VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';
import useEpochData from '@/hooks/use-epoch-data';
import { useFees } from '@/hooks/use-fees';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { nftTypeFromType, ZERO_BIG_NUMBER } from '@/utils';

const StakeFormManager: FC = () => {
  const { fees } = useFees();
  const { nodes } = useAllowedNodes();
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue, getValues } = useFormContext();
  const validator = useReadLocalStorage(VALIDATOR_STORAGE_KEY);

  const coinOut = useWatch({ control, name: 'out.type' });
  const valueInBN = useWatch({ control, name: 'in.valueBN' });

  const percentage = +(
    epoch && epoch.currentEpoch
      ? ((epoch.epochDurationMs - epoch.msUntilNextEpoch) * 100) /
        epoch.epochDurationMs
      : 0
  ).toFixed(2);

  useEffect(() => {
    const lstKey = (
      window.location.pathname.split('/')[1] ?? 'wwal'
    ).toUpperCase();

    const lst = LST_TYPES_MAP[lstKey] ?? TYPES.WWAL;
    const lstType = percentage < 50 ? lst : nftTypeFromType(lst);

    if (!coinOut) {
      setValue('out', { type: lstType, value: '0' });
      return;
    }

    if (coinOut === lstKey) return;

    setValue('out.type', lstType);
  }, [epoch, coinOut]);

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
  }, [nodes, coinOut]);

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

export default StakeFormManager;
