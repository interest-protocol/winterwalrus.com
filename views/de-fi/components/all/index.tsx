import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { lendingOptions } from './all.data';
import LendingCard from './components/lending-card';

const All: FC = () => {
  return (
    <Div
      flex="1"
      mx="auto"
      gap="1rem"
      width="100%"
      display="flex"
      flexDirection="column"
      my={['1rem', '1rem', '1rem', '1rem', '3rem']}
    >
      <Div gap="1rem" width="100%" display="flex" flexDirection="column">
        {lendingOptions.map((option) => (
          <LendingCard key={unikey()} {...option} />
        ))}
      </Div>
    </Div>
  );
};

export default All;
