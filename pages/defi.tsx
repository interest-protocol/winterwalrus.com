import { NextPage } from 'next';

import { SEO } from '@/components';
import DeFi from '@/views/defi';

const DeFiPage: NextPage = () => (
  <>
    <SEO />
    <DeFi />
  </>
);

export default DeFiPage;
