import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { COIN_TYPES, INTEREST_LABS } from '@/constants';

import StakeDetails from './stake-details';
import StakeForm from './stake-form';

const Stake: FC = () => {
  const form = useForm({
    defaultValues: {
      in: {
        type: COIN_TYPES[0],
        value: 0,
      },
      validator: INTEREST_LABS,
    },
  });

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <StakeForm />
        <StakeDetails />
      </Div>
    </FormProvider>
  );
};

export default Stake;
