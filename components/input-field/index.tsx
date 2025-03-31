import { Div, Input, Label, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { InputFieldProps } from './input-field.types';
import InputFieldAsset from './input-field-asset';
import InputFieldBalance from './input-field-balance';
import InputFieldBalances from './input-field-balances';
import InputFieldPrice from './input-field-price';

const StakeFormField: FC<InputFieldProps> = ({
  name,
  label,
  types,
  disabled,
  topContent,
}) => {
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
      <Div display="flex" justifyContent="space-between">
        <Span opacity="0.8">{label}</Span>
        {topContent === 'balance' ? (
          <InputFieldBalances name={name} />
        ) : (
          topContent
        )}
      </Div>
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
        <InputFieldAsset name={name} types={types} />
      </Div>
      <Div display="flex" justifyContent="space-between">
        <InputFieldPrice name={name} />
        <InputFieldBalance name={name} />
      </Div>
    </Label>
  );
};

export default StakeFormField;
