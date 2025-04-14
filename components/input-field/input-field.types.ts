import { ReactNode } from 'react';

import { AssetMetadata } from '@/interface';

export interface InputFieldGenericProps {
  name: string;
  oppositeName?: string;
}

export interface InputFieldAssetProps extends InputFieldGenericProps {
  redirecting?: boolean;
  types: ReadonlyArray<string>;
}
export interface InputFieldModalProps extends InputFieldGenericProps {
  redirecting?: boolean;
  assetList: ReadonlyArray<AssetMetadata>;
}

export interface InputFieldProps extends InputFieldAssetProps {
  label?: string;
  disabled?: boolean;
  topContent?: ReactNode | 'balance';
}
