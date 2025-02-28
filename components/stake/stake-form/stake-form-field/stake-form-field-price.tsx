import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useNetwork } from '@/hooks/use-network';
import { useQuotes } from '@/hooks/use-quotes';
import { useWalPrice } from '@/hooks/use-wal-price';
import { formatDollars } from '@/utils';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldPrice: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const network = useNetwork();
  const { control } = useFormContext();
  const { data: quotes } = useQuotes();
  const { data: suiPrice } = useWalPrice();
  const coin = useWatch({ control, name: `${name}.coin` }) as string;
  const value = useWatch({ control, name: `${name}.value` }) as string;

  const price =
    suiPrice && quotes
      ? suiPrice *
        (normalizeStructTag(coin) === TYPES[network].SNOW
          ? quotes?.quoteLst ?? 1
          : 1)
      : 0;

  return (
    <Span fontFamily="JetBrains Mono">
      {formatDollars(price * Number(value), 2)}
    </Span>
  );
};

export default StakeFormFieldPrice;
