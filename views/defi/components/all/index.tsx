import { Div } from '@stylin.js/elements';
import { FC } from 'react';

import LendingCard from './components/lending-card';

const All: FC = () => {
  const lendingOptions = [
    {
      platform: 'Nemo',
      badgeColor: '#3366FF',
      asset: 'WAL-SUI',
      apr: '2.21%',
      tvl: '$66.4K',
      category: 'Lending',
      points: '0.033/WAL/day',
    },
    {
      platform: 'Bucket',
      badgeColor: '#1A1A1A',
      asset: 'WAL-SUI',
      apr: '2.21%',
      tvl: '$66.4K',
      category: 'Lending',
      points: '--',
    },
  ];
  return (
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      width="100%"
      display="flex"
      flexDirection="column"
      px={['2rem', '0rem']}
      maxWidth={['100%', '51.5rem']}
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Div width="100%" display="flex" flexDirection="column" gap="1rem">
        {lendingOptions.map((option, index) => (
          <LendingCard key={index} {...option} />
        ))}
      </Div>
    </Div>
  );
};

export default All;
