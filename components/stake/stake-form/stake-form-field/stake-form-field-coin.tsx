import { Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { COIN_ICON, COIN_METADATA } from '@/constants/ coins';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldCoin: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const { control } = useFormContext();

  const coin = useWatch({ control, name: `${name}.coin` }) as string;

  const Icon = COIN_ICON[coin];

  return (
    <Div
      p="1rem"
      gap="0.5rem"
      color="white"
      display="flex"
      overflow="hidden"
      fontFamily="Rubik"
      borderRadius="2rem"
      alignItems="center"
      background="#0B0F1DB2"
      justifyContent="center"
      backdropFilter="blur(50px)"
      boxShadow="2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset"
    >
      {Icon && (
        <Span overflow="hidden" borderRadius="1rem" display="flex">
          <Icon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
        </Span>
      )}
      {COIN_METADATA[coin]?.symbol ?? 'Select Coin'}
    </Div>
  );
};

export default StakeFormFieldCoin;
