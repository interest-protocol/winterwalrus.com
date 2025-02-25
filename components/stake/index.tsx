import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import StakeDetails from './stake-details';
import StakeForm from './stake-form';

const Stake: FC = () => (
  <Div gap="1rem" display="flex" flexDirection="column">
    <StakeForm />
    <StakeDetails />
  </Div>
);

export default Stake;
