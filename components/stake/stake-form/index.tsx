import { Network, TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { SwapSVG } from '@/components/svg';

import StakeFormButton from './stake-form-button';
import StakeFormField from './stake-form-field';
import StakeFormManager from './stake-form-manager';

const StakeForm: FC = () => {
  const form = useForm({
    defaultValues: {
      in: {
        coin: TYPES[Network.Testnet].WAL,
        value: 0,
      },
      out: {
        coin: TYPES[Network.Testnet].SNOW,
        value: 0,
      },
    },
  });

  return (
    <FormProvider {...form}>
      <StakeFormManager />
      <Div display="flex" flexDirection="column" gap="0.25rem">
        <StakeFormField name="in" label="In" />
        <Div
          zIndex="1"
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
            backdropFilter="blur(20px)"
          >
            <SwapSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Button>
        </Div>
        <StakeFormField name="out" label="Out" disabled />
      </Div>
      <StakeFormButton />
    </FormProvider>
  );
};

export default StakeForm;
