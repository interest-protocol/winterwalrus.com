import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { usePool } from '@/hooks/use-poll';
import { ZERO_BIG_NUMBER } from '@/utils';

import PoolFields from './pool-fields';
import { IPoolForm } from './pool-form.types';
import PoolFormManager from './pool-form-manager';
import PoolFormSummary from './pool-form-summary';

const PoolForm: FC = () => {
  const pool = usePool();

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
