import { Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { useAppState } from '@/hooks/use-app-state';

import LSTNFTsRow from '../lst-nftsl-row';

const LSTNFTsTable: FC = () => {
  const { principalsByType } = useAppState();

  console.log('principalsByType', principalsByType);

  type LST = {
    id: string;
    objectId: string;
    coinType: string;
    [key: string]: unknown;
  };

  const coins: Array<[string, LST]> = [
    [
      '0x1::coin::USDC',
      {
        id: '1',
        objectId: '0x1::coin::USDC',
        coinType: '0x1::coin::USDC',
      },
    ],
    [
      '0x1::coin::USDC',
      {
        id: '2',
        objectId: '0x1::coin::USDC',
        coinType: '0x1::coin::USDC',
      },
    ],
    [
      '0x1::coin::ETH',
      {
        id: '3',
        objectId: '0x1::coin::ETH',
        coinType: '0x1::coin::ETH',
      },
    ],
    [
      '0x1::coin::BTC',
      {
        id: '4',
        objectId: '0x1::coin::BTC',
        coinType: '0x1::coin::BTC',
      },
    ],
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
        gridTemplateColumns="0.5fr repeat(4, 1fr)"
      >
        <Div>
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
            LST
          </P>
        </Div>
        <Div display="flex" justifyContent="center">
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
            Total Staked
          </P>
        </Div>
        <Div display="flex" justifyContent="center">
          <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
            To Withdraw
          </P>
        </Div>
      </Div>
      <Div display="flex" flexDirection="column" gap="0.5rem" minWidth="30rem">
        {coins.length === 0 ? (
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
          coins.map(([, lst]) => <LSTNFTsRow {...lst} key={unikey()} />)
        )}
      </Div>
    </Div>
  );
};

export default LSTNFTsTable;
