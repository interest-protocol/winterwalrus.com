import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import InputField from '@/components/input-field';
import { LST_TYPES } from '@/constants';

import UnstakeFormButton from './unstake-form-button';
import UnstakeFormManager from './unstake-form-manager';

const UnstakeForm: FC = () => (
  <>
    <UnstakeFormManager />
    <Div display="flex" flexDirection="column" gap="0.25rem">
      <InputField
        name="in"
        label="In"
        redirecting
        types={LST_TYPES}
        topContent="balance"
      />
    </Div>
    <UnstakeFormButton />
  </>
);

export default UnstakeForm;
