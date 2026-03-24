import useSWR from 'swr';

export const useSuiPrice = () =>
  useSWR<number>([useSuiPrice.name], async () => {
    const response = await fetch('/api/cmc/sui');
    const payload = await response.json();
    const price = payload?.price;

    if (typeof price !== 'number') throw new Error('Failed to fetch SUI price');

    return price;
  });
