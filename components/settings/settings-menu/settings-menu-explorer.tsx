import { Div, P } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { ChevronRightSVG } from '@/components/svg';
import {
  Explorer,
  EXPLORER_DISPLAY,
  EXPLORER_STORAGE_KEY,
  EXPLORERS,
} from '@/constants';

import { SettingsMenusProps } from './settings-menu.types';
import SettingsMenuItem from './settings-menu-item';

const Motion = motion.create(Div);

const SettingsMenuExplorer: FC<SettingsMenusProps> = ({ show, toggleShow }) => {
  const [localExplorer, setExplorer] = useLocalStorage<Explorer>(
    EXPLORER_STORAGE_KEY,
    Explorer.SuiVision
  );

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
        <P>Explorer</P>
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
            style={{ originY: 0 }}
            exit={{ scaleY: 0, height: 0, opacity: 0 }}
            animate={{
              scaleY: [0, 1],
              height: [0, 'auto'],
              opacity: [0, 1, 1],
            }}
          >
            {EXPLORERS.map((explorer, index) => (
              <SettingsMenuItem
                key={explorer}
                name={explorer}
                withBorder={!!index}
                title={EXPLORER_DISPLAY[explorer]}
                selected={explorer === localExplorer}
                onSelect={() => setExplorer(explorer)}
              />
            ))}
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default SettingsMenuExplorer;
