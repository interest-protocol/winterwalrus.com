import { FC } from 'react';

import { Background, Layout } from '@/components';

import Content from './content';

const Home: FC = () => (
  <Layout>
    <Background />
    <Content />
  </Layout>
);

export default Home;
