import { DivProps } from '@stylin.js/elements';
import { ReactNode } from 'react';
import { create } from 'zustand';

type MotionProps = Omit<
  DivProps,
  'transition' | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
>;

interface UseModal {
  content: ReactNode;
  onClose?: () => void;
  allowClose?: boolean;
  handleClose: () => void;
  overlayProps?: MotionProps;
  containerProps?: MotionProps;
  setContent: (
    content: ReactNode,
    options?: {
      onClose?: () => void;
      allowClose?: boolean;
      overlayProps?: DivProps;
      containerProps?: DivProps;
    }
  ) => void;
}

const defaultValues = {
  content: null,
  allowClose: true,
  onClose: undefined,
  overlayProps: undefined,
  containerProps: undefined,
};

export const useModal = create<UseModal>((set) => ({
  ...defaultValues,
  handleClose: () => set(defaultValues),
  setContent: (content, options) => set({ content, ...options }),
}));
