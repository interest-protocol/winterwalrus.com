import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import { Layout } from '@/components';
import Statistics from '@/views/stats/components/statistics';

const Stats: FC = () => (
  <Layout>
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      display="flex"
      borderRadius="1rem"
      flexDirection="column"
      px={['0.5rem', '2rem']}
      width={['100%', '34rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Statistics />
    </Div>
  </Layout>
);

export default Stats;
