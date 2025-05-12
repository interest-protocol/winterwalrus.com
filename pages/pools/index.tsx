import { NextPage } from 'next';

import { SEO } from '@/components';
import Pools from '@/views/pools';

const PoolsPage: NextPage = () => (
  <>
    <SEO />
    <Pools />
  </>
);

export default PoolsPage;
