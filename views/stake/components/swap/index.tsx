import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { COIN_TYPES } from '@/constants';

import SwapForm from './swap-form';

const Swap: FC = () => {
  const form = useForm({
    defaultValues: {
      in: {
        type: COIN_TYPES[0],
        value: 0,
      },
      out: {
        type: TYPES.WWAL,
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
