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

  const typeBefore = useWatch({ control, name: `${name}.type` }) as string;

  const isSnowOutAfterVote =
    name === 'out' &&
    epoch &&
    epoch.msUntilNextEpoch / epoch.epochDurationMs < 0.5 &&
    typeBefore === TYPES[network].SNOW;

  const type = isSnowOutAfterVote
    ? TYPES[network].BLIZZARD_STAKE_NFT
    : typeBefore;

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
      {Icon ? (
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
      {ASSET_METADATA[type]?.symbol ?? 'Select Coin'}
    </Motion>
  );
};

export default StakeFormFieldCoin;
