import { InputElementProps } from '@stylin.js/elements';

export interface CheckedButtonProps
  extends Omit<InputElementProps, 'defaultValue'> {
  name: string;
  defaultValue: boolean;
}
