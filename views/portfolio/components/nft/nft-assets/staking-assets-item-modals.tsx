import { Button, P } from '@stylin.js/elements';
import { FC } from 'react';

import { StakingAssetItemModalProps } from '../nft.types';

export const StakingAssetsItemModal: FC<StakingAssetItemModalProps> = ({
  mode,
  onClick,
}) => {
  if (!['unstake', 'withdraw'].includes(mode)) return null;

  return (
    <>
      <P mx="0.5rem">
        {mode === 'withdraw'
          ? `To complete your withdrawal securely, you'll be redirected to our official platform. Click the button below to proceed and access your funds safely.`
          : `You will be able to withdraw your stake in 1 or 2 epochs. Until then, your stake will continue to earn rewards.`}
      </P>
      <Button
        all="unset"
        py="1rem"
        px="1.5rem"
        mx="0.5rem"
        bg="#99EFE4"
        color="#0C0F1D"
        cursor="pointer"
        fontWeight="500"
        onClick={onClick}
        textAlign="center"
        position="relative"
        borderRadius="0.625rem"
        width="calc(100% - 3rem)"
      >
        {mode === 'withdraw' ? 'Withdraw' : 'Unstake'}
      </Button>
    </>
  );
};
