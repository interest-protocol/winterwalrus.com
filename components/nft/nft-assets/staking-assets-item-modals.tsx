import { Button, Div, P, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { useModal } from '@/hooks/use-modal';

import { StakingAssetsItemStakeModalProps } from './nft-assets.types';

export const StakingAssetsItemWithdrawModal: FC = () => {
  const { handleClose } = useModal();

  return (
    <Div
      p="1.5rem"
      width="100%"
      gap="1.5rem"
      color="#ffffff"
      display="flex"
      maxWidth="27rem"
      lineHeight="160%"
      textAlign="center"
      fontSize="0.875rem"
      borderRadius="1rem"
      flexDirection="column"
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.10)"
    >
      <Div
        gap="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <P fontSize={['1.1rem', '1.25rem']} fontWeight="600" textAlign="left">
          Redirecting for Withdrawal
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          cursor="pointer"
          borderRadius="0.5rem"
          onClick={handleClose}
        >
          ESC
        </Span>
      </Div>
      <P>
        To complete your withdrawal securely, {"you'll"} be redirected to our
        official platform. Click the button below to proceed and access your
        funds safely.
      </P>
      <Link href="https://stake.walrus.site" target="_blank">
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
        >
          Withdraw
        </Button>
      </Link>
    </Div>
  );
};

export const StakingAssetsItemUnstakeModal: FC = () => {
  const { handleClose } = useModal();

  return (
    <Div
      p="1.5rem"
      gap="1.5rem"
      width="100%"
      color="#ffffff"
      display="flex"
      maxWidth="27rem"
      lineHeight="160%"
      textAlign="center"
      fontSize="0.875rem"
      borderRadius="1rem"
      flexDirection="column"
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.10)"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <P fontSize="1.25rem" fontWeight="600">
          Unstake in Progress
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          cursor="pointer"
          borderRadius="0.5rem"
          onClick={handleClose}
        >
          ESC
        </Span>
      </Div>
      <P>
        To complete your unstaking process, {'you’ll'} be redirected to our
        official platform. Click the button below to proceed securely and regain
        full access to your assets.
      </P>
      <Link href="https://stake.walrus.site" target="_blank">
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
        >
          Unstake
        </Button>
      </Link>
    </Div>
  );
};

export const StakingAssetsItemStakeModal: FC<
  StakingAssetsItemStakeModalProps
> = ({ onProceed }) => {
  const { handleClose } = useModal();

  const [neverShow, setNeverShow] = useState(false);
  const [, setHideModal] = useLocalStorage('hideStakeModal', false);

  const handleProceed = () => {
    if (neverShow) {
      setHideModal(true);
    }
    handleClose();
    onProceed(); // Call the actual staking function
  };
  return (
    <Div
      p="1.5rem"
      width="100%"
      gap="1.5rem"
      color="#ffffff"
      display="flex"
      maxWidth="27rem"
      lineHeight="160%"
      textAlign="center"
      fontSize="0.875rem"
      borderRadius="1rem"
      flexDirection="column"
      backdropFilter="blur(20px)"
      bg="rgba(255, 255, 255, 0.10)"
    >
      <Div display="flex" justifyContent="space-between" alignItems="center">
        <P fontSize="1.25rem" fontWeight="600">
          You Are Minting an Nft
        </P>
        <Span
          py="0.25rem"
          px="0.75rem"
          bg="#FFFFFF1A"
          display="flex"
          fontWeight="500"
          cursor="pointer"
          borderRadius="0.5rem"
          onClick={handleClose}
        >
          ESC
        </Span>
      </Div>
      <P>
        You’re minting an NFT that represents your LST. In the next epoch, you
        can burn the NFT to claim your L
      </P>
      <Div
        display="flex"
        alignItems="center"
        gap="0.5rem"
        justifyContent="center"
      >
        <input
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
    </Div>
  );
};
