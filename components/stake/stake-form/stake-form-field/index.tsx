import { Div, Input, Label, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { WalletSVG } from '@/components/svg';
import { parseInputEventToNumberString } from '@/utils';

import { StakeFormFieldProps } from './stake-form-field.types';
import StakeFormFieldCoin from './stake-form-field-coin';

const StakeFormField: FC<StakeFormFieldProps> = ({ label, name, disabled }) => {
  const { register, setValue } = useFormContext();

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
        <Span fontFamily="JetBrains Mono">$0.00</Span>
        <Div display="flex" gap="0.5rem">
          <WalletSVG maxWidth="1rem" width="100%" />
          <Span fontFamily="JetBrains Mono">0.00</Span>
        </Div>
      </Div>
    </Label>
  );
};

export default StakeFormField;
