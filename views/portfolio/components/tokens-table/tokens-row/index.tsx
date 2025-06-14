import { Div, Img, Span } from '@stylin.js/elements';
import { FC } from 'react';

import { formatDollars, formatMoney } from '@/utils';

import { TokensRowProps } from './tokens-row.types';

const TokensRow: FC<TokensRowProps> = ({ balance, price, symbol, iconUrl }) => {
  const value = price * balance;

  return (
    <Div
      p="1rem"
      display="grid"
      color="#ffffff"
      border="1px solid"
      fontSize="0.875rem"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      nHover={{ borderColor: '#99EFE44D' }}
      gridTemplateColumns="2fr repeat(3, 1fr)"
    >
      <Div display="flex" alignItems="center" gap="0.5rem">
        <Img
          width="1.5rem"
          height="1.5rem"
          borderRadius="50%"
          src={iconUrl}
          alt={symbol}
        />
        <Span whiteSpace="nowrap">{symbol}</Span>
      </Div>
      <Span whiteSpace="nowrap" textAlign="center">
        {formatMoney(Number(balance))}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {formatDollars(Number(price ?? 0))}
      </Span>
      <Span whiteSpace="nowrap" textAlign="center">
        {formatDollars(Number(value))}
      </Span>
    </Div>
  );
};

export default TokensRow;
