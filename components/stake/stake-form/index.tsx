import { Div } from '@stylin.js/elements';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { COIN_TYPES } from '@/constants';

import InputField from '../../input-field';
import StakeFormButton from './stake-form-button';
import StakeFormManager from './stake-form-manager';
import StakeInputOut from './stake-input-out';

const StakeForm: FC = () => {
  const { setValue, getValues } = useFormContext();

  useEffect(() => {
    const [inType, outType] = getValues(['in.type', 'out.type']);

    if (COIN_TYPES[0] === inType) return;

    setValue('in', { type: outType, value: '0' });
    setValue('out', { type: inType, value: '0' });
  }, []);

  return (
    <>
      <StakeFormManager />
      <Div display="flex" flexDirection="column" gap="0.25rem">
        <InputField
          name="in"
          label="In"
          types={COIN_TYPES}
          topContent="balance"
        />
        <StakeInputOut />
      </Div>
      <StakeFormButton />
    </>
  );
};

export default StakeForm;
