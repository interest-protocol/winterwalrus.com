import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { BluefinSVG, ScallopSVG } from '@/components/svg';

import { DeFiItem } from './components';
import { DeFiItemProps } from './components/defi-item/defi-item.types';

const DEFI_ITEMS: ReadonlyArray<DeFiItemProps> = [
  {
    kind: 'Lending',
    assets: [TYPES.WWAL],
    title: 'Lend on Scallop',
    logo: <ScallopSVG maxWidth="1.5rem" width="100%" />,
    link: 'https://app.scallop.io/',
    metrics: [
      {
        name: 'Supply APY',
        value: fetch('/api/third-party/scallop/supplyApy/wwal')
          .then((res) => res.json())
          .then((value) => `${+(value * 100).toFixed(2)}%`),
      },
      {
        name: 'Borrow APY',
        value: fetch('/api/third-party/scallop/borrowApy/wwal')
          .then((res) => res.json())
          .then((value) => `${+(value * 100).toFixed(2)}%`),
      },
    ],
  },
  {
    kind: 'DEX',
    assets: [TYPES.WWAL, TYPES.WAL],
    title: 'Deposit on Bluefin',
    logo: <BluefinSVG maxWidth="1.5rem" width="100%" />,
    link: 'https://trade.bluefin.io/deposit/0x3ff28f5a754cfce6f2756a02a58cbcaedb97f4b566c285cf1cb6e83c5219e7c9',
    metrics: [
      {
        name: 'APR',
        value: fetch(
          '/api/third-party/bluefin/0x3ff28f5a754cfce6f2756a02a58cbcaedb97f4b566c285cf1cb6e83c5219e7c9'
        )
          .then((res) => res.json())
          .then((data) => `${Number((+data[0].day.apr.total).toFixed(2))}%`),
      },
    ],
  },
];

const DeFiContent: FC = () => (
  <Div display="flex" gap="1rem" flexDirection="column">
    {DEFI_ITEMS.map((props) => (
      <DeFiItem key={unikey()} {...props} />
    ))}
  </Div>
);

export default DeFiContent;
