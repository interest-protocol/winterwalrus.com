import { Button, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { WalletSVG } from '@/components/svg';
import { useAppState } from '@/hooks/use-app-state';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldBalance: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const { balances } = useAppState();
  const { control, setValue } = useFormContext();
  const type = useWatch({ control, name: `${name}.type` });

  return (
    <Button
      all="unset"
      gap="0.5rem"
      display="flex"
      cursor="pointer"
      {...(name === 'in' && {
        nHover: { color: '#99EFE4' },
        onClick: () =>
          setValue(
            `${name}.value`,
            FixedPointMath.toNumber(balances[type] ?? ZERO_BIG_NUMBER)
          ),
      })}
    >
      <WalletSVG maxWidth="1rem" width="100%" />
      <Span fontFamily="JetBrains Mono">
        {FixedPointMath.toNumber(balances[type] ?? ZERO_BIG_NUMBER, 9, 4)}
      </Span>
    </Button>
  );
};

export default StakeFormFieldBalance;
