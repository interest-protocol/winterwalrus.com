import { SyntheticEvent } from 'react';

export const fallbackOnError =
  (fallback: string) =>
  ({ currentTarget }: SyntheticEvent<HTMLImageElement>) => {
    if (!currentTarget.src.endsWith(fallback)) currentTarget.src = fallback;
  };
