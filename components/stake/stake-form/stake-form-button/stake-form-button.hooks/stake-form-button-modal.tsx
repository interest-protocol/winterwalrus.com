import { Button, Div, Input, P } from '@stylin.js/elements';
import { FC, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useModal } from '@/hooks/use-modal';

import { StakingAssetsItemNFTModalProps } from '../stake-form-button.types';

export const StakingAssetsItemNFTModal: FC<StakingAssetsItemNFTModalProps> = ({
  onProceed,
}) => {
  const { handleClose } = useModal();
  const [neverShow, setNeverShow] = useState(false);
  const [, setHideModal] = useLocalStorage('hideStakeModal', false);

  const handleProceed = () => {
    if (neverShow) setHideModal(true);

    handleClose();
    onProceed();
  };

  return (
    <>
      <P>
        {'You’re'} minting an NFT that represents your LST. In the next epoch,
        you can burn the NFT to claim your LST
      </P>
      <Div
        gap="0.5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          type="checkbox"
          checked={neverShow}
          onChange={(e) => setNeverShow(e.target.checked)}
        />
        <P m="0" fontSize="0.875rem">
          Never show again
        </P>
      </Div>
      <Button
        all="unset"
        py="1rem"
        px="1.5rem"
        bg="#99EFE4"
        color="#0C0F1D"
        cursor="pointer"
        fontWeight="500"
        textAlign="center"
        position="relative"
        borderRadius="0.625rem"
        width="calc(100% - 3rem)"
        onClick={handleProceed}
      >
        Proceed to Stake
      </Button>
    </>
  );
};
