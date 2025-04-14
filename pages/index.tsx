import { NextPage } from 'next';

import { SEO } from '@/components';
import Home from '@/views/stake';

const HomePage: NextPage = () => (
  <>
    <SEO />
    <Home />
  </>
);

export default HomePage;
