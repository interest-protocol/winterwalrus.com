import { Button, Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { TabsProps } from './tabs.types';

const Tabs: FC<TabsProps> = ({ setTab, tab, tabs }) => (
  <Div display="flex" gap="0.5rem">
    {tabs.map((text, index) => (
      <Button
        all="unset"
        py="0.5rem"
        px="0.75rem"
        key={unikey()}
        cursor="pointer"
        border="1px solid"
        borderRadius="0.75rem"
        onClick={() => setTab(index)}
        color={'white'}
        bg={tab === index ? '#EE2B5B' : 'transparent'}
        borderColor={tab === index ? 'transparent' : '#EE2B5B'}
      >
        {text}
      </Button>
    ))}
  </Div>
);

export default Tabs;
