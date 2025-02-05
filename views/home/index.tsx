import { H1 } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';
import { LogoSVG } from '@/components/svg';

const Home: FC = () => (
  <Layout>
    <H1>Home</H1>
    <LogoSVG maxHeight="3rem" maxWidth="3rem" width="100%" />
  </Layout>
);

export default Home;
