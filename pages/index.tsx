import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_LIST, INTEREST_LABS, LST_LIST } from '@/constants';
import Home from '@/views/home';

const HomePage: NextPage = () => {
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
      <SEO />
      <Home />
    </FormProvider>
  );
};

export default HomePage;
