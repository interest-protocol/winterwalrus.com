import { SUI_TYPE_ARG } from '@mysten/sui/utils';
import useSWR from 'swr';

export const useSuiPrice = () =>
  useSWR<number>([useSuiPrice.name], () =>
    fetch('https://api.interestlabs.io/v1/rates', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coins: [SUI_TYPE_ARG] }),
    })
      .then((res) => res.json?.())
      .then((data) => data[0].price)
  );
