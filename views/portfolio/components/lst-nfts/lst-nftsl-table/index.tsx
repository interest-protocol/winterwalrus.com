import { Div, P } from '@stylin.js/elements';
import { values } from 'ramda';
import { FC, useEffect, useState } from 'react';

import { useStakingObjects } from '@/hooks/use-staking-objects';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import PortfolioTabHeader from '../../portfolio-tab-header';
import LSTNFTsRow from '../lst-nftsl-row';
import LSTNFTsCoinsRowLoading from '../lst-nftsl-row/lst-nftsl-row-loading';

const LSTNFTsTable: FC<{ StructType: string }> = ({ StructType }) => {
  const {
    stakingObjectIds: objectsIds,
    principalByType: principalsByType,
    isLoading,
  } = useStakingObjects([{ StructType }]);
  const [stakingObjectIds, update] = useState<readonly string[]>();

  const loadingObjects = isLoading;

  useEffect(() => {
    if (stakingObjectIds || !objectsIds) return;
    update(objectsIds);
  }, [objectsIds, stakingObjectIds]);

  return (
    <Div display="flex" flexDirection="column" gap="1rem">
      <PortfolioTabHeader
        walValue={FixedPointMath.toNumber(
          values(principalsByType ?? {}).reduce(
            (acc, principal) => acc.plus(principal),
            ZERO_BIG_NUMBER
          ),
          9
        )}
        loading={loadingObjects}
      />
      <Div
        p="1rem"
        bg="#FFFFFF0D"
        display="flex"
        overflowX="auto"
        border="1px solid"
        borderRadius="1rem"
        alignItems="stretch"
        flexDirection="column"
        gap={['0.5rem', '1rem']}
        borderColor="#FFFFFF1A"
      >
        <Div
          px="1rem"
          display="grid"
          minWidth="30rem"
          color="#FFFFFF80"
          fontSize="0.875rem"
          gridTemplateColumns="2fr repeat(4, 1fr)"
        >
          <Div>
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              LST
            </P>
          </Div>
          <Div display="flex" justifyContent="center">
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              Total Staked
            </P>
          </Div>
          <Div display="flex" justifyContent="center">
            <P fontFamily="JetBrains Mono" whiteSpace="nowrap" m={0}>
              To Withdraw
            </P>
          </Div>
        </Div>
        <Div
          display="flex"
          flexDirection="column"
          gap="0.5rem"
          minWidth="30rem"
        >
          {loadingObjects ? (
            <LSTNFTsCoinsRowLoading />
          ) : !stakingObjectIds?.length ? (
            <Div
              py="2rem"
              width="100%"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <P color="#FFFFFF80" fontSize="1rem">
                No coins.
              </P>
            </Div>
          ) : (
            stakingObjectIds.map((stakingObjectId) => (
              <LSTNFTsRow key={stakingObjectId} id={stakingObjectId} />
            ))
          )}
        </Div>
      </Div>
    </Div>
  );
};

export default LSTNFTsTable;
