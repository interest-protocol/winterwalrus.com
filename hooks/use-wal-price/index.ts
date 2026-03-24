import useSWR from 'swr';

export const useWalPrice = () =>
  useSWR<number>([useWalPrice.name], async () => {
    const response = await fetch('/api/cmc/walrus');
    const payload = await response.json();
    const price = payload?.price;

    if (typeof price !== 'number') throw new Error('Failed to fetch WAL price');

    return price;
  });
