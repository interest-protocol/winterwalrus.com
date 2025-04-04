import { create } from 'zustand';

interface TabState {
  tab: number;
  setTab: (tab: number) => void;
}

export const useTabState = create<TabState>((set) => ({
  tab: 0,
  setTab: (tab: number) => set({ tab }),
}));
