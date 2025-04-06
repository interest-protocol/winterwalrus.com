import 'react-loading-skeleton/dist/skeleton.css';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

import { BackgroundProvider } from '@/components';
import AppStateProvider from '@/components/app-state-provider';
import ModalProvider from '@/components/modal-provider';
import { GlobalStyles } from '@/styles';

const Web3Provider = dynamic(import('@/components/web3-provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <Global styles={GlobalStyles} />
    <Toaster
      position="bottom-right"
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
    <ModalProvider />
    <SkeletonTheme baseColor="#FFFFFF0D" highlightColor="#FFFFFF1A">
      <AppStateProvider />
      <BackgroundProvider />
      <Component {...pageProps} />
    </SkeletonTheme>
  </Web3Provider>
);

export default App;
