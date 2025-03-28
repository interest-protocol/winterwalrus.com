import { Div, P, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { WalSVG } from '@/components/svg';
import { useFees } from '@/hooks/use-fees';

const UnstakeDetails: FC = () => {
  const { control } = useFormContext();
  const { fees, isLoading: feesLoading } = useFees();

  const outValue = useWatch({ control, name: 'out.value' });

  return (
    <Div color="#F8F8F880" display="flex" flexDirection="column" gap="0.5rem">
      <Div display="flex" justifyContent="space-between">
        <P>Unstaking fee</P>
        <P color="#F8F8F8" fontFamily="JetBrains Mono">
          {feesLoading ? (
            <Skeleton width="4rem" />
          ) : (
            `${(fees?.unstaking ?? 0).toFixed(2)} %`
          )}
        </P>
      </Div>
      {!!Number(outValue) && (
        <Div display="flex" justifyContent="space-between" color="#F8F8F8">
          <P>To Receive</P>
          <P color="#99EFE4" fontFamily="JetBrains Mono">
            {outValue} WAL + sWAL{' '}
            <Span
              width="1rem"
              height="1rem"
              overflow="hidden"
              borderRadius="50%"
              display="inline-flex"
            >
              <WalSVG maxWidth="1rem" width="100%" />
            </Span>
          </P>
        </Div>
      )}
    </Div>
  );
};

export default UnstakeDetails;
