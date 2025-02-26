import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

import { BackgroundProvider } from '@/components';
import { GlobalStyles } from '@/styles';

const Web3Provider = dynamic(import('@/components/web3-provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          color: '#FBFBFB',
          padding: '0.5rem',
          background: '#FFFFFF0D',
          backdropFilter: 'blur(20px)',
          border: '1px solid #FFFFFF1A',
        },
      }}
    />
    <Global styles={GlobalStyles} />
    <BackgroundProvider />
    <Component {...pageProps} />
  </Web3Provider>
);

export default App;
