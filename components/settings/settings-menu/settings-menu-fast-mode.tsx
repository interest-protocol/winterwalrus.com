import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { FAST_MODE_STORAGE_KEY } from '@/constants';

import SettingsMenuItem from './settings-menu-item';

const SettingsMenuFastMode: FC = () => {
  const [fastMode, setFastMode] = useLocalStorage<boolean>(
    FAST_MODE_STORAGE_KEY,
    true
  );

  return (
    <SettingsMenuItem
      name="Fast Mode"
      title="Fast Mode"
      withBorder={false}
      selected={fastMode}
      onSelect={() => setFastMode(!fastMode)}
    />
  );
};

export default SettingsMenuFastMode;
