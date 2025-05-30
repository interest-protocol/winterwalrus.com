import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { COIN_TYPES, LST_TYPES } from '@/constants';
import { useAppState } from '@/hooks/use-app-state';
import { useCoinsPrice } from '@/hooks/use-coins-price';
import useMetadata from '@/hooks/use-metadata';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import PortfolioTabHeader from '../portfolio-tab-header';
import TokensRow from './tokens-row';
import TokensRowLoading from './tokens-row/tokens-row-loading';

const TYPES = {
  LSTs: LST_TYPES,
  Coins: COIN_TYPES,
};

interface TokensTableProps {
  name: 'LSTs' | 'Coins';
}

const TokensTable: FC<TokensTableProps> = ({ name }) => {
  const types = TYPES[name];
  const { balances } = useAppState();
  const { data: metaData, isLoading: isGettingMetaData } = useMetadata(types);
  const { data: coinsPrice, isLoading: isGettingPrices } = useCoinsPrice(types);

  const tokens = types.flatMap((type) =>
    metaData?.[type] && balances[type]
      ? {
          ...metaData[type],
          balance: FixedPointMath.toNumber(
            balances[type],
            metaData[type].decimals
          ),
          price: coinsPrice?.[type] ?? 0,
          value: 0,
        }
      : []
  );

  const [, usdValue] = tokens.reduce(
    ([, usdValue], tokenValue) => {
      return [0, usdValue + (tokenValue.price ?? 0)];
    },
    [0, 0]
  );

  const loading = isGettingPrices || isGettingMetaData;

  return (
    <Div display="flex" flexDirection="column" gap="1rem">
      <PortfolioTabHeader usdValue={usdValue} loading={isGettingPrices} />

      <Div
        p="1rem"
        bg="#FFFFFF0D"
        display="flex"
        overflowX="auto"
        border="1px solid"
        borderRadius="1rem"
        alignItems="stretch"
        flexDirection="column"
        gap={['0.5rem', '1rem']}
        borderColor="#FFFFFF1A"
      >
        <Div
          px="1rem"
          display="grid"
          minWidth="30rem"
          color="#FFFFFF80"
          fontSize="0.875rem"
          gridTemplateColumns="2fr repeat(3, 1fr)"
        >
          <Div>
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              Coins
            </P>
          </Div>
          <Div display="flex" justifyContent="center">
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              Balance
            </P>
          </Div>
          <Div display="flex" justifyContent="center">
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              Price
            </P>
          </Div>
          <Div display="flex" justifyContent="center">
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              Value
            </P>
          </Div>
        </Div>
        <Div
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          minWidth="30rem"
        >
          {loading ? (
            <TokensRowLoading />
          ) : !tokens.length ? (
            <Div
              py="2rem"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <P color="#FFFFFF80" fontSize="1rem">
                No coins.
              </P>
            </Div>
          ) : (
            tokens.map((value) => <TokensRow key={unikey()} {...value} />)
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default TokensTable;
