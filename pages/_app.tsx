import 'react-loading-skeleton/dist/skeleton.css';

import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { SkeletonTheme } from 'react-loading-skeleton';

import { BackgroundProvider } from '@/components';
import AppStateProvider from '@/components/app-state-manager';
import ModalManager from '@/components/modal-provider';
import ToastManager from '@/components/toast-manager';
import { GlobalStyles } from '@/styles';

const Web3Provider = dynamic(import('@/components/web3-provider'), {
  ssr: false,
});

const App = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <Global styles={GlobalStyles} />
    <ToastManager />
    <SkeletonTheme baseColor="#FFFFFF0D" highlightColor="#FFFFFF1A">
      <ModalManager />
      <AppStateProvider />
      <BackgroundProvider />
      <Component {...pageProps} />
    </SkeletonTheme>
  </Web3Provider>
);

export default App;
