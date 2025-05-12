export enum RoutesEnum {
  Stake = 'stake',
  Pools = 'pools',
  Stats = 'stats',
}

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Stats]: '/stats',
};
