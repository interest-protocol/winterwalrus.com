import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { STAKING_FEE, UNSTAKING_FEE } from '@/constants';
import useEpochAPR from '@/hooks/use-epoch-apr';

const StakeDetails: FC = () => {
  const { data } = useEpochAPR();

  return (
    <Div color="#F8F8F880" display="flex" flexDirection="column" gap="0.5rem">
      <Div display="flex" justifyContent="space-between">
        <P fontFamily="Rubik">APR</P>
        <P>{((data ?? 0) * 100).toFixed(2)} %</P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P fontFamily="Rubik">Staking fee</P>
        <P>{STAKING_FEE.toFixed(2)} %</P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P fontFamily="Rubik">Unstaking fee</P>
        <P>{UNSTAKING_FEE.toFixed(2)} %</P>
      </Div>
    </Div>
  );
};

export default StakeDetails;
