import useSWR from 'swr';

const useLstAPR = (lst: string) =>
  useSWR([useLstAPR.name, lst], () =>
    fetch(
      `https://api.winterwalrus.com/v1/exchange-rate/${lst.split('0x')[1]}`
    ).then((res) => res.json())
  );

export default useLstAPR;
