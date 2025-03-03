import BigNumber from 'bignumber.js';
import { create } from 'zustand';

interface AppState {
  mutate: () => void;
  balances: Record<string, BigNumber>;
  stakingObjectIds: ReadonlyArray<string>;
  principalsByType: Record<string, BigNumber>;
  update: {
    (
      partial:
        | AppState
        | Partial<AppState>
        | ((state: AppState) => AppState | Partial<AppState>),
      replace?: false
    ): void;
    (state: AppState | ((state: AppState) => AppState), replace: true): void;
  };
}

export const useAppState = create<AppState>((set) => ({
  update: set,
  balances: {},
  mutate: () => {},
  principalsByType: {},
  stakingObjectIds: [],
}));
