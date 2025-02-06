import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';

import { BackgroundProvider } from '@/components';
import Web3Provider from '@/components/web3-provider';
import { GlobalStyles } from '@/styles';

const App = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <Global styles={GlobalStyles} />
    <BackgroundProvider />
    <Component {...pageProps} />
  </Web3Provider>
);

export default App;
