import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div, H2, P } from '@stylin.js/elements';
import { toPairs } from 'ramda';
import { FC } from 'react';
import unikey from 'unikey';

import { Layout } from '@/components';

import { PoolRow } from './components';

const Pools: FC = () => (
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
      <H2 fontWeight="600" fontSize="1rem" color="#FFFFFF">
        Pools
      </H2>
      <Div
        p="1rem"
        gap="1rem"
        bg="#FFFFFF0D"
        display="grid"
        border="1px solid"
        borderRadius="1rem"
        borderColor="#FFFFFF1A"
      >
        <Div
          px="1rem"
          display="grid"
          color="#FFFFFF80"
          fontSize="0.875rem"
          gridTemplateColumns="2fr repeat(5, 1fr)"
        >
          <Div gap="0.25rem" display="flex" alignItems="center">
            <P fontFamily="JetBrains Mono">Pool</P>
          </Div>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <P fontFamily="JetBrains Mono">TVL</P>
          </Div>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <P fontFamily="JetBrains Mono">APR</P>
          </Div>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <P fontFamily="JetBrains Mono">1D Vol</P>
          </Div>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <P fontFamily="JetBrains Mono">30D Vol</P>
          </Div>
          <Div
            gap="0.25rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <P fontFamily="JetBrains Mono">1D Vol/TVL</P>
          </Div>
        </Div>
        <Div>
          {toPairs(POOLS).map(([key, pool]) => (
            <PoolRow {...pool} key={unikey()} id={key} />
          ))}
        </Div>
      </Div>
    </Div>
  </Layout>
);

export default Pools;
