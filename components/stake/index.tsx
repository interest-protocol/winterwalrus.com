import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import StakeDetails from './stake-details';
import StakeForm from './stake-form';

const Stake: FC = () => {
  return (
    <Div display="flex" flexDirection="column" gap="1.5rem">
      <StakeForm />
      <StakeDetails />
    </Div>
  );
};

export default Stake;
