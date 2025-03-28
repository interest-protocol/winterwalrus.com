import { TYPES } from '@interest-protocol/blizzard-sdk';
import useSWR from 'swr';

export const useWalPrice = () =>
  useSWR<number>([useWalPrice.name], () =>
    fetch('https://api.interestlabs.io/v1/rates', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coins: [TYPES.WAL] }),
    })
      .then((res) => res.json?.())
      .then((data) => data[0].price)
  );
