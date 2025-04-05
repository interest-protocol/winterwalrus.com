import { Div, H2, P } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import { FC } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { EPOCH_COLLAPSE_STORAGE_KEY } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { msToDate } from '@/utils';

import Motion from '../motion';
import { ChevronDownSVG, InfoSVG } from '../svg';
import EpochLoading from './epoch-loading';

const Epoch: FC = () => {
  const { data, isLoading } = useEpochData();
  const [collapsed, setCollapsed] = useLocalStorage(
    EPOCH_COLLAPSE_STORAGE_KEY,
    false
  );

  if (isLoading) return <EpochLoading collapsed={collapsed} />;

  const toggleCollapsed = () => setCollapsed((e) => !e);

  const percentage = +(
    data && data.currentEpoch
      ? ((data.epochDurationMs - data.msUntilNextEpoch) * 100) /
        data.epochDurationMs
      : 0
  ).toFixed(2);

  return (
    <Div
      left="0"
      bottom="0"
      width="100%"
      maxWidth={['34rem', '34rem', '34rem', '34rem', '22rem']}
      position={['static', 'static', 'static', 'static', 'fixed']}
    >
      <AnimatePresence>
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
            justifyContent="space-between"
            alignItems="center"
          >
            <Div display="flex" alignItems="center" gap="0.5rem">
              <H2 fontSize="0.825rem">Epoch {data?.currentEpoch ?? '--'}</H2>
              <InfoSVG width="100%" maxWidth="0.75rem" />
            </Div>
            <Div display="flex" gap="1rem" alignItems="center" flex="1">
              <Div gap="0.5rem" display="flex" flex="1" alignItems="center">
                <Div
                  width="100%"
                  bg="#00000052"
                  overflow="hidden"
                  borderRadius="0.15rem"
                >
                  <Motion
                    height="0.3rem"
                    overflow="hidden"
                    borderRadius="0.15rem"
                    width={`${percentage}%`}
                    bg={`linear-gradient(90deg, #99EFE4 ${
                      (50 / percentage) * 100 - 1
                    }%, #C484F6 ${1 + (50 / percentage) * 100}%)`}
                  />
                </Div>
                <P fontWeight="0.875rem">{percentage}%</P>
              </Div>
              <Motion
                cursor="pointer"
                display="inline-flex"
                onClick={toggleCollapsed}
                animate={{ rotate: collapsed ? '0deg' : '180deg' }}
              >
                <ChevronDownSVG
                  width="100%"
                  maxWidth="0.75rem"
                  maxHeight="0.75rem"
                />
              </Motion>
            </Div>
          </Div>
          {!collapsed && (
            <Motion
              gap="1.5rem"
              display="flex"
              alignItems="stretch"
              flexDirection="column"
              justifyContent="space-between"
              animate={{ scaleY: collapsed ? 0 : 1 }}
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
                    {msToDate(
                      data && data.epochDurationMs > 0
                        ? data.epochDurationMs
                        : 0
                    )}
                  </P>
                  <P
                    gap="0.25rem"
                    display="flex"
                    color="#727272"
                    fontWeight="500"
                  >
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
                    ~
                    {msToDate(
                      data && data.msUntilNextEpoch > 0
                        ? data.msUntilNextEpoch
                        : 0
                    )}
                  </P>
                  <P
                    gap="0.25rem"
                    display="flex"
                    color="#727272"
                    fontWeight="500"
                  >
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
                  border={`1px solid ${
                    data
                      ? percentage > 50
                        ? '#C484F6B2'
                        : '#99EFE4B2'
                      : '#FFFFFF1A'
                  }`}
                >
                  <P
                    color={
                      data
                        ? percentage > 50
                          ? '#C484F6'
                          : '#99EFE4'
                        : undefined
                    }
                  >
                    {data ? (percentage > 50 ? 'After' : 'Before') : '--'}
                  </P>
                  <P
                    gap="0.25rem"
                    display="flex"
                    color="#727272"
                    fontWeight="500"
                  >
                    Voting
                  </P>
                </Div>
              </Div>
            </Motion>
          )}
        </Motion>
      </AnimatePresence>
    </Div>
  );
};

export default Epoch;
