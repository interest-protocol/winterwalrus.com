import { ReactNode } from 'react';

import { DeFiKind } from '../../defi.types';

export interface DeFiMetric {
  name: string;
  value: string | Promise<string>;
}

export interface DeFiItemProps {
  link: string;
  title: string;
  kind: DeFiKind;
  logo: ReactNode;
  assets: ReadonlyArray<string>;
  metrics: ReadonlyArray<DeFiMetric>;
}
