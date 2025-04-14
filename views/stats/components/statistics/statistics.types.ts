export type StatsSortingProps = 'tvl' | 'users';

export interface StatsSorting {
  prop: StatsSortingProps;
  desc: boolean;
}
