import { FC } from 'react';

import { Background, Epoch, Layout } from '@/components';

import Content from './content';

const Home: FC = () => (
  <Layout>
    <Background />
    <Content />
    <Epoch />
  </Layout>
);

export default Home;
