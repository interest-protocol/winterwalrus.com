import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Hero, Layout } from '@/components';

// #8B4445

const Home: FC = () => (
  <Layout>
    <Div color="#629590">
      <Background />
    </Div>
    <Hero />
  </Layout>
);

export default Home;
