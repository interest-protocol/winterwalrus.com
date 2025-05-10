import { NextPage } from 'next';

import { SEO } from '@/components';
import Stats from '@/views/stats';

const StatsPage: NextPage = () => (
  <>
    <SEO />
    <Stats />
  </>
);

export default StatsPage;
