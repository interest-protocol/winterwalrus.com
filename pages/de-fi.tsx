import { NextPage } from 'next';

import { SEO } from '@/components';
import DeFi from '@/views/de-fi';

const DefiPage: NextPage = () => (
  <>
    <SEO />
    <DeFi />
  </>
);

export default DefiPage;
