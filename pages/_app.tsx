import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import { BackgroundProvider } from '@/components';
import { GlobalStyles } from '@/styles';

const Web3Provider = dynamic(import('@/components/web3-provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <Global styles={GlobalStyles} />
    <BackgroundProvider />
    <Component {...pageProps} />
  </Web3Provider>
);

export default App;
