import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useFees } from '@/hooks/use-fees';

const SwapDetails: FC = () => {
  const { fees, isLoading: feesLoading } = useFees();

  return (
    <Div color="#F8F8F880" display="flex" flexDirection="column" gap="0.5rem">
      <Div display="flex" justifyContent="space-between">
        <P color="#F8F8F8">Swap Fee</P>
        <P fontFamily="JetBrains Mono" color="#99EFE4">
          0.00 %
        </P>
      </Div>
      <Div display="flex" justifyContent="space-between">
        <P>Transmute fee</P>
        <P color="#F8F8F8" fontFamily="JetBrains Mono">
          {feesLoading ? (
            <Skeleton width="4rem" />
          ) : (
            `${(fees?.transmute ?? 0).toFixed(2)} %`
          )}
        </P>
      </Div>
    </Div>
  );
};

export default SwapDetails;
