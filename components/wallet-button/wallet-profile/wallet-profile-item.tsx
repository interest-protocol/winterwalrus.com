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
import { Div, Img, Span } from '@stylin.js/elements';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FC } from 'react';
import unikey from 'unikey';

import { ChevronDownSVG, CopySVG, LogoutSVG } from '@/components/svg';
import { toasting } from '@/components/toast';
import { ExplorerMode } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney } from '@/utils';

import { WalletProfileItemProps } from './wallet-profile.types';

const Motion = motion.create(Div);

const WalletProfileItem: FC<WalletProfileItemProps> = ({ account }) => {
  const { balances } = useAppState();
  const currentWallet = useCurrentWallet();
  const currentAccount = useCurrentAccount();
  const getExplorerUrl = useGetExplorerUrl();
  const { mutate: switchAccount } = useSwitchAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  const copyAddress = () => {
    toasting.success({
      action: 'Copy',
      message: 'Address copied on clipboard',
    });
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
        gap="0.75rem"
        display="flex"
        overflow="hidden"
        borderRadius="0.5rem"
        flexDirection="column"
        border="1px solid #FFFFFF33"
        mx={['unset', 'unset', '1rem']}
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
          <Div
            gap="1rem"
            py="0.5rem"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Div gap="1rem" display="flex">
              <Img
                borderRadius="50%"
                width={['1.5rem', '1.5rem', '1rem']}
                height={['1.5rem', '1.5rem', '1rem']}
                src={currentWallet.currentWallet?.icon}
                alt={`${currentWallet.currentWallet?.name} Wallet`}
              />
              <Span
                flex="1"
                cursor="pointer"
                color={isCurrentAccount ? '#EE2B5B' : '#ffffff'}
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
            </Div>
            {isCurrentAccount ? (
              <Span
                cursor="pointer"
                onClick={copyAddress}
                nHover={{ color: '#EE2B5B' }}
              >
                <CopySVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            ) : (
              <Span cursor="pointer" nHover={{ color: '#EE2B5B' }}>
                <ChevronDownSVG width="100%" maxWidth="1rem" maxHeight="1rem" />
              </Span>
            )}
          </Div>
          <AnimatePresence>
            {isCurrentAccount && (
              <Motion
                gap="0.25rem"
                display="grid"
                style={{ originY: 0 }}
                exit={{ height: 0, scaleY: 0 }}
                transition={{ ease: 'linear' }}
                gridTemplateColumns="1fr 1fr 1fr"
                animate={{ height: [0, 'auto'], scaleY: [0, 1] }}
              >
                {[
                  {
                    symbol: 'SUI',
                    type: SUI_TYPE_ARG,
                  },
                  {
                    symbol: 'WAL',
                    type: TYPES.WAL,
                  },
                  {
                    symbol: 'wWAL',
                    type: TYPES.WWAL,
                  },
                ].map(({ symbol, type }) => (
                  <Span
                    py="0.5rem"
                    gap="0.25rem"
                    display="flex"
                    key={unikey()}
                    fontSize="0.825rem"
                    alignItems="center"
                    flexDirection="column"
                    borderRadius="0.325rem"
                    justifyContent="flex-end"
                    border="1px solid #FFFFFF33"
                  >
                    <Span color="#C484F6" fontFamily="JetBrains Mono">
                      {balances[normalizeStructTag(type)]
                        ? formatMoney(
                            Number(
                              FixedPointMath.toNumber(
                                balances[normalizeStructTag(type)]
                              ).toFixed(2)
                            ),
                            20,
                            true
                          )
                        : '0'}
                    </Span>
                    <Span>{symbol}</Span>
                  </Span>
                ))}
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
              onClick={() => {
                disconnectWallet();
                close();
              }}
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

export default WalletProfileItem;
