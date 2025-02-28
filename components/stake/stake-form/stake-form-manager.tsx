import { TYPES } from '@interest-protocol/blizzard-sdk';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import useEpochData from '@/hooks/use-epoch-data';
import { useNetwork } from '@/hooks/use-network';
import { useQuotes } from '@/hooks/use-quotes';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

const StakeFormManager: FC = () => {
  const network = useNetwork();
  const { data: quotes } = useQuotes();
  const { data: epoch } = useEpochData();
  const { control, setValue } = useFormContext();

  const coinOut = useWatch({ control, name: 'out.coin' });
  const valueIn = useWatch({ control, name: 'in.value' });

  useEffect(() => {
    if (!epoch || !quotes) return;

    if (isNaN(valueIn) || !valueIn || Number(valueIn) === 0) {
      setValue('out.value', 0);
      return;
    }

    const rate =
      quotes[coinOut === TYPES[network].STAKED_WAL ? 'quoteSWal' : 'quoteLst'];

    if (!rate) return;

    setValue(
      'out.value',
      FixedPointMath.toNumber(FixedPointMath.toBigNumber(valueIn).times(rate))
    );
  }, [valueIn, epoch, quotes, coinOut]);

  return null;
};

export default StakeFormManager;
