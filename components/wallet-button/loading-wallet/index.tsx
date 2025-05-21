import { Button } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import { ChevronDownSVG } from '@/components/svg';

const LoadingWallet: FC = () => (
  <Button
    all="unset"
    gap="0.5rem"
    display="flex"
    bg="#EE2B5B1A"
    color="#F1F1F1"
    cursor="pointer"
    alignItems="center"
    borderRadius="0.75rem"
    py={['0.75rem', '1rem']}
    px={['0.75rem', '1.5rem']}
  >
    <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
    <Skeleton width="5rem" />
    <ChevronDownSVG maxWidth="0.65rem" maxHeight="0.65rem" width="100%" />
  </Button>
);

export default LoadingWallet;
