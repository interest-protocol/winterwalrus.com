import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { INTEREST_LABS } from '@/constants';

import StakeDetails from './stake-details';
import StakeForm from './stake-form';

const Stake: FC = () => {
  const form = useForm({
    defaultValues: {
      in: {
        value: 0,
        type: TYPES.WAL,
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
