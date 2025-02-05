import { Global } from '@emotion/react';
import type { AppProps } from 'next/app';

import { GlobalStyles } from '@/styles';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={GlobalStyles} />
    <Component {...pageProps} />
  </>
);

export default App;
