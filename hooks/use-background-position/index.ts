import { create } from 'zustand';

import { UseBackgroundTranslate } from './use-background-position.types';

export const useBackgroundTranslate = create<UseBackgroundTranslate>((set) => ({
  setTranslate: set,
}));
