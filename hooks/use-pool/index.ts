import { POOLS } from '@interest-protocol/interest-stable-swap-sdk';
import { useRouter } from 'next/router';

import { SdkPool } from '@/interface';

export const usePool = () => {
  const { query } = useRouter();
  const pool = (POOLS as Record<string, SdkPool>)[String(query.pool)];

  return pool;
};
