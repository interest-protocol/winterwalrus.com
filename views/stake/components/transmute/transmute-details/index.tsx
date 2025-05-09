import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { useFees } from '@/hooks/use-fees';

const TransmuteDetails: FC = () => {
  const { getValues } = useFormContext();
  const { fees, isLoading: feesLoading } = useFees(getValues('in.type'));

  return (
    <Div color="#F8F8F880" display="flex" flexDirection="column" gap="0.5rem">
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

export default TransmuteDetails;
