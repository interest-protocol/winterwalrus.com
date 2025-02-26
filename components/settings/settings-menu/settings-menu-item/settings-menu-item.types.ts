export interface SettingsMenuItemProps {
  name: string;
  title: string;
  selected: boolean;
  withBorder: boolean;
  tag?: string | null;
  onSelect: () => void;
}
