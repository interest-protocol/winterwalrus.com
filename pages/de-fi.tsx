import { NextPage } from 'next';

import { SEO } from '@/components';
import DeFi from '@/views/defi';

const DefiPage: NextPage = () => (
  <>
    <SEO />
    <DeFi />
  </>
);

export default DefiPage;
