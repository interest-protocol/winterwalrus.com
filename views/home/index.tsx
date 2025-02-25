import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Epoch, Layout, Stake, Staking } from '@/components';

const Home: FC = () => (
  <Layout>
    <Background />
    <Div
      mx="auto"
      my="3rem"
      px="2rem"
      gap="1rem"
      display="flex"
      maxWidth="33rem"
      position="relative"
      borderRadius="1rem"
      flexDirection="column"
    >
      <Epoch />
      <Stake />
      <Staking />
    </Div>
  </Layout>
);

export default Home;
