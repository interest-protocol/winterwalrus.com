import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { Div, H2, Input, P } from '@stylin.js/elements';
import { toPairs } from 'ramda';
import { FC, useMemo, useState } from 'react';
import unikey from 'unikey';

import { Layout } from '@/components';

import { LiquidityPools, PoolRow, PoolsPerformance } from './components';

const Pools: FC = () => {
  const [search, setSearch] = useState('');

  const filteredPools = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();
    if (!lowerSearch) return toPairs(POOLS);

    return toPairs(POOLS).filter(
      ([, pool]: [string, (typeof POOLS)[keyof typeof POOLS]]) => {
        const { lpCoinType, coinTypes } = pool;
        return (
          lpCoinType?.toLowerCase().includes(lowerSearch) ||
          coinTypes?.some((ct: string) =>
            ct.toLowerCase().includes(lowerSearch)
          )
        );
      }
    );
  }, [search]);

  return (
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
          width="100%"
          display="grid"
          alignItems="stretch"
          gap={['0.5rem', '1rem']}
          justifyContent="space-between"
          gridTemplateColumns={['1fr', '1fr', '1fr 510px']}
        >
          <LiquidityPools />
          <PoolsPerformance />
        </Div>
        <Div
          width="100%"
          display="flex"
          gap={['0.5rem', '1rem']}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={['column', 'row']}
        >
          <H2
            fontWeight="600"
            fontSize="1rem"
            color="#FFFFFF"
            alignSelf={['flex-start', 'center']}
          >
            Pools
          </H2>
          <Input
            width="100%"
            bg="#FFFFFF0D"
            height="2.5rem"
            padding="0 1rem"
            color="#FFFFFF80"
            fontSize="0.875rem"
            borderRadius="0.625rem"
            borderColor="#FFFFFF1A"
            placeholder="Search pools..."
            border="1px solid #FFFFFF1A"
            maxWidth={['100%', '17.625rem']}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Div>
        <Div
          p="1rem"
          gap={['0.5rem', '1rem']}
          bg="#FFFFFF0D"
          display="flex"
          overflowX="auto"
          border="1px solid"
          borderRadius="1rem"
          alignItems="stretch"
          flexDirection="column"
          borderColor="#FFFFFF1A"
        >
          <Div
            px="1rem"
            display="grid"
            minWidth="30rem"
            color="#FFFFFF80"
            fontSize="0.875rem"
            gridTemplateColumns="2fr repeat(4, 1fr) 43px"
          >
            <Div gap="0.25rem" display="flex" alignItems="center">
              <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
                Pool
              </P>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
                TVL
              </P>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
                APR
              </P>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
                1D Vol
              </P>
            </Div>
            <Div
              gap="0.25rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <P fontFamily="JetBrains Mono" whiteSpace="nowrap">
                30D Vol
              </P>
            </Div>
          </Div>
          <Div minWidth="30rem">
            {filteredPools.length === 0 ? (
              <Div
                py="2rem"
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <P color="#FFFFFF80" fontSize="1rem">
                  No pools found.
                </P>
              </Div>
            ) : (
              filteredPools.map(([key, pool]) => (
                <PoolRow {...pool} key={unikey()} id={key} />
              ))
            )}
          </Div>
        </Div>
      </Div>
    </Layout>
  );
};

export default Pools;
