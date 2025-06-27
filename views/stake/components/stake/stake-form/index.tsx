import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import InputField from '@/components/input-field';

import StakeFormButton from './stake-form-button';
import StakeFormManager from './stake-form-manager';
import StakeInputOut from './stake-input-out';

const StakeForm: FC = () => (
  <>
    <StakeFormManager />
    <Div display="flex" flexDirection="column" gap="0.25rem">
      <InputField
        name="in"
        label="In"
        types={[TYPES.WAL]}
        topContent="balance"
      />
      <StakeInputOut />
    </Div>
    <StakeFormButton />
  </>
);

export default StakeForm;
