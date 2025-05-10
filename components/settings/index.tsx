import { Button, Div, DivElementProps, Span } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { not } from 'ramda';
import { FC, useState } from 'react';

import useClickOutsideListenerRef from '@/hooks/use-click-outside-listener-ref';

import { BarsSVG, CogSVG } from '../svg';
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
        nHover={{ bg: '#99EFE480', borderColor: '#99EFE44D' }}
      >
        <Span
          p="0.75rem"
          transition="all 300ms linear"
          display={['inline-block', 'inline-block', 'inline-block', 'none']}
        >
          <BarsSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Span>
        <Span
          p={['0.5rem', '0.75rem']}
          transition="all 300ms linear"
          nHover={{ rotate: '90deg', color: '#FFFFFF' }}
          display={['none', 'none', 'none', 'inline-block']}
        >
          <CogSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%" />
        </Span>
      </Button>
      <AnimatePresence>{show && <SettingsMenu />}</AnimatePresence>
    </Div>
  );
};

export default Settings;
