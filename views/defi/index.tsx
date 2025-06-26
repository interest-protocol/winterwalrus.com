import { Div, H2 } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';

import { DeFiTabs } from './components';
import DeFiContent from './defi-content';

const DeFi: FC = () => (
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
      <Div
        gap="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <H2 fontSize="1rem" fontWeight="600" color="#ffffff">
          DeFi
        </H2>
        <DeFiTabs />
      </Div>
      <DeFiContent />
    </Div>
  </Layout>
);

export default DeFi;
