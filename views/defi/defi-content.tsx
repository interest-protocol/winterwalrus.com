import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import unikey from 'unikey';

import { BluefinSVG, BucketSVG } from '@/components/svg';

import { DeFiItem } from './components';
import { DeFiItemProps } from './components/defi-item/defi-item.types';

const DEFI_ITEMS: ReadonlyArray<DeFiItemProps> = [
  {
    kind: 'DEX',
    assets: [TYPES.WWAL, TYPES.WAL],
    title: 'Deposit on Bluefin',
    logo: <BluefinSVG maxWidth="1rem" width="100%" />,
    link: 'https://trade.bluefin.io/deposit/0x3ff28f5a754cfce6f2756a02a58cbcaedb97f4b566c285cf1cb6e83c5219e7c9',
    metrics: [
      { name: 'Category', value: 'DEX' },
      { name: 'Algorithm', value: 'CLMM' },
      {
        name: 'APR',
        value: fetch(
          'https://swap.api.sui-prod.bluefin.io/api/v1/pools/info?pools=0x3ff28f5a754cfce6f2756a02a58cbcaedb97f4b566c285cf1cb6e83c5219e7c9',
          {
            mode: 'no-cors',
            headers: { accept: 'application/json' },
          }
        )
          .then((res) => res.json())
          .then((data) => `${data[0].day.apr.total}%`)
          .catch((error) => {
            console.log(error);
            return '--';
          }),
      },
    ],
  },
  {
    kind: 'Lending',
    assets: [TYPES.WWAL],
    title: 'Borrow on Bucket',
    logo: <BucketSVG maxWidth="1rem" width="100%" />,
    link: 'https://www.bucketprotocol.io/borrow?token=wWAL',
    metrics: [
      { name: 'Borrow Fee', value: '0.5%' },
      { name: 'Category', value: 'Lending' },
      { name: 'Interest Rate', value: '14%' },
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
