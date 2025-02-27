import { Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Motion from '@/components/motion';
import { COIN_ICON, COIN_METADATA, NFT_IMAGE } from '@/constants/coins';

import { StakeFormFieldCoinProps } from './stake-form-field.types';

const StakeFormFieldCoin: FC<StakeFormFieldCoinProps> = ({ name }) => {
  const { control } = useFormContext();

  const coin = useWatch({ control, name: `${name}.coin` }) as string;

  const Icon = COIN_ICON[coin];
  const image = NFT_IMAGE[coin];

  return (
    <Motion
      gap="0.5rem"
      color="white"
      display="flex"
      fontSize="1rem"
      cursor="pointer"
      overflow="hidden"
      whileHover="hover"
      alignItems="center"
      background="#0B0F1DB2"
      justifyContent="center"
      boxShadow="2px 4px 16px 0px #F8F8F80F inset"
    >
      {Icon ? (
        <Span overflow="hidden" borderRadius="1rem" display="flex">
          <Icon maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Span>
      ) : (
        <Span overflow="hidden" borderRadius="0.5rem" display="flex">
          <Img src={image} width="2rem" height="2rem" />
        </Span>
      )}
      {COIN_METADATA[coin]?.symbol ?? 'Select Coin'}
    </Motion>
  );
};

export default StakeFormFieldCoin;
