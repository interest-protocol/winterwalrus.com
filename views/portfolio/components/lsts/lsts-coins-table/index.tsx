import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import LSTsCoinsRow from '../lsts-coins-row';

const LSTsCoinsTable: FC = () => {
  type LST = {
    objectid: string;
    coinType: string;
    [key: string]: unknown;
  };

  const lsts: Array<[string, LST]> = [
    [
      '0x1::coin::USDC',
      {
        objectid: '0x1::coin::USDC',
        coinType: '0x1::coin::USDC',
      },
    ],
    [
      '0x1::coin::ETH',
      {
        objectid: '0x1::coin::ETH',
        coinType: '0x1::coin::ETH',
      },
    ],
    // Add more LSTs as needed
  ];

  return (
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
      <Div display="flex" flexDirection="column" gap="0.5rem" minWidth="30rem">
        {lsts.length === 0 ? (
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
          lsts.map(([key, lst]) => (
            <LSTsCoinsRow {...lst} key={unikey()} id={key} />
          ))
        )}
      </Div>
    </Div>
  );
};

export default LSTsCoinsTable;
