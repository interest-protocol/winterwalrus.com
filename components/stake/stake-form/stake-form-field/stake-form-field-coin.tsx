import { Div, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { ChevronDownSVG } from '@/components/svg';
import { COIN_ICON, COIN_METADATA } from '@/constants/coins';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldCoin: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const { control } = useFormContext();

  const coin = useWatch({ control, name: `${name}.coin` }) as string;

  const Icon = COIN_ICON[coin];

  return (
    <Div
      gap="0.5rem"
      color="white"
      display="flex"
      fontSize="1rem"
      overflow="hidden"
      alignItems="center"
      borderRadius="2rem"
      background="#0B0F1DB2"
      justifyContent="center"
      boxShadow="2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset"
    >
      {Icon && (
        <Span overflow="hidden" borderRadius="1rem" display="flex">
          <Icon maxWidth="1.25rem" maxHeight="1.25rem" width="100%" />
        </Span>
      )}
      {COIN_METADATA[coin]?.symbol ?? 'Select Coin'}
      <Span overflow="hidden" borderRadius="1rem" display="flex">
        <ChevronDownSVG maxWidth="1rem" width="1rem" />
      </Span>
    </Div>
  );
};

export default StakeFormFieldCoin;
