import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import InputField from '@/components/input-field';
import { SwapSVG } from '@/components/svg';
import { COIN_TYPES, LST_TYPES } from '@/constants';

import SwapFormButton from './swap-form-button';
import SwapFormManager from './swap-form-manager';

const SwapForm: FC = () => {
  const { setValue, getValues } = useFormContext();

  const handleFlipTokens = () => {
    const coinIn = getValues('in.type');
    const coinOut = getValues('out.type');
    setValue('in', { value: '0', type: coinOut });
    setValue('out', { value: '0', type: coinIn });
  };

  return (
    <>
      <SwapFormManager />
      <Div gap="0.25rem" display="flex" flexDirection="column">
        <InputField
          name="in"
          label="In"
          oppositeName="out"
          topContent="balance"
          types={[...COIN_TYPES, ...LST_TYPES]}
        />
        <Button
          all="unset"
          width="3rem"
          height="3rem"
          my="-1.5rem"
          display="flex"
          cursor="pointer"
          color="#FFFFFF80"
          overflow="hidden"
          borderRadius="50%"
          alignSelf="center"
          alignItems="center"
          background="#FFFFFF0D"
          justifyContent="center"
          onClick={handleFlipTokens}
          backdropFilter="blur(20px)"
          nHover={{ color: '#99EFE4' }}
        >
          <SwapSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
        </Button>
        <InputField
          disabled
          name="out"
          label="Out"
          oppositeName="in"
          types={[...COIN_TYPES, ...LST_TYPES]}
        />
      </Div>
      <SwapFormButton />
    </>
  );
};

export default SwapForm;
