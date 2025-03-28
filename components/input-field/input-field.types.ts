import { ReactNode } from 'react';

import { AssetMetadata } from '@/interface';

export interface InputFieldGenericProps {
  name: string;
}

export interface InputFieldAssetProps extends InputFieldGenericProps {
  assetList: ReadonlyArray<AssetMetadata>;
}

export interface InputFieldProps extends InputFieldAssetProps {
  label?: string;
  disabled?: boolean;
  topContent?: ReactNode | 'balance';
}
