import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import InputField from '@/components/input-field';
import { LST_TYPES } from '@/constants';

import TransmuteFormButton from './transmute-form-button';
import TransmuteFormManager from './transmute-form-manager';

const TransmuteForm: FC = () => (
  <>
    <TransmuteFormManager />
    <Div gap="0.25rem" display="flex" flexDirection="column">
      <InputField
        name="in"
        label="In"
        types={LST_TYPES}
        oppositeName="out"
        topContent="balance"
      />
      <InputField
        disabled
        name="out"
        label="Out"
        oppositeName="in"
        types={[TYPES.WWAL]}
      />
    </Div>
    <TransmuteFormButton />
  </>
);

export default TransmuteForm;
