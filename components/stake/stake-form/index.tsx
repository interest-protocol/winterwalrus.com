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
            color="white"
            height="3rem"
            display="flex"
            overflow="hidden"
            position="absolute"
            alignItems="center"
            background="#0B0F1DB2"
            borderRadius="0.75rem"
            justifyContent="center"
            backdropFilter="blur(50px)"
            boxShadow="2px 4px 16px 0px rgba(248, 248, 248, 0.06) inset"
          >
            <SwapSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
          </Button>
        </Div>
        <StakeFormField name="out" label="Out" disabled />
        <StakeFormButton />
      </Div>
    </FormProvider>
  );
};

export default StakeForm;
