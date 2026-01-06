import useSWR from 'swr';

const useLstAPR = (lst: string) =>
  useSWR([useLstAPR.name, lst], () =>
    lst
      ? fetch(`https://api.winterwalrus.com/v1/exchange-rate/${lst}`).then(
          (res) => res.json()
        )
      : Promise.resolve(null)
  );

export default useLstAPR;
