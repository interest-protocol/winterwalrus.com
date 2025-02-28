import { Button, Div, Input, Label, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { WalletSVG } from '@/components/svg';
import { useCoins } from '@/hooks/use-coins';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { parseInputEventToNumberString } from '@/utils';

import { StakeFormFieldProps } from './stake-form-field.types';
import StakeFormFieldCoin from './stake-form-field-coin';
import StakeFormFieldPrice from './stake-form-field-price';

const StakeFormField: FC<StakeFormFieldProps> = ({ label, name, disabled }) => {
  const { coins } = useCoins();
  const { register, setValue, control } = useFormContext();

  const coin = useWatch({ control, name: `${name}.coin` });

  return (
    <Label
      p="1rem"
      gap="1rem"
      bg="#FFFFFF0D"
      display="flex"
      color="#FFFFFF80"
      borderRadius="1rem"
      fontSize="0.875rem"
      flexDirection="column"
      border="1px solid #FFFFFF1A"
    >
      <Span opacity="0.8">{label}</Span>
      <Div
        display="grid"
        maxWidth="100%"
        alignItems="center"
        fontFamily="JetBrains Mono"
        gridTemplateColumns="1fr auto"
      >
        <Input
          all="unset"
          color="#ffffff"
          placeholder="0"
          minWidth="100%"
          fontSize="1.5rem"
          disabled={disabled}
          {...register(`${name}.value`, {
            onChange: (event) => {
              const value = parseInputEventToNumberString(event);
              setValue(`${name}.value`, value);
            },
          })}
        />
        <StakeFormFieldCoin name={name} />
      </Div>
      <Div display="flex" justifyContent="space-between">
        <StakeFormFieldPrice name={name} />
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
                FixedPointMath.toNumber(BigNumber(coins?.[coin] ?? 0))
              ),
          })}
        >
          <WalletSVG maxWidth="1rem" width="100%" />
          <Span fontFamily="JetBrains Mono">
            {FixedPointMath.toNumber(BigNumber(coins?.[coin] ?? 0), 9, 4)}
          </Span>
        </Button>
      </Div>
    </Label>
  );
};

export default StakeFormField;
