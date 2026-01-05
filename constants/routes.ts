export enum RoutesEnum {
  Stake = 'stake',
  Stats = 'stats',
  DeFi = 'defi',
  Portfolio = 'portfolio',
}

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.DeFi]: '/defi',
  [RoutesEnum.Stats]: '/stats',
  [RoutesEnum.Portfolio]: '/portfolio',
};

export const NAV_ITEMS: ReadonlyArray<RoutesEnum> = [
  RoutesEnum.Stake,
  RoutesEnum.DeFi,
  RoutesEnum.Portfolio,
  RoutesEnum.Stats,
];

export const NAV_ITEMS_TITLE: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: 'Stake',
  [RoutesEnum.DeFi]: 'DeFi',
  [RoutesEnum.Portfolio]: 'Portfolio',
  [RoutesEnum.Stats]: 'Stats',
};
