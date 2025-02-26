import { Button, Div, DivElementProps, Span } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { CogSVG } from '../svg';
import SettingsMenu from './settings-menu';

const Settings: FC = () => {
  const [show, setShow] = useState(false);

  const menuRef = useClickOutsideListenerRef<DivElementProps>(() =>
    setShow(false)
  );

  return (
    <Div
      ref={menuRef}
      display="flex"
      position="relative"
      alignItems="flex-end"
      flexDirection="column"
    >
      <Button
        all="unset"
        color="#fff"
        lineHeight="0"
        cursor="pointer"
        borderRadius="0.75rem"
        onClick={() => setShow(not)}
        border="1px solid #99EFE44D"
      >
        <Span
          p="1rem"
          display="inline-block"
          transition="all 300ms linear"
          nHover={{ rotate: '90deg', color: '#99EFE4' }}
        >
          <CogSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Span>
      </Button>
      <AnimatePresence>{show && <SettingsMenu />}</AnimatePresence>
    </Div>
  );
};

export default Settings;
