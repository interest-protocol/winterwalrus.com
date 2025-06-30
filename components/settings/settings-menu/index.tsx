import { Div, Hr, Nav } from '@stylin.js/elements';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { map } from 'ramda';
import { FC, useState } from 'react';

import { NAV_ITEMS, NAV_ITEMS_TITLE, Routes, RoutesEnum } from '@/constants';

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
          {map((key: RoutesEnum) => {
            const isActive =
              (key === RoutesEnum.Stake &&
                pathname === Routes[RoutesEnum.Stake]) ||
              (key !== RoutesEnum.Stake && pathname.includes(Routes[key]));

            return (
              <Link href={Routes[key]} key={key}>
                <Div
                  px="1rem"
                  py="0.5rem"
                  display="flex"
                  cursor="pointer"
                  alignItems="center"
                  textTransform="capitalize"
                  color={isActive ? '#99EFE4' : '#FFFFFF80'}
                >
                  {NAV_ITEMS_TITLE[key]}
                </Div>
              </Link>
            );
          }, NAV_ITEMS)}
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
