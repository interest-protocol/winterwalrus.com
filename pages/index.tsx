import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_TYPES, INTEREST_LABS, LST_TYPES } from '@/constants';
import Home from '@/views/home';

const HomePage: NextPage = () => {
  const form = useForm({
    defaultValues: {
      in: {
        type: COIN_TYPES[0],
        value: 0,
      },
      out: {
        type: LST_TYPES[0],
        value: 0,
      },
      validator: INTEREST_LABS,
    },
  });

  return (
    <FormProvider {...form}>
      <SEO />
      <Home />
    </FormProvider>
  );
};

export default HomePage;
