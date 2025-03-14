import { SVGAttributes } from 'react';

export type SVGProps =
  | (SVGAttributes<SVGSVGElement> & {
      maxWidth?: string;
      maxHeight: string;
    })
  | { maxWidth: string; maxHeight?: string };
