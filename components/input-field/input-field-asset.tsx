import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Img, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import Motion from '@/components/motion';
import { ASSET_METADATA } from '@/constants/coins';
import useEpochData from '@/hooks/use-epoch-data';
import { useModal } from '@/hooks/use-modal';

import { ChevronDownSVG } from '../svg';
import { InputFieldAssetProps } from './input-field.types';
import InputFieldModal from './input-field-modal';

const InputFieldAsset: FC<InputFieldAssetProps> = ({ name, assetList }) => {
  const form = useFormContext();
  const { setContent } = useModal();
  const { data: epoch, isLoading } = useEpochData();

  const { control } = form;

  const typeBefore = useWatch({ control, name: `${name}.type` }) as string;

  if (isLoading)
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
        <Skeleton width="2rem" height="2rem" />
        <Skeleton width="4rem" />
      </Motion>
    );

  const isLstOutAfterVote =
    name === 'out' &&
    epoch &&
    epoch.msUntilNextEpoch / epoch.epochDurationMs < 0.5 &&
    typeBefore === TYPES.WWAL;

  const type = isLstOutAfterVote ? TYPES.BLIZZARD_STAKE_NFT : typeBefore;

  const Icon = ASSET_METADATA[type].Icon;

  const openAssetModal = () =>
    setContent(
      <FormProvider {...form}>
        <InputFieldModal name={name} assetList={assetList} />
      </FormProvider>
    );

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
      onClick={() => assetList.length > 1 && openAssetModal()}
      justifyContent="center"
    >
      {typeof Icon === 'string' ? (
        <Span overflow="hidden" borderRadius="0.5rem" display="flex">
          <Img
            src={Icon}
            width="2rem"
            height="2rem"
            alt={ASSET_METADATA[type]?.symbol}
          />
        </Span>
      ) : (
        <Span overflow="hidden" borderRadius="1rem" display="flex">
          <Icon maxWidth="2rem" maxHeight="2rem" width="100%" />
        </Span>
      )}
      {ASSET_METADATA[type]?.symbol ?? 'Select Coin'}
      {assetList.length > 1 && <ChevronDownSVG maxWidth="1rem" width="100%" />}
    </Motion>
  );
};

export default InputFieldAsset;
