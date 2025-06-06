import { Div } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

const LSTNFTsCoinsRowLoading: FC = () => {
  return (
    <Div
      p="1rem"
      display="grid"
      border="1px solid"
      alignItems="center"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      gridTemplateColumns="0.5fr repeat(4, 1fr)"
    >
      <Div display="flex" alignItems="center" gap="0.5rem">
        <Skeleton width="1.5rem" height="1.5rem" borderRadius="50%" />
        <Skeleton width="6rem" />
      </Div>
      <Skeleton width="4rem" />
      <Skeleton width="4rem" />
      <Skeleton width="4rem" />
      <Skeleton width="4rem" height="4rem" />
    </Div>
  );
};

export default LSTNFTsCoinsRowLoading;
