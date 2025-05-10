export const getChartsData = (
  metricsOvertime: ReadonlyArray<{ x: number | string; y: number | string }>
) => ({
  labels: metricsOvertime.map((item) => item.x),
  datasets: [
    {
      fill: true,
      tension: 0.4,
      borderColor: '#99EFE4',
      data: metricsOvertime.map((item) => item.y),
      backgroundColor: 'rgba(153, 239, 228, 0.1)',
    },
  ],
});
