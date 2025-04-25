import { Div, P } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { RoutesEnum } from '@/constants';

import NativeStakedWalCoinsTable from './native-staked-wal-table';

const NativeStakedWal: FC = () => {
  const records = true;

  if (!records) {
    return (
      <Div
        p="3.25rem"
        bg="#FFFFFF0D"
        display="flex"
        overflowX="auto"
        border="1px solid"
        borderRadius="1rem"
        alignItems="center"
        flexDirection="column"
        gap={['0.5rem', '1rem']}
        borderColor="#FFFFFF1A"
      >
        <P color="#fff">{"You don't have any records just yet"}</P>
        <Link href={RoutesEnum.Stake}>
          <Div
            all="unset"
            bg="#99EFE4"
            display="flex"
            color="#000000"
            cursor="pointer"
            position="relative"
            alignItems="center"
            borderRadius="0.75rem"
            gap={['0.5rem', '1rem']}
            py={['0.75rem', '1rem']}
            px={['0.75rem', '1.5rem']}
            backdropFilter="blur(16px)"
          >
            Start Staking
          </Div>
        </Link>
      </Div>
    );
  }

  return (
    <>
      <NativeStakedWalCoinsTable />
    </>
  );
};

export default NativeStakedWal;
