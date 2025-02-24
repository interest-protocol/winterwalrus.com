import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';

import { STAKING_FEE, TRANSMUTE_FEE, UNSTAKING_FEE } from '@/constants';
import useEpochAPR from '@/hooks/use-epoch-apr';

const StakeDetails: FC = () => {
  const { data } = useEpochAPR();

  return (
    <Div color="#F8F8F880" display="flex" flexDirection="column" gap="0.5rem">
      <Div display="flex" justifyContent="space-between">
        <P color="#F8F8F8">APR</P>
        <P fontFamily="JetBrains Mono" color="#99EFE4">
          {((data ?? 0) * 100).toFixed(2)} %
        </P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P>Staking fee</P>
        <P color="#F8F8F8" fontFamily="JetBrains Mono">
          {STAKING_FEE.toFixed(2)} %
        </P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P>Unstaking fee</P>
        <P color="#F8F8F8" fontFamily="JetBrains Mono">
          {UNSTAKING_FEE.toFixed(2)} %
        </P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P>Transmute fee</P>
        <P color="#F8F8F8" fontFamily="JetBrains Mono">
          {TRANSMUTE_FEE.toFixed(2)} %
        </P>
      </Div>
    </Div>
  );
};

export default StakeDetails;
