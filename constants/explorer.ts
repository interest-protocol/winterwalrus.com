import { Network } from './network';

export enum Explorer {
  SuiVision = 'sui-vision',
  WalrusScan = 'walrus-scan',
  SuiScan = 'sui-scan',
  Polymedia = 'polymedia',
}

export enum ExplorerMode {
  Object,
  Account,
  Transaction,
  Coin,
}

export const EXPLORERS = [
  Explorer.SuiVision,
  Explorer.SuiScan,
  Explorer.Polymedia,
];

export const EXPLORER_DISPLAY = {
  [Explorer.SuiVision]: 'Sui Vision',
  [Explorer.SuiScan]: 'Sui Scan',
  [Explorer.Polymedia]: 'Polymedia',
};

export const EXPLORER_URL_GETTER = {
  [Explorer.SuiVision]: {
    [Network.MAINNET]: (path: string) => `https://suivision.xyz/${path}`,
    [Network.TESTNET]: (path: string) =>
      `https://testnet.suivision.xyz/${path}`,
  },
  [Explorer.SuiScan]: {
    [Network.MAINNET]: (path: string) => `https://suiscan.xyz/mainnet/${path}`,
    [Network.TESTNET]: (path: string) => `https://suiscan.xyz/testnet/${path}`,
  },
  [Explorer.WalrusScan]: {
    [Network.MAINNET]: (path: string) =>
      `https://walruscan.xyz/mainnet/${path}`,
    [Network.TESTNET]: (path: string) =>
      `https://walruscan.xyz/testnet/${path}`,
  },
  [Explorer.Polymedia]: {
    [Network.MAINNET]: (path: string) =>
      `https://explorer.polymedia.app/${path}`,
    [Network.TESTNET]: (path: string) =>
      `https://explorer.polymedia.app/${path}?network=testnet`,
  },
} as Record<Explorer, Record<Network, (path: string) => string>>;

export const EXPLORER_PATH_GETTER = {
  [Explorer.SuiVision]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `account/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `txblock/${value}`,
    [ExplorerMode.Coin]: (value: string) => `type/${value}`,
  },
  [Explorer.SuiScan]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `account/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `tx/${value}`,
    [ExplorerMode.Coin]: (value: string) => `type/${value}`,
  },
  [Explorer.WalrusScan]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `account/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `tx/${value}`,
    [ExplorerMode.Coin]: (value: string) => `type/${value}`,
  },
  [Explorer.Polymedia]: {
    [ExplorerMode.Object]: (value: string) => `object/${value}`,
    [ExplorerMode.Account]: (value: string) => `address/${value}`,
    [ExplorerMode.Transaction]: (value: string) => `txblock/${value}`,
    [ExplorerMode.Coin]: (value: string) => `address/${value}`,
  },
} as Record<Explorer, Record<ExplorerMode, (path: string) => string>>;
