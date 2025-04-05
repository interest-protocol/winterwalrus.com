import useSWR from 'swr';

const useStats = () =>
  useSWR([useStats.name], () =>
    fetch('/api/v1/metrics').then((res) => res.json())
  );

export default useStats;
