import { NextPage } from 'next';

import { SEO } from '@/components';
import Pool from '@/views/pool';

const PoolPage: NextPage = () => (
  <>
    <SEO />
    <Pool />
  </>
);

export default PoolPage;
