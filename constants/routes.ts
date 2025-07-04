export enum RoutesEnum {
  Stake = 'stake',
  Pools = 'pools',
  Stats = 'stats',
  DeFi = 'defi',
  Portfolio = 'portfolio',
}

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.DeFi]: '/defi',
  [RoutesEnum.Stats]: '/stats',
  [RoutesEnum.Portfolio]: '/portfolio',
};

export const NAV_ITEMS: ReadonlyArray<RoutesEnum> = [
  RoutesEnum.Stake,
  RoutesEnum.Pools,
  RoutesEnum.DeFi,
  RoutesEnum.Portfolio,
  RoutesEnum.Stats,
];

export const NAV_ITEMS_TITLE: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: 'Stake',
  [RoutesEnum.Pools]: 'Pools',
  [RoutesEnum.DeFi]: 'DeFi',
  [RoutesEnum.Portfolio]: 'Portfolio',
  [RoutesEnum.Stats]: 'Stats',
};
