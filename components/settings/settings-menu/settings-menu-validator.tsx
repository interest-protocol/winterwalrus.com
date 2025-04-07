import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import { FormProvider, useFormContext } from 'react-hook-form';

import Motion from '@/components/motion';
import { useModal } from '@/hooks/use-modal';

import SettingsMenuValidatorModal from './settings-menu-validator-modal';

const SettingsMenuValidator: FC = () => {
  const form = useFormContext();
  const { setContent } = useModal();

  const openValidator = () =>
    setContent(
      <FormProvider {...form}>
        <SettingsMenuValidatorModal />
      </FormProvider>
    );

  return (
    <Motion>
      <Div
        px="1rem"
        py="0.5rem"
        display="flex"
        cursor="pointer"
        alignItems="center"
        onClick={openValidator}
        justifyContent="space-between"
      >
        <P>Validator</P>
      </Div>
    </Motion>
  );
};

export default SettingsMenuValidator;
