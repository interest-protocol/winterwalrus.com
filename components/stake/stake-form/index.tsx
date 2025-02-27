import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SwapSVG } from '@/components/svg';

import StakeFormButton from './stake-form-button';
import StakeFormField from './stake-form-field';
import StakeFormManager from './stake-form-manager';

const StakeForm: FC = () => {
  const { setValue, getValues } = useFormContext();

  const handleFlipTokens = () => {
    const coinIn = getValues('in.coin');
    setValue('in', { coin: getValues('out.coin'), value: '0' });
    setValue('out', { coin: coinIn, value: '0' });
  };

  return (
    <>
      <StakeFormManager />
      <Div display="flex" flexDirection="column" gap="0.25rem">
        <StakeFormField name="in" label="In" />
        <Div
          zIndex="0"
          display="flex"
          position="relative"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            all="unset"
            width="3rem"
            height="3rem"
            display="flex"
            cursor="pointer"
            color="#FFFFFF80"
            overflow="hidden"
            borderRadius="50%"
            position="absolute"
            alignItems="center"
            background="#FFFFFF0D"
            justifyContent="center"
            onClick={handleFlipTokens}
            backdropFilter="blur(20px)"
            nHover={{ color: '#99EFE4' }}
          >
            <SwapSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Button>
        </Div>
        <StakeFormField name="out" label="Out" disabled />
      </Div>
      <StakeFormButton />
    </>
  );
};
export default StakeForm;
