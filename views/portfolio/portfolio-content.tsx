import { useCurrentAccount } from '@mysten/dapp-kit';
import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import WalletButton from '@/components/wallet-button';
import { useTabState } from '@/hooks/use-tab-manager';

import {
  Coins,
  LSTNFTs,
  LSTs,
  NativeStakedWal,
  PortfolioTabs,
} from './components';
import PortfolioTabHeader from './components/portfolio-tab-header';

const PortfolioContent: FC = () => {
  const { tab } = useTabState();
  const currentAccount = useCurrentAccount();

  return (
    <Div display="flex" flexDirection="column" gap="1rem">
      <PortfolioTabs />
      <PortfolioTabHeader />
      {/* {!currentAccount ? ( */}
      {currentAccount ? (
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
          <P color="#fff">Connect Wallet to Unlock Details</P>
          <WalletButton />
        </Div>
      ) : (
        [
          <LSTs key={unikey()} />,
          <NativeStakedWal key={unikey()} />,
          <LSTNFTs key={unikey()} />,
          <Coins key={unikey()} />,
        ][tab]
      )}
    </Div>
  );
};
export default PortfolioContent;
