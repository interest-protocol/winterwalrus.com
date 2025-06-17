export enum RoutesEnum {
  Stake = 'stake',
  Pools = 'pools',
  Stats = 'stats',
  Portfolio = 'portfolio',
}

// export const AlternateRoutes: Record<RoutesEnum, string> = {}; // @git-marcopitra to simplify the usage of the routes I decided to create this object, although it is not used yet, but in case we need to use it, we can just uncomment this line and use it.

export const Routes: Record<RoutesEnum, string> = {
  [RoutesEnum.Stake]: '/',
  [RoutesEnum.Pools]: '/pools',
  [RoutesEnum.Stats]: '/stats',
  [RoutesEnum.Portfolio]: '/portfolio',
};
