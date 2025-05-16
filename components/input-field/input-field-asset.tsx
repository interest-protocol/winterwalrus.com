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

const InputFieldAsset: FC<InputFieldAssetProps> = ({
  name,
  types,
  redirecting,
  oppositeName,
}) => {
  const form = useFormContext();
  const { setContent } = useModal();
  const { data: metadata, isLoading } = useMetadata(types);

  const { control } = form;

  const type = useWatch({ control, name: `${name}.type` });
  const oppositeType = useWatch({ control, name: `${oppositeName}.type` });

  const nftType = nftTypeFromType(type);

  const availableTypes = types.filter((item) => item !== oppositeType);

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
        <InputFieldModal
          name={name}
          redirecting={redirecting}
          oppositeName={oppositeName}
          assetList={values(metadata)}
        />
      </FormProvider>,
      { title: 'Select Asset' }
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
      cursor={availableTypes.length > 1 ? 'pointer' : 'default'}
      onClick={() => availableTypes.length > 1 && openAssetModal()}
    >
      <Span overflow="hidden" borderRadius="50%" display="flex">
        <Img
          width="2rem"
          height="2rem"
          alt={metadata[type]?.symbol ?? metadata[nftType].symbol}
          src={metadata[type]?.iconUrl ?? metadata[nftType].iconUrl}
        />
      </Span>
      {metadata?.[type]?.symbol ?? metadata?.[nftType]?.symbol ?? 'Select Coin'}
      {availableTypes.length > 1 && (
        <ChevronDownSVG maxWidth="1rem" width="100%" />
      )}
    </Motion>
  );
};

export default InputFieldAsset;
