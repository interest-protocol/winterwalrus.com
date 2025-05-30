import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { LST_TYPES_MAP } from '@/constants';

import SwapForm from './swap-form';

const Swap: FC = () => {
  const { query } = useRouter();
  const lst = String(query.lst).toUpperCase();

  const form = useForm({
    defaultValues: {
      in: {
        type: LST_TYPES_MAP[lst] ?? TYPES.WWAL,
        value: 0,
      },
      out: {
        type: TYPES.WAL,
        value: 0,
      },
    },
  });

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <SwapForm />
      </Div>
    </FormProvider>
  );
};

export default Swap;
