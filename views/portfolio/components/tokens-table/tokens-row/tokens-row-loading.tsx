import 'react-loading-skeleton/dist/skeleton.css';

import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const TokensRowLoading: FC = () => (
  <Div
    p="1rem"
    display="grid"
    color="#ffffff"
    border="1px solid"
    fontSize="0.875rem"
    alignItems="center"
    borderColor="#FFFFFF1A"
    borderRadius="0.625rem"
    nHover={{ borderColor: '#99EFE44D' }}
    gridTemplateColumns="2fr repeat(3, 1fr)"
  >
    <Div display="flex" alignItems="center" gap="0.5rem">
      <Skeleton circle width="1.5rem" height="1.5rem" />
      <Skeleton width="3rem" height="1rem" borderRadius="0.25rem" />
    </Div>
    <Skeleton width="3rem" height="1rem" borderRadius="0.25rem" />
    <Skeleton width="3rem" height="1rem" borderRadius="0.25rem" />
    <Skeleton width="3rem" height="1rem" borderRadius="0.25rem" />
  </Div>
);

export default TokensRowLoading;
