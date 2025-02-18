import { Div, H2, P, Span } from '@stylin.js/elements';
import { FC } from 'react';

import useEpochData from '@/hooks/use-epoch-data';
import { msToShortDate } from '@/utils';

import Motion from '../motion';
import { DotSVG } from '../svg';

const Epoch: FC = () => {
  const { data } = useEpochData();

  const percentage = +(
    data && data.currentEpoch
      ? ((data.epochDurationMs - data.msUntilNextEpoch) * 100) /
        data.epochDurationMs
      : 0
  ).toFixed(2);

  return (
    <Div
      p="1.5rem"
      gap="1rem"
      bg="#F8F8F80A"
      display="flex"
      color="#ffffff"
      borderRadius="2rem"
      flexDirection="column"
      backdropFilter="blur(50px)"
      boxShadow="2px 4px 16px rgba(248, 248, 248, 0.06) inset"
    >
      <Div display="flex" justifyContent="space-between">
        <H2 fontSize="0.825rem">Epoch {data?.currentEpoch ?? '--'}</H2>
        <P
          p="0.5rem"
          fontSize="0.75rem"
          fontFamily="Rubik"
          borderRadius="0.5rem"
          color={percentage > 50 ? '#C484F6' : '#99EFE4'}
          border={`0.1rem solid ${percentage > 50 ? '#C484F61A' : '#99EFE41A'}`}
        >
          {percentage > 50 ? 'Minting Stake NFT' : 'Minting LST Coin'}
        </P>
      </Div>
      <Div
        gap="1rem"
        display="flex"
        alignItems="stretch"
        justifyContent="space-between"
        flexDirection={['column', 'row']}
      >
        <Div display="flex" gap="1rem" fontSize="0.75rem">
          <Div>
            <P
              gap="0.25rem"
              display="flex"
              color="#727272"
              fontWeight="500"
              fontFamily="Rubik"
            >
              <Span color="#2D68FF">
                <DotSVG maxWidth="0.5rem" maxHeight="0.5rem" width="100%" />
              </Span>
              Duration
            </P>
            <P>
              {msToShortDate(
                data && data.epochDurationMs > 0 ? data.epochDurationMs : 0
              )}
            </P>
          </Div>
          <Div>
            <P
              gap="0.25rem"
              display="flex"
              color="#727272"
              fontWeight="500"
              fontFamily="Rubik"
            >
              <Span color="#FF381C">
                <DotSVG maxWidth="0.5rem" maxHeight="0.5rem" width="100%" />
              </Span>
              Remaining
            </P>
            <P>
              {' '}
              ~
              {msToShortDate(
                data && data.msUntilNextEpoch > 0 ? data.msUntilNextEpoch : 0
              )}
            </P>
          </Div>
          <Div>
            <P
              gap="0.25rem"
              display="flex"
              color="#727272"
              fontWeight="500"
              fontFamily="Rubik"
            >
              <Span color={percentage > 50 ? '#C484F6' : '#1F8477'}>
                <DotSVG maxWidth="0.5rem" maxHeight="0.5rem" width="100%" />
              </Span>
              Voting
            </P>
            <P>{data ? (percentage > 50 ? 'After' : 'Before') : '--'}</P>
          </Div>
        </Div>
        <Div
          gap="0.25rem"
          display="flex"
          alignItems="flex-end"
          flexDirection="column"
        >
          <P fontWeight="0.875rem">{percentage}%</P>
          <Div
            bg="#fff"
            overflow="hidden"
            borderRadius="0.15rem"
            width={['100%', '100%', '10rem']}
          >
            <Motion
              height="0.3rem"
              overflow="hidden"
              borderRadius="0.15rem"
              width={`${percentage}%`}
              bg={`linear-gradient(90deg, #1F8477 0%, #1F8477 ${
                (50 / percentage) * 100
              }%, #C484F6 ${(50 / percentage) * 100}%, #C484F6 100%)`}
            />
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default Epoch;
