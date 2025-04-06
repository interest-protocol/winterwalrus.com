import { TYPES } from '@interest-protocol/blizzard-sdk';
import {
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useSwitchAccount,
} from '@mysten/dapp-kit';
import {
  formatAddress,
  normalizeStructTag,
  normalizeSuiAddress,
  SUI_TYPE_ARG,
} from '@mysten/sui/utils';
import { Div, Img, P, Span, Strong } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FC } from 'react';
import toast from 'react-hot-toast';

import { ChevronDownSVG, CopySVG, LogoutSVG } from '@/components/svg';
import { ExplorerMode } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { WalletProfileDropdownItemProps } from './wallet-profile-dropdown.types';

const Motion = motion.create(Div);

const WalletProfileDropdownItem: FC<WalletProfileDropdownItemProps> = ({
  account,
}) => {
  const { balances } = useAppState();
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const { mutate: switchAccount } = useSwitchAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  const copyAddress = () => {
    toast.success('Copied!');
    window.navigator.clipboard.writeText(account.address);
  };

  const isCurrentAccount =
    !!currentAccount &&
    normalizeSuiAddress(currentAccount.address) ===
      normalizeSuiAddress(account.address);

  return (
    <AnimatePresence>
      <Motion
        layout
        mx="1rem"
        gap="0.75rem"
        width="18rem"
        display="flex"
        overflow="hidden"
        borderRadius="0.5rem"
        flexDirection="column"
        border="1px solid #FFFFFF33"
        transition={{ ease: 'linear' }}
        onClick={(e) => {
          e.stopPropagation();
          !isCurrentAccount && switchAccount({ account });
        }}
      >
        <Motion
          layout
          px="1rem"
          py="0.5rem"
          gap="0.25rem"
          display="flex"
          borderRadius="0.5rem"
          flexDirection="column"
          transition={{ ease: 'linear' }}
        >
          <Div gap="1rem" py="0.5rem" display="flex" alignItems="center">
            <Img
              width="1rem"
              height="1rem"
              borderRadius="50%"
              src={currentWallet.currentWallet?.icon}
              alt={`${currentWallet.currentWallet?.name} Wallet`}
            />
            <Span
              flex="1"
              cursor="pointer"
              color={isCurrentAccount ? '#99EFE4' : '#ffffff'}
              nHover={{
                textDecoration: isCurrentAccount ? 'underline' : 'none',
              }}
            >
              {isCurrentAccount ? (
                <Link
                  target="_blank"
                  href={getExplorerUrl(account.address, ExplorerMode.Account)}
                >
                  {formatAddress(account.address)}
                </Link>
              ) : (
                formatAddress(account.address)
              )}
            </Span>
            {isCurrentAccount ? (
              <Span
                cursor="pointer"
                onClick={copyAddress}
                nHover={{ color: '#99EFE4' }}
              >
                <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            ) : (
              <Span cursor="pointer" nHover={{ color: '#99EFE4' }}>
                <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            )}
          </Div>
          <AnimatePresence>
            {isCurrentAccount && (
              <Motion
                display="flex"
                alignItems="center"
                style={{ originY: 0 }}
                justifyContent="space-between"
                exit={{ height: 0, scaleY: 0 }}
                transition={{ ease: 'linear' }}
                animate={{ height: [0, 'auto'], scaleY: [0, 1] }}
              >
                <Span>My Balance</Span>
                <P>
                  <Span
                    gap="0.25rem"
                    display="flex"
                    color="#99EFE4"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Strong fontWeight="600" fontFamily="JetBrains Mono">
                      {balances[normalizeStructTag(SUI_TYPE_ARG)]
                        ? Number(
                            FixedPointMath.toNumber(
                              balances[normalizeStructTag(SUI_TYPE_ARG)]
                            ).toFixed(2)
                          )
                        : '0'}
                    </Strong>
                    <Span>SUI</Span>
                  </Span>
                  <Span
                    gap="0.25rem"
                    display="flex"
                    color="#C484F6"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Strong fontWeight="600" fontFamily="JetBrains Mono">
                      {balances[normalizeStructTag(TYPES.WAL)]
                        ? Number(
                            FixedPointMath.toNumber(
                              balances[normalizeStructTag(TYPES.WAL)]
                            ).toFixed(2)
                          )
                        : '0'}
                    </Strong>
                    <Span>WAL</Span>
                  </Span>
                </P>
              </Motion>
            )}
          </AnimatePresence>
        </Motion>
        <AnimatePresence>
          {isCurrentAccount && (
            <Motion
              p="1rem"
              display="flex"
              color="#E53E3E"
              cursor="pointer"
              alignItems="center"
              style={{ originY: 0 }}
              justifyContent="space-between"
              exit={{ height: 0, scaleY: 0 }}
              transition={{ ease: 'linear' }}
              borderTop="1px solid #FFFFFF33"
              onClick={() => disconnectWallet()}
              animate={{ height: [0, 'auto'], scaleY: [0, 1] }}
            >
              <Span>Disconnect</Span>
              <LogoutSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
            </Motion>
          )}
        </AnimatePresence>
      </Motion>
    </AnimatePresence>
  );
};

export default WalletProfileDropdownItem;
