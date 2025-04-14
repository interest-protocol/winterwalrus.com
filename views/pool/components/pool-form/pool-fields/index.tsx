import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import InputField from '@/components/input-field';
import { useTabState } from '@/hooks/use-tab-manager';

const PoolFields: FC = () => {
  const { tab } = useTabState();
  const { control, getValues } = useFormContext();
  const { fields } = useFieldArray({ control, name: 'coins' });

  if (!tab)
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
      </Div>
    );

  return (
    <Div gap="0.5rem" display="flex" flexDirection="column">
      <InputField
        label="In"
        name="pool"
        topContent="balance"
        types={[getValues('pool.type')]}
      />
    </Div>
  );
};

export default PoolFields;
