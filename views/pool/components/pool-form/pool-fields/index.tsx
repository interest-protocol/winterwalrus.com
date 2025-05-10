import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import InputField from '@/components/input-field';
import { useTabState } from '@/hooks/use-tab-manager';

import PoolSwap from '../../pool-swap';
import PoolFormButton from '../pool-form-button';

const PoolFields: FC = () => {
  const { tab } = useTabState();
  const { control, getValues } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'coins' });

  if (tab == 0)
    return (
      <Div gap="0.5rem" display="flex" flexDirection="column">
        {fields.map(({ id }, index) => (
          <InputField
            key={id}
            label="In"
            topContent="balance"
            name={`coins.${index}`}
            types={[getValues(`coins.${index}.type`)]}
          />
        ))}
        <PoolFormButton />
      </Div>
    );

  if (tab == 1)
    return (
      <Div gap="0.5rem" display="flex" flexDirection="column">
        <InputField
          label="In"
          name="pool"
          topContent="balance"
          types={[getValues('pool.type')]}
        />
        <PoolFormButton />
      </Div>
    );

  return <PoolSwap />;
};

export default PoolFields;
