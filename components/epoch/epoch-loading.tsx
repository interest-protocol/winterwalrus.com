import { Div, H2, P } from '@stylin.js/elements';
import { FC } from 'react';
import Skeleton from 'react-loading-skeleton';

import Motion from '../motion';
import { InfoSVG } from '../svg';

const EpochLoading: FC = () => (
  <Motion
    p="1rem"
    gap="1rem"
    bg="#FFFFFF0D"
    display="flex"
    color="#ffffff"
    borderRadius="1rem"
    flexDirection="column"
    border="1px solid #FFFFFF1A"
  >
    <Div display="flex" justifyContent="space-between" alignItems="center">
      <H2 fontSize="0.825rem">
        Epoch <Skeleton width="0.5rem" height="0.825rem" />
      </H2>
      <Div display="flex" gap="1rem" alignItems="center">
        <P
          px="0.5rem"
          py="0.25rem"
          bg="#83F34E14"
          color="#83F34E"
          fontSize="0.75rem"
          borderRadius="1.7rem"
        >
          <Skeleton width="7rem" height="0.75rem" />
        </P>
        <Skeleton width="1rem" height="0.8rem" />
      </Div>
    </Div>
    <Motion
      layout
      gap="1.5rem"
      display="flex"
      alignItems="stretch"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Div gap="0.5rem" display="flex" flexDirection="column">
        <Div display="flex" justifyContent="space-between">
          <Div display="flex" alignItems="center" gap="0.25rem">
            <P color="#FFFFFF80">Progress</P>
            <InfoSVG width="100%" maxWidth="0.75rem" />
          </Div>
          <P fontWeight="0.875rem">
            <Skeleton width="1rem" height="0.875rem" />
          </P>
        </Div>
        <Skeleton width="100%" height="0.3rem" borderRadius="0.15rem" />
      </Div>
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
  </Motion>
);

export default EpochLoading;
