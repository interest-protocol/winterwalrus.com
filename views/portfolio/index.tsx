import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';

import PortfolioContent from './portfolio-content';

const Portfolio: FC = () => (
  <Layout>
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      width="100%"
      display="flex"
      borderRadius="1rem"
      flexDirection="column"
      px={['0.5rem', '2rem']}
      maxWidth={['100%', '51.5rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <PortfolioContent />
    </Div>
  </Layout>
);

export default Portfolio;
