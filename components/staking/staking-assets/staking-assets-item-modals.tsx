import { Button, Div, P, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';

export const StakingAssetsItemWithdrawModal: FC = () => (
  <Div
    p="1.5rem"
    gap="1.5rem"
    width="27rem"
    color="#ffffff"
    display="flex"
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
        Redirecting for Withdrawal
      </P>
      <Span
        py="0.25rem"
        px="0.75rem"
        bg="#FFFFFF1A"
        display="flex"
        fontWeight="500"
        borderRadius="0.5rem"
      >
        ESC
      </Span>
    </Div>
    <P>
      To complete your withdrawal securely, {"you'll"} be redirected to our
      official platform. Click the button below to proceed and access your funds
      safely.
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

export const StakingAssetsItemUnstakeModal: FC = () => (
  <Div
    p="1.5rem"
    gap="1.5rem"
    width="27rem"
    color="#ffffff"
    display="flex"
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
        borderRadius="0.5rem"
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
