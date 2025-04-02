import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { COIN_TYPES } from '@/constants';

import InputField from '../../input-field';
import StakeFormButton from './stake-form-button';
import StakeInputOut from './stake-input-out';

const StakeForm: FC = () => (
  <>
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

export default StakeForm;
