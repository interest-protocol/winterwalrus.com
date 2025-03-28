import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { COIN_LIST, LST_LIST } from '@/constants';

import InputField from '../../input-field';
import StakeFormButton from './stake-form-button';
import StakeFormManager from './stake-form-manager';
import StakeFormTag from './stake-form-tag';

const StakeForm: FC = () => (
  <>
    <StakeFormManager />
    <Div display="flex" flexDirection="column" gap="0.25rem">
      <InputField
        name="in"
        label="In"
        topContent="balance"
        assetList={COIN_LIST}
      />
      <InputField
        disabled
        name="out"
        label="Out"
        assetList={LST_LIST}
        topContent={<StakeFormTag />}
      />
    </Div>
    <StakeFormButton />
  </>
);

export default StakeForm;
