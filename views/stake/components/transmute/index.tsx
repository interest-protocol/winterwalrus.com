import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { LST_TYPES_MAP } from '@/constants';

import TransmuteDetails from './transmute-details';
import TransmuteForm from './transmute-form';

const Transmute: FC = () => {
  const { query } = useRouter();
  const lst = query.lst?.toString().toUpperCase();

  const form = useForm({
    defaultValues: {
      in: {
        type:
          !lst || LST_TYPES_MAP[lst] === TYPES.WWAL
            ? LST_TYPES_MAP.MWAL
            : LST_TYPES_MAP[lst],
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
        <TransmuteForm />
        <TransmuteDetails />
      </Div>
    </FormProvider>
  );
};

export default Transmute;
