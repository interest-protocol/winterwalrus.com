import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import InputField from '@/components/input-field';
import { SwapSVG } from '@/components/svg';

import SwapFormButton from './swap-form-button';
import SwapFormManager from './swap-form-manager';

const SwapForm: FC = () => {
  const { setValue, getValues, control } = useFormContext();

  const [inType, outType] = useWatch({
    control,
    name: ['in.type', 'out.type'],
  });

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
          types={[inType]}
          oppositeName="out"
          topContent="balance"
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
          types={[outType]}
          oppositeName="in"
        />
      </Div>
      <SwapFormButton />
    </>
  );
};

export default SwapForm;
