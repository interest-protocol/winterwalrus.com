import { NextPage } from 'next';

import { SEO } from '@/components';
import Home from '@/views/home';

const HomePage: NextPage = () => (
  <>
    <SEO />
    <Home />
  </>
);

export default HomePage;
