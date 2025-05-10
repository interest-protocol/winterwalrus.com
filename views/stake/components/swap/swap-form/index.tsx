import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Div } from '@stylin.js/elements';
import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import InputField from '@/components/input-field';
import { SwapSVG } from '@/components/svg';
import { LST_TYPES } from '@/constants';

import SwapFormButton from './swap-form-button';
import SwapFormManager from './swap-form-manager';

const SwapForm: FC = () => {
  const { setValue, control, getValues } = useFormContext();

  const coinIn = useWatch({ control, name: 'in.type' });

  const handleFlipTokens = () => {
    const coinOut = getValues('out.type');

    setValue('in', { value: '0', type: coinOut });
    setValue('out', { value: '0', type: coinIn });
  };

  useEffect(() => {
    if (coinIn === TYPES.WWAL) setValue('out.type', TYPES.WAL);
    if (coinIn === TYPES.WAL) setValue('out.type', TYPES.WWAL);
  }, [coinIn]);

  return (
    <>
      <SwapFormManager />
      <Div gap="0.25rem" display="flex" flexDirection="column">
        <InputField
          name="in"
          label="In"
          oppositeName="out"
          topContent="balance"
          types={[TYPES.WAL, ...LST_TYPES]}
        />
        <Button
          all="unset"
          my="-1.5rem"
          width="3rem"
          height="3rem"
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
          types={coinIn === TYPES.WAL ? [TYPES.WWAL] : [TYPES.WAL, TYPES.WWAL]}
        />
      </Div>
      <SwapFormButton />
    </>
  );
};

export default SwapForm;
