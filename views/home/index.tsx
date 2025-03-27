import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Epoch, Layout, Stake, Staking } from '@/components';

const Home: FC = () => (
  <Layout>
    <Background />
    <Div
      mx="auto"
      gap="1rem"
      display="flex"
      maxWidth="34rem"
      position="relative"
      borderRadius="1rem"
      mt={['1rem', '3rem']}
      flexDirection="column"
      px={['0.5rem', '2rem']}
    >
      <Stake />
      <Staking />
    </Div>
    <Epoch />
  </Layout>
);

export default Home;
