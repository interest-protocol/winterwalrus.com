import useSWR from 'swr';

const useStats = () =>
  useSWR([useStats.name], async () => {
    const [data, totalUsers] = await Promise.all(
      ['/api/v1/metrics', '/api/v1/metrics/total-users'].map((url) =>
        fetch(url).then((res) => res.json())
      )
    );
    return { ...data, totalUsers };
  });

export default useStats;
