import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { COIN_TYPES, LST_TYPES } from '@/constants';

import InputField from '../../input-field';
import SwapFormButton from './swap-form-button';
import SwapFormManager from './swap-form-manager';

const SwapForm: FC = () => (
  <>
    <SwapFormManager />
    <Div display="flex" flexDirection="column" gap="0.25rem">
      <InputField
        name="in"
        label="In"
        topContent="balance"
        types={[...COIN_TYPES, ...LST_TYPES]}
      />
      <InputField
        disabled
        name="out"
        label="Out"
        types={[...COIN_TYPES, ...LST_TYPES]}
      />
    </Div>
    <SwapFormButton />
  </>
);

export default SwapForm;
