import { Div, H2, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import Motion from '@/components/motion';

import { EpochLoadingProps } from './epoch.types';

const EpochLoading: FC<EpochLoadingProps> = ({ collapsed }) => (
  <Div
    left="0"
    bottom="0"
    width="100%"
    maxWidth={['34rem', '34rem', '34rem', '34rem', '22rem']}
    position={['static', 'static', 'static', 'static', 'fixed']}
  >
    <Motion
      m="1rem"
      p="1rem"
      gap="1rem"
      bg="#FFFFFF0D"
      display="flex"
      color="#ffffff"
      borderRadius="1rem"
      flexDirection="column"
      border="1px solid #FFFFFF1A"
    >
      <Div
        gap="1rem"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <H2 fontSize="0.825rem">
          Epoch <Skeleton width="0.5rem" height="0.825rem" />
        </H2>
        <Div display="flex" gap="1rem" alignItems="center" flex="1">
          <Div display="flex" alignItems="center" gap="0.5rem" flex="1">
            <Div lineHeight="0.3rem" flex="1">
              <Skeleton width="100%" height="0.3rem" borderRadius="0.15rem" />
            </Div>
            <Skeleton width="1rem" height="0.875rem" />
          </Div>
          <Skeleton width="1rem" height="0.8rem" />
        </Div>
      </Div>
      {!collapsed && (
        <Motion
          layout
          gap="1.5rem"
          display="flex"
          alignItems="stretch"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Div
            gap="0.5rem"
            display="grid"
            fontSize="0.755rem"
            gridTemplateColumns="1fr 1fr 1fr"
          >
            <Div
              p="1rem"
              gap="0.25rem"
              display="flex"
              alignItems="center"
              flexDirection="column"
              borderRadius="0.625rem"
              border="1px solid #FFFFFF1A"
            >
              <P>
                <Skeleton width="1rem" height="0.755rem" />
              </P>
              <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
                Duration
              </P>
            </Div>
            <Div
              p="1rem"
              gap="0.25rem"
              display="flex"
              alignItems="center"
              flexDirection="column"
              borderRadius="0.625rem"
              border="1px solid #FFFFFF1A"
            >
              <P>
                <Skeleton width="1rem" height="0.755rem" />
              </P>
              <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
                Remaining
              </P>
            </Div>
            <Div
              p="1rem"
              gap="0.25rem"
              display="flex"
              alignItems="center"
              flexDirection="column"
              borderRadius="0.625rem"
              border="1px solid #FFFFFF1A"
            >
              <P>
                <Skeleton width="2rem" height="0.755rem" />
              </P>
              <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
                Voting
              </P>
            </Div>
          </Div>
        </Motion>
      )}{' '}
    </Motion>
  </Div>
);

export default EpochLoading;
