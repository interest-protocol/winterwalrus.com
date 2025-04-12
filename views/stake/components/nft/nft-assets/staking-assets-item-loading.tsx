import { Button, Div, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

const StakingAssetsItemLoading: FC = () => (
  <Div
    gap="1rem"
    display="flex"
    key={unikey()}
    color="#ffffff"
    border="1px solid"
    flexDirection="column"
    p={['0.5rem', '1rem']}
    borderColor="#FFFFFF1A"
    borderRadius="0.625rem"
    transition="all 300ms linear"
    nHover={{ borderColor: '#99EFE44D' }}
  >
    <Div
      gap="1rem"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Div gap="0.5rem" display="flex" alignItems="center">
        <Div display="flex" gap="0.5rem">
          <Skeleton width="2.5rem" height="2.5rem" borderRadius="0.5rem" />
          <Div>
            <Skeleton width="7rem" />
            <Skeleton width="5rem" />
          </Div>
        </Div>
        <P
          px="0.5rem"
          py="0.25rem"
          fontSize="0.75rem"
          borderRadius="1.7rem"
          alignSelf="flex-start"
          display={['none', 'block']}
        >
          <Skeleton width="3rem" />
        </P>
      </Div>
      <Div display="flex" alignItems="center" gap="1rem">
        <Button
          all="unset"
          py="0.5rem"
          bg="#FFFFFF1A"
          width="5.5rem"
          color="#000000"
          textAlign="center"
          borderRadius="0.5rem"
        >
          <Skeleton width="4rem" />
        </Button>
        <Skeleton height="0.6rem" width="0.7rem" />
      </Div>
    </Div>
  </Div>
);

export default StakingAssetsItemLoading;
