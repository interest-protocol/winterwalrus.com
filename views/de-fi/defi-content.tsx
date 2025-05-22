import { Div, H2 } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useTabState } from '@/hooks/use-tab-manager';

import All from './components/all';
import DefiTabs from './components/defi-tabs';

const DeFiContent: FC = () => {
  const { tab } = useTabState();

  return (
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      display="flex"
      borderRadius="1rem"
      flexDirection="column"
      px={['1.1rem', '2rem']}
      width={['100%', '100%', '100%', '53.5rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Div
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <H2 color="#FFFFFF" fontSize="1.25rem" fontWeight="600">
          DeFi
        </H2>
        <DefiTabs />
      </Div>
      {[<All key={unikey()} />][tab]}
    </Div>
  );
};
export default DeFiContent;
