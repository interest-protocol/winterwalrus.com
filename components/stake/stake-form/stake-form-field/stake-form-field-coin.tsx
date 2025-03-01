import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Motion from '@/components/motion';
import { ASSET_METADATA, COIN_ICON, NFT_IMAGE } from '@/constants/coins';
import useEpochData from '@/hooks/use-epoch-data';
import { useNetwork } from '@/hooks/use-network';

import { StakeFormFieldGenericProps } from './stake-form-field.types';

const StakeFormFieldCoin: FC<StakeFormFieldGenericProps> = ({ name }) => {
  const network = useNetwork();
  const { control } = useFormContext();
  const { data: epoch } = useEpochData();

  const type = useWatch({ control, name: `${name}.type` }) as string;

  const isSnowOutAfterVote =
    name === 'out' &&
    epoch &&
    epoch.msUntilNextEpoch / epoch.epochDurationMs < 0.5 &&
    type === TYPES[network].SNOW;

  const Icon = COIN_ICON[type];
  const image = NFT_IMAGE[type];

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
      justifyContent="center"
    >
      {isSnowOutAfterVote ? (
        <Span overflow="hidden" borderRadius="0.5rem" display="flex">
          <Img
            width="2rem"
            height="2rem"
            alt="Blizzard NFT"
            src={NFT_IMAGE[TYPES[network].BLIZZARD_STAKE_NFT]}
          />
        </Span>
      ) : Icon ? (
        <Span overflow="hidden" borderRadius="1rem" display="flex">
          <Icon maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Span>
      ) : (
        <Span overflow="hidden" borderRadius="0.5rem" display="flex">
          <Img
            src={image}
            width="2rem"
            height="2rem"
            alt={ASSET_METADATA[type]?.symbol}
          />
        </Span>
      )}
      {isSnowOutAfterVote
        ? 'bSNOW'
        : ASSET_METADATA[type]?.symbol ?? 'Select Coin'}
    </Motion>
  );
};

export default StakeFormFieldCoin;
