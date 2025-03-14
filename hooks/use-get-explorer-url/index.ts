import { useReadLocalStorage } from 'usehooks-ts';

import {
  Explorer,
  EXPLORER_PATH_GETTER,
  EXPLORER_STORAGE_KEY,
  EXPLORER_URL_GETTER,
  ExplorerMode,
} from '@/constants';

import { useNetwork } from '../use-network';

export const useGetExplorerUrl = () => {
  const network = useNetwork();
  const explorer =
    useReadLocalStorage<Explorer>(EXPLORER_STORAGE_KEY) ?? Explorer.SuiVision;

  return (id: string, mode: ExplorerMode) =>
    EXPLORER_URL_GETTER[explorer][network](
      EXPLORER_PATH_GETTER[explorer][mode](id)
    );
};
