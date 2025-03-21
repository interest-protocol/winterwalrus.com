import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { SwapSVG } from '@/components/svg';
import { useNetwork } from '@/hooks/use-network';

import StakeFormButton from './stake-form-button';
import StakeFormField from './stake-form-field';
import StakeFormManager from './stake-form-manager';

const StakeForm: FC = () => {
  const network = useNetwork();
  const { setValue, getValues } = useFormContext();

  const handleFlipTokens = () => {
    const coinIn = getValues('in.type');
    setValue('in', {
      type:
        getValues('out.type') === TYPES[network].STAKED_WAL
          ? TYPES[network].WAL
          : TYPES[network].SNOW,
      value: '0',
    });
    setValue('out', {
      value: '0',
      type:
        coinIn === TYPES[network].WAL
          ? TYPES[network].STAKED_WAL
          : TYPES[network].SNOW,
    });
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
