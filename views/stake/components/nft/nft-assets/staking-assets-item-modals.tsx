import { Button, P } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

import { StakingAssetItemModalProps } from '../nft.types';

export const StakingAssetsItemModal: FC<StakingAssetItemModalProps> = ({
  mode,
}) =>
  ['unstake', 'withdraw'].includes(mode) ? (
    <>
      <P mx="0.5rem">
        {mode === 'withdraw'
          ? `To complete your withdrawal securely, you'll be redirected to our official platform. Click the button below to proceed and access your funds safely.`
          : `To complete your unstaking process, you’ll be redirected to our official platform. Click the button below to proceed securely and regain full access to your assets.`}
      </P>
      <Link href="https://stake-wal.wal.app" target="_blank">
        <Button
          all="unset"
          py="1rem"
          px="1.5rem"
          mx="0.5rem"
          bg="#EE2B5B"
          color="#0C0F1D"
          cursor="pointer"
          fontWeight="500"
          textAlign="center"
          position="relative"
          borderRadius="0.625rem"
          width="calc(100% - 3rem)"
        >
          {mode === 'withdraw' ? 'Withdraw' : 'Unstake'}
        </Button>
      </Link>
    </>
  ) : null;
