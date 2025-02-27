import { Div, P, Small } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { ChevronRightSVG } from '@/components/svg';
import { Network } from '@/constants';
import { RPC, RPC_DISPLAY, RPC_STORAGE_KEY, RPCs } from '@/constants/rpc';
import { useNetwork } from '@/hooks/use-network';

import { SettingsMenusProps } from './settings-menu.types';
import SettingsMenuItem from './settings-menu-item';

const Motion = motion.create(Div);

const SettingsMenuRPC: FC<SettingsMenusProps> = ({ show, toggleShow }) => {
  const network = useNetwork();
  const [localRPC, setRPC] = useLocalStorage<RPC>(RPC_STORAGE_KEY, RPC.Shinami);

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
        <P>
          RPCs
          {network === Network.TESTNET && (
            <Small opacity="0.6"> (testnet)</Small>
          )}
        </P>
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
            {RPCs.map((rpc, index) => (
              <SettingsMenuItem
                key={rpc}
                name={rpc}
                withBorder={!!index}
                title={RPC_DISPLAY[rpc]}
                selected={rpc === localRPC}
                onSelect={() => setRPC(rpc)}
                tag={rpc === RPC.Shinami ? 'Recommended' : null}
              />
            ))}
          </Motion>
        )}
      </AnimatePresence>
    </Motion>
  );
};

export default SettingsMenuRPC;
