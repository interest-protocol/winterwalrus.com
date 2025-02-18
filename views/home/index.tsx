import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Epoch, Layout, Stake } from '@/components';

const Home: FC = () => (
  <Layout>
    <Background />
    <Div
      mx="auto"
      px="2rem"
      gap="1.5rem"
      display="flex"
      maxWidth="32rem"
      flexDirection="column"
    >
      <Epoch />
      <Stake />
    </Div>
  </Layout>
);

export default Home;
