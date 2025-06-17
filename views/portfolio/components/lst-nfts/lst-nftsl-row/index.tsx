import { TYPES } from '@interest-protocol/blizzard-sdk';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, Img, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import Link from 'next/link';
import { FC, useCallback } from 'react';
import Countdown from 'react-countdown';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode, NFT_IMAGE } from '@/constants';
import { useCanWithdrawEarly } from '@/hooks/use-can-withdraw-early';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useNodeName } from '@/hooks/use-node';
import { usePendingRewards } from '@/hooks/use-pending-rewards';
import { useStakingObject } from '@/hooks/use-staking-object';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import LSTNFTsCoinsRowModal from '@/views/portfolio/components/nft/nft-assets/nft-assets-item/nft-assets-item-modal';
import { useStakingAction } from '@/views/portfolio/components/nft/nft-assets/staking-assets-item.hooks';
import StakingAssetsItemLoading from '@/views/portfolio/components/nft/nft-assets/staking-assets-item-loading';

const LSTNFTsCoinsRow: FC<{ id: string }> = ({ id }) => {
  const { data } = useEpochData();
  const { setContent } = useModal();
  const getExplorerUrl = useGetExplorerUrl();
  const { stakingObject, isLoading } = useStakingObject(id);
  const { data: canWithdrawEarly } = useCanWithdrawEarly(id);
  const { data: pendingRewards, isLoading: rewardsLoading } =
    usePendingRewards(id);

  const { nodeName } = useNodeName(stakingObject?.nodeId);

  const isActivated = useCallback(
    (activationEpoch: number) =>
      !!(data?.currentEpoch && activationEpoch <= data.currentEpoch),
    [data?.currentEpoch]
  );

  const { onBurn, loading } = useStakingAction(
    stakingObject,
    isActivated,
    canWithdrawEarly
  );

  if (isLoading) return <StakingAssetsItemLoading />;

  if (!stakingObject) return null;

  const {
    type,
    state,
    display,
    objectId,
    withdrawEpoch,
    activationEpoch,
    principal,
  } = stakingObject;

  const activation = withdrawEpoch ?? activationEpoch;

  const activationTime = data
    ? (activation - (data.currentEpoch + 1)) * data?.epochDurationMs +
      data.msUntilNextEpoch
    : 0;

  const openModal = () =>
    setContent(
      <LSTNFTsCoinsRowModal
        nodeName={nodeName}
        isActivated={isActivated}
        activationTime={activationTime}
        {...stakingObject}
      />,
      { title: 'NFT Details' }
    );

  return (
    <Div
      key={unikey()}
      color="#ffffff"
      cursor="pointer"
      border="1px solid"
      onClick={openModal}
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      transition="all 300ms linear"
      nHover={{ borderColor: '#99EFE44D' }}
      p={['0.5rem', '1rem']}
      display="grid"
      alignItems="center"
      gridTemplateColumns="2fr repeat(4, 1fr)"
    >
      <Div display="flex" alignItems="center" gap="0.75rem">
        <Div
          display="flex"
          width="2.5rem"
          height="2.5rem"
          alignItems="center"
          position="relative"
          borderRadius="0.5rem"
          justifyContent="center"
        >
          <Img
            alt={type}
            width="2.5rem"
            height="2.5rem"
            position="relative"
            borderRadius="0.5rem"
            src={display ?? NFT_IMAGE[type]}
          />
        </Div>
        <Div>
          <Link
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            href={getExplorerUrl(objectId, ExplorerMode.Object)}
          >
            <Div
              gap="0.5rem"
              display="flex"
              fontSize="0.875rem"
              nHover={{ color: '#99EFE4' }}
            >
              <P fontFamily="JetBrains Mono">
                {objectId ? formatAddress(objectId) : ''}
              </P>
              <ExternalLinkSVG maxWidth="0.85rem" width="100%" />
            </Div>
          </Link>
          <P fontSize="0.75rem" color="#FFFFFF80">
            {nodeName}
          </P>
        </Div>
      </Div>
      <Div>
        <P textAlign="center" fontSize="1.125rem" fontWeight={500}>
          {principal ? FixedPointMath.toNumber(BigNumber(principal)) : '-'}
        </P>
      </Div>
      <Div>
        <P textAlign="center" fontSize="1.125rem" fontWeight={500}>
          {rewardsLoading ? (
            <Skeleton width="4rem" />
          ) : (
            FixedPointMath.toNumber(
              BigNumber(principal).plus(String(pendingRewards ?? 0))
            )
          )}
        </P>
      </Div>
      <Div
        whiteSpace="nowrap"
        background={
          state === 'Ready to Get'
            ? '#C484F614'
            : state === 'Withdrawing'
              ? '#83F34E14'
              : '#FFFFFF14'
        }
        color={
          state === 'Ready to Get'
            ? '#C484F6'
            : state === 'Withdrawing'
              ? '#83F34E'
              : '#FFFFFF'
        }
        px="0.75rem"
        py="0.25rem"
        mx="0.5rem"
        borderRadius="1rem"
        fontWeight="bold"
        textAlign="center"
      >
        <P>
          {state === 'Ready to Get'
            ? 'Ready To Withdraw'
            : state === 'Withdrawing'
              ? 'Withdrawing'
              : state === 'staked'
                ? 'Staked'
                : state}
        </P>
      </Div>
      <Div
        display="flex"
        alignItems="center"
        gap="1rem"
        justifyContent="flex-end"
      >
        <Button
          all="unset"
          py="0.5rem"
          width="7rem"
          color="#000000"
          textAlign="center"
          borderRadius="0.5rem"
          bg={type === TYPES.STAKED_WAL ? '#99EFE4' : '#C484F6'}
          disabled={loading || !isActivated(activation)}
          opacity={loading || isActivated(activation) ? 1 : 0.5}
          cursor={isActivated(activation) ? 'pointer' : 'not-allowed'}
          onClick={(e) => {
            e.stopPropagation();
            onBurn();
          }}
        >
          {isActivated(activation) ? (
            type === TYPES.STAKED_WAL ? (
              state === 'Staked' && !canWithdrawEarly ? (
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
    </Div>
  );
};

export default LSTNFTsCoinsRow;
