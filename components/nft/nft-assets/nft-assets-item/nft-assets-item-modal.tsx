import { TYPES } from '@interest-protocol/blizzard-sdk';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, Img, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC } from 'react';
import Countdown from 'react-countdown';

import { ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode } from '@/constants';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { useStakingAction } from '../staking-assets-item.hooks';
import { NFTAssetsItemModalProps } from './nft-assets-item.types';

const NFTAssetsItemModal: FC<NFTAssetsItemModalProps> = ({
  nodeName,
  isActivated,
  activationTime,
  ...stakingObject
}) => {
  const {
    type,
    state,
    nodeId,
    symbol,
    display,
    objectId,
    principal,
    withdrawEpoch,
    activationEpoch,
  } = stakingObject;

  const getExplorerUrl = useGetExplorerUrl();

  const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

  return (
    <Div
      px="0.5rem"
      gap="1.5rem"
      display="flex"
      overflowY="auto"
      overflowX="hidden"
      flexDirection="column"
    >
      <Img
        width="100%"
        height="100%"
        src={display ?? ''}
        borderRadius="1rem"
        alt={symbol ?? 'NFT Details'}
      />
      <Div
        gap="0.5rem"
        display="grid"
        fontSize="0.75rem"
        gridTemplateColumns="1fr 1fr"
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
          <P fontFamily="JetBrains Mono">
            {FixedPointMath.toNumber(BigNumber(principal), 9)} WAL
          </P>
          <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
            Principal
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
          <P fontFamily="JetBrains Mono">{withdrawEpoch ?? activationEpoch}</P>
          <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
            {state === 'Staked' ? 'Activation' : 'Withdraw'} Epoch
          </P>
        </Div>
      </Div>
      <Div display="flex" flexDirection="column" gap="1rem">
        <Div display="flex" alignItems="center" justifyContent="space-between">
          <P color="#F8F8F880">Validator</P>
          <Link
            target="_blank"
            href={`https://walruscan.com/mainnet/operator/${nodeId}`}
          >
            <Div display="flex" gap="0.5rem">
              <P fontFamily="JetBrains Mono" fontSize="0.875rem">
                {nodeName ?? formatAddress(nodeId)}
              </P>
              <ExternalLinkSVG maxWidth="1rem" width="100%" />
            </Div>
          </Link>
        </Div>
        <Div display="flex" justifyContent="space-between" alignItems="center">
          <P color="#F8F8F880">Object ID</P>
          <Link href={getExplorerUrl(objectId, ExplorerMode.Object)}>
            <Div display="flex" gap="0.5rem">
              <P fontFamily="JetBrains Mono" fontSize="0.875rem">
                {formatAddress(objectId)}
              </P>
              <ExternalLinkSVG maxWidth="1rem" width="100%" />
            </Div>
          </Link>
        </Div>
        <Div display="flex" justifyContent="space-between" alignItems="center">
          <P color="#F8F8F880">Name</P>
          <P fontFamily="JetBrains Mono" fontSize="0.875rem">
            {symbol}
          </P>
        </Div>
      </Div>
      <Button
        all="unset"
        py="1rem"
        color="#000000"
        onClick={onBurn}
        textAlign="center"
        borderRadius="0.5rem"
        bg={type === TYPES.STAKED_WAL ? '#99EFE4' : '#C484F6'}
        disabled={loading || !isActivated(withdrawEpoch ?? activationEpoch)}
        opacity={
          loading || isActivated(withdrawEpoch ?? activationEpoch) ? 1 : 0.5
        }
        cursor={
          isActivated(withdrawEpoch ?? activationEpoch)
            ? 'pointer'
            : 'not-allowed'
        }
      >
        {isActivated(withdrawEpoch ?? activationEpoch) ? (
          type === TYPES.STAKED_WAL ? (
            state === 'Staked' ? (
              'Unstake'
            ) : (
              'Withdraw'
            )
          ) : loading ? (
            'Getting...'
          ) : (
            'Get LST'
          )
        ) : (
          <Countdown date={Date.now() + activationTime} />
        )}
      </Button>
    </Div>
  );
};

export default NFTAssetsItemModal;
