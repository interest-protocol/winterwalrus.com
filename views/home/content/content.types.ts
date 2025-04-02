import { Dispatch, SetStateAction } from 'react';

export interface TabsProps {
  tab: number;
  setTab: Dispatch<SetStateAction<number>>;
}
