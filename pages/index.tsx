import { Network, TYPES } from '@interest-protocol/blizzard-sdk';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { INTEREST_LABS } from '@/constants';
import Home from '@/views/home';

const HomePage: NextPage = () => {
  const form = useForm({
    defaultValues: {
      in: {
        coin: TYPES[Network.Testnet].WAL,
        value: 0,
      },
      out: {
        coin: TYPES[Network.Testnet].SNOW,
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
