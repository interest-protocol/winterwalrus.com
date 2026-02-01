export enum RoutesEnum {
  Stake = 'stake',
  DeFi = 'defi',
  Portfolio = 'portfolio',
}

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.DeFi]: '/defi',
  [RoutesEnum.Portfolio]: '/portfolio',
};

export const NAV_ITEMS: ReadonlyArray<RoutesEnum> = [
  RoutesEnum.Stake,
  RoutesEnum.DeFi,
  RoutesEnum.Portfolio,
];

export const NAV_ITEMS_TITLE: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: 'Stake',
  [RoutesEnum.DeFi]: 'DeFi',
  [RoutesEnum.Portfolio]: 'Portfolio',
};
