import useSWR from 'swr';

const useStats = () =>
  useSWR<{
    data: ReadonlyArray<{ tvl: string; total_users: string; lst: string }>;
    totalUsers: number;
    totalTvl: string;
  }>([useStats.name], async () => {
    const data = await fetch('https://api.winterwalrus.com/v1/metrics').then(
      (res) => res.json()
    );

    return data;
  });

export default useStats;
