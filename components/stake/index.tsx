import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { COIN_LIST, INTEREST_LABS, LST_LIST } from '@/constants';

import StakeDetails from './stake-details';
import StakeForm from './stake-form';

const Stake: FC = () => {
  const form = useForm({
    defaultValues: {
      in: {
        type: COIN_LIST[0].type,
        value: 0,
      },
      out: {
        type: LST_LIST[0].type,
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
