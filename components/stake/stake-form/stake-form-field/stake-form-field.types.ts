export interface StakeFormFieldCoinProps {
  name: string;
}

export interface StakeFormFieldProps extends StakeFormFieldCoinProps {
  label: string;
  disabled?: boolean;
}
