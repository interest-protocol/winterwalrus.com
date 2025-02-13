import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Epoch, Layout } from '@/components';

const Home: FC = () => (
  <Layout>
    <Background />
    <Div maxWidth="32rem" mx="auto" px="2rem">
      <Epoch />
    </Div>
  </Layout>
);

export default Home;
