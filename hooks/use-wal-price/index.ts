import useSWR from 'swr';

export const useWalPrice = () =>
  useSWR<number>([useWalPrice.name], () =>
    fetch('https://api.interestlabs.io/v1/rates', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coins: ['0x2::sui::SUI'] }),
    })
      .then((res) => res.json?.())
      .then((data) => data[0].price)
  );
