import { Div, Hr, Nav } from '@stylin.js/elements';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import unikey from 'unikey';

import { Routes, RoutesEnum } from '@/constants';

import SettingsMenuExplorer from './settings-menu-explorer';
import SettingsMenuRPC from './settings-menu-rpc';
import SettingsMenuValidator from './settings-menu-validator';

const Motion = motion.create(Div);

const SettingsMenu: FC = () => {
  const { pathname } = useRouter();
  const [menu, setMenu] = useState<'explorer' | 'rpc' | null>(null);

  return (
    <Motion
      gap="2rem"
      zIndex="1"
      mt="4.25rem"
      bg="#FFFFFF0D"
      display="flex"
      color="#ffffff"
      overflow="hidden"
      position="absolute"
      borderRadius="1rem"
      exit={{ scaleY: 0 }}
      flexDirection="column"
      style={{ originY: 0 }}
      backdropFilter="blur(50px)"
      animate={{ scaleY: [0, 1] }}
      border="1px solid #FFFFFF1A"
    >
      <Motion py="0.5rem" borderRadius="0.75rem" width="20rem">
        <Nav display={['block', 'block', 'block', 'none']}>
          {[RoutesEnum.Stake, RoutesEnum.Pools, RoutesEnum.Stats].map(
            (route) => (
              <Link href={Routes[route]} key={unikey()}>
                <Div
                  px="1rem"
                  py="0.5rem"
                  display="flex"
                  cursor="pointer"
                  alignItems="center"
                  textTransform="capitalize"
                  color={
                    route === RoutesEnum.Stake
                      ? pathname === Routes[RoutesEnum.Stake]
                        ? '#99EFE4'
                        : '#FFFFFF80'
                      : pathname.includes(Routes[route])
                        ? '#99EFE4'
                        : '#FFFFFF80'
                  }
                >
                  {route}
                </Div>
              </Link>
            )
          )}
          <Hr border="none" borderBottom="1px solid #242424" mx="1rem" />
        </Nav>
        <SettingsMenuValidator />
        <Hr border="none" borderBottom="1px solid #242424" mx="1rem" />
        <SettingsMenuExplorer
          show={menu === 'explorer'}
          toggleShow={() => setMenu(menu === 'explorer' ? null : 'explorer')}
        />
        <Hr border="none" borderBottom="1px solid #242424" mx="1rem" />
        <SettingsMenuRPC
          show={menu === 'rpc'}
          toggleShow={() => setMenu(menu === 'rpc' ? null : 'rpc')}
        />
      </Motion>
    </Motion>
  );
};

export default SettingsMenu;
