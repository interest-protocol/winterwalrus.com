import useSWR from 'swr';

export const useCoinsPrice = (types: ReadonlyArray<string>) =>
  useSWR<Record<string, number>>([useCoinsPrice.name, types], () =>
    fetch('https://api.interestlabs.io/v1/rates', {
      method: 'POST',
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ coins: types }),
    })
      .then((res) => res.json?.())
      .then((data: ReadonlyArray<{ coin: string; price: number }>) =>
        data.reduce(
          (acc, { coin, price }) => ({
            ...acc,
            [coin]: price,
          }),
          {}
        )
      )
  );
