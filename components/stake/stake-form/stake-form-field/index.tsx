import { Div, Input, Label, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { parseInputEventToNumberString } from '@/utils';

import { StakeFormFieldProps } from './stake-form-field.types';
import StakeFormFieldCoin from './stake-form-field-coin';

const StakeFormField: FC<StakeFormFieldProps> = ({ label, name, disabled }) => {
  const { register, setValue } = useFormContext();

  return (
    <Label
      p="1.5rem"
      gap="1rem"
      bg="#F8F8F80A"
      display="flex"
      color="#F8F8F8F2"
      borderRadius="2rem"
      flexDirection="column"
      backdropFilter="blur(50px)"
      boxShadow="2px 4px 16px rgba(248, 248, 248, 0.06) inset"
    >
      <Span fontFamily="Rubik" opacity="0.8">
        {label}
      </Span>
      <Div
        display="grid"
        maxWidth="100%"
        alignItems="center"
        gridTemplateColumns="1fr auto"
      >
        <Input
          all="unset"
          placeholder="0"
          minWidth="100%"
          fontSize="2.25rem"
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
      <Span fontFamily="Rubik" opacity="0.8">
        $0.00
      </Span>
    </Label>
  );
};

export default StakeFormField;
