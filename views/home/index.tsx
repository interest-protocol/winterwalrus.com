import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Background, Epoch, Layout, Stake } from '@/components';

const Home: FC = () => (
  <>
    <Background />
    <Layout>
      <Div
        my="3rem"
        mx="auto"
        px="2rem"
        gap="1rem"
        display="flex"
        maxWidth="32rem"
        flexDirection="column"
      >
        <Epoch />
        <Stake />
      </Div>
    </Layout>
  </>
);

export default Home;
