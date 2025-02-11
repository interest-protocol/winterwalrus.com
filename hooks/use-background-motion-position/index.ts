import { create } from 'zustand';

import { UseBackgroundMotionTranslate } from './use-background-position.types';

export const useBackgroundMotionTranslate =
  create<UseBackgroundMotionTranslate>((set) => ({
    setTranslate: set,
  }));
