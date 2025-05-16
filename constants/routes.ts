export enum RoutesEnum {
  Stake = 'stake',
  Pools = 'pools',
  Stats = 'stats',
  Portfolio = 'porfolio',
  DeFi = 'defi',
}

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Stats]: '/stats',
  [RoutesEnum.Portfolio]: '/portfolio',
  [RoutesEnum.DeFi]: '/defi',
};
