import { Img, Span } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC } from 'react';
import { FormProvider, useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import Motion from '@/components/motion';
import useMetadata from '@/hooks/use-metadata';
import { useModal } from '@/hooks/use-modal';
import { nftTypeFromType } from '@/utils';

import { ChevronDownSVG } from '../svg';
import { InputFieldAssetProps } from './input-field.types';
import InputFieldModal from './input-field-modal';

const InputFieldAsset: FC<InputFieldAssetProps> = ({ name, types }) => {
  const form = useFormContext();
  const { setContent } = useModal();
  const { data: metadata, isLoading } = useMetadata(types);

  const { control } = form;

  const type = useWatch({ control, name: `${name}.type` });

  const nftType = nftTypeFromType(type);

  if (isLoading || (!metadata?.[type] && !metadata?.[nftType]))
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

  const openAssetModal = () =>
    setContent(
      <FormProvider {...form}>
        <InputFieldModal name={name} assetList={values(metadata)} />
      </FormProvider>,
      {
        overlayProps: {
          alignItems: ['flex-end', 'center'],
        },
        containerProps: {
          display: 'flex',
          maxHeight: '90vh',
          maxWidth: ['100vw', '95vw'],
        },
      }
    );

  return (
    <Motion
      gap="0.5rem"
      color="white"
      display="flex"
      fontSize="1rem"
      overflow="hidden"
      whileHover="hover"
      alignItems="center"
      justifyContent="center"
      cursor={types.length > 1 ? 'pointer' : 'default'}
      onClick={() => types.length > 1 && openAssetModal()}
    >
      <Span overflow="hidden" borderRadius="0.5rem" display="flex">
        <Img
          width="2rem"
          height="2rem"
          alt={metadata[type]?.symbol ?? metadata[nftType].symbol}
          src={metadata[type]?.iconUrl ?? metadata[nftType].iconUrl}
        />
      </Span>
      {metadata?.[type]?.symbol ?? metadata?.[nftType]?.symbol ?? 'Select Coin'}
      {types.length > 1 && <ChevronDownSVG maxWidth="1rem" width="100%" />}
    </Motion>
  );
};

export default InputFieldAsset;
