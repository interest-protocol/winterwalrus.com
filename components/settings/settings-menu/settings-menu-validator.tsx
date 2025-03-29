import { Div, P } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { FC, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSessionStorage } from 'usehooks-ts';

import Motion from '@/components/motion';
import { ChevronRightSVG } from '@/components/svg';
import { INTEREST_LABS, VALIDATOR_STORAGE_KEY } from '@/constants';
import { useAllowedNodes } from '@/hooks/use-allowed-nodes';

import { SettingsMenusProps } from './settings-menu.types';
import SettingsMenuItem from './settings-menu-item';

const SettingsMenuValidator: FC<SettingsMenusProps> = ({
  show,
  toggleShow,
}) => {
  const { getValues, setValue } = useFormContext();
  const [validator, setValidator] = useSessionStorage(
    VALIDATOR_STORAGE_KEY,
    INTEREST_LABS
  );

  useEffect(() => {
    setValue('validator', validator);
  }, [validator]);

  const { nodes } = useAllowedNodes(getValues('out.type'));

  return (
    <Motion>
      <Div
        px="1rem"
        py="0.5rem"
        display="flex"
        cursor="pointer"
        alignItems="center"
        onClick={toggleShow}
        justifyContent="space-between"
      >
        <P>Validator</P>
        <Motion animate={{ rotate: show ? '90deg' : '0deg' }}>
          <ChevronRightSVG
            width="100%"
            maxWidth="1.25rem"
            maxHeight="1.25rem"
          />
        </Motion>
      </Div>
      <AnimatePresence>
        {show && (
          <Motion
            ml="1.5rem"
            overflowY="auto"
            maxHeight="10rem"
            style={{ originY: 0 }}
            exit={{ scaleY: 0, height: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1],
              height: [0, 'auto'],
              opacity: [0, 1, 1],
            }}
          >
            {nodes?.map(({ id, name }, index) => (
              <SettingsMenuItem
                key={id}
                name={name}
                title={name}
                withBorder={!!index}
                selected={id === validator}
                onSelect={() => setValidator(id)}
                tag={id === INTEREST_LABS ? 'default' : null}
              />
            ))}
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default SettingsMenuValidator;
