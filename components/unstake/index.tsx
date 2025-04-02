import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { COIN_TYPES, LST_TYPES_MAP } from '@/constants';

import UnstakeDetails from './unstake-details';
import UnstakeForm from './unstake-form';

const Unstake: FC = () => {
  const { query } = useRouter();
  const lst = String(query.lst).toUpperCase();

  const form = useForm({
    defaultValues: {
      in: {
        type: LST_TYPES_MAP[lst],
        value: 0,
      },
      out: {
        type: COIN_TYPES[0],
        value: 0,
      },
    },
  });

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <UnstakeForm />
        <UnstakeDetails />
      </Div>
    </FormProvider>
  );
};

export default Unstake;
