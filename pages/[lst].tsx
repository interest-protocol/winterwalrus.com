import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SEO } from '@/components';
import { COIN_TYPES, LST_TYPES_MAP } from '@/constants';
import Home from '@/views/home';

const HomePage: NextPage = () => {
  const { query } = useRouter();
  const lst = String(query.lst).toUpperCase();

  const form = useForm({
    defaultValues: {
      in: {
        type: COIN_TYPES[0],
        value: 0,
      },
      out: {
        type: LST_TYPES_MAP[lst],
        value: 0,
      },
    },
  });

  useEffect(() => {
    form.setValue('out.type', LST_TYPES_MAP[lst] ?? LST_TYPES_MAP.WWAL);
  }, [query]);

  return (
    <FormProvider {...form}>
      <SEO />
      <Home />
    </FormProvider>
  );
};

export default HomePage;
