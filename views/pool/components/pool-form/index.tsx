import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div } from '@stylin.js/elements';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SdkPool } from '@/interface';
import { ZERO_BIG_NUMBER } from '@/utils';

import PoolFields from './pool-fields';
import { IPoolForm } from './pool-form.types';
import PoolFormManager from './pool-form-manager';
import PoolFormSummary from './pool-form-summary';

const PoolForm: FC = () => {
  const { query } = useRouter();
  const pool = (POOLS as Record<string, SdkPool>)[String(query.pool)];

  const form = useForm<IPoolForm>({
    defaultValues: {
      quoting: false,
      pool: {
        value: '0',
        id: pool?.objectId,
        type: pool?.lpCoinType,
        valueBN: ZERO_BIG_NUMBER,
      },
      coins: pool?.coinTypes.map((type) => ({
        type,
        value: '0',
        valueBN: ZERO_BIG_NUMBER,
      })),
    },
  });

  return (
    <FormProvider {...form}>
      <Div gap="1rem" display="flex" flexDirection="column">
        <PoolFormManager />
        <PoolFields />
        <PoolFormSummary />
      </Div>
    </FormProvider>
  );
};

export default PoolForm;
