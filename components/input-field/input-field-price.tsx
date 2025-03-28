import { TYPES } from '@interest-protocol/blizzard-sdk';
import { normalizeStructTag } from '@mysten/sui/utils';
import { Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { useQuotes } from '@/hooks/use-quotes';
import { useWalPrice } from '@/hooks/use-wal-price';
import { formatDollars } from '@/utils';

import { InputFieldGenericProps } from './input-field.types';

const InputFieldPrice: FC<InputFieldGenericProps> = ({ name }) => {
  const { control } = useFormContext();
  const { data: quotes } = useQuotes();
  const { data: suiPrice } = useWalPrice();
  const type = useWatch({ control, name: `${name}.type` }) as string;
  const value = useWatch({ control, name: `${name}.value` }) as string;

  const price =
    suiPrice && quotes
      ? suiPrice *
        (normalizeStructTag(type) === TYPES.WWAL ? quotes?.quoteLst ?? 1 : 1)
      : 0;

  return (
    <Span fontFamily="JetBrains Mono">
      {formatDollars(price * Number(value), 2)}
    </Span>
  );
};

export default InputFieldPrice;
