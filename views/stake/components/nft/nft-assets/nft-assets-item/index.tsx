import { TYPES } from '@interest-protocol/blizzard-sdk';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, Img, P } from '@stylin.js/elements';
import Link from 'next/link';
import { memo, useCallback } from 'react';
import Countdown from 'react-countdown';
import Skeleton from 'react-loading-skeleton';
import unikey from 'unikey';

import { ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode, NFT_IMAGE } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useNodeName } from '@/hooks/use-node';
import { useStakingObject } from '@/hooks/use-staking-object';

import { StakingAssetsItemProps } from '../../nft.types';
import { useStakingAction } from '../staking-assets-item.hooks';
import StakingAssetsItemLoading from '../staking-assets-item-loading';
import NFTAssetsItemModal from './nft-assets-item-modal';

const NFTAssetsItem = memo<StakingAssetsItemProps>(({ id }) => {
  const { data } = useEpochData();
  const { setContent } = useModal();
  const getExplorerUrl = useGetExplorerUrl();
  const { stakingObject, isLoading } = useStakingObject(id);
  const { nodeName } = useNodeName(stakingObject?.nodeId);

  const isActivated = useCallback(
    (activationEpoch: number) =>
      !!(data?.currentEpoch && activationEpoch <= data.currentEpoch),
    [data?.currentEpoch]
  );

  const { onBurn, loading } = useStakingAction(stakingObject, isActivated);

  if (isLoading) return <StakingAssetsItemLoading />;

  if (!stakingObject) return null;

  const { type, state, display, objectId, withdrawEpoch, activationEpoch } =
    stakingObject;

  const activation = withdrawEpoch ?? activationEpoch;

  const activationTime = data
    ? (activation - (data.currentEpoch + 1)) * data?.epochDurationMs +
      data.msUntilNextEpoch
    : 0;

  const openModal = () =>
    setContent(
      <NFTAssetsItemModal
        nodeName={nodeName}
        isActivated={isActivated}
        activationTime={activationTime}
        {...stakingObject}
      />,
      { title: 'NFT Details' }
    );

  return (
    <Div
      gap="1rem"
      display="flex"
      key={unikey()}
      color="#ffffff"
      cursor="pointer"
      border="1px solid"
      onClick={openModal}
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
            <Div
              display="flex"
              width="2.5rem"
              height="2.5rem"
              alignItems="center"
              position="relative"
              borderRadius="0.5rem"
              justifyContent="center"
            >
              <Skeleton
                width="2.5rem"
                height="2.5rem"
                borderRadius="0.5rem"
                style={{ position: 'absolute', inset: 0 }}
              />
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
          <P
            px="0.5rem"
            py="0.25rem"
            fontSize="0.75rem"
            borderRadius="1.7rem"
            alignSelf="flex-start"
            display={['none', 'block']}
            color={state === 'Staked' ? '#FFFFFF' : '#83F34E'}
            bg={state === 'Staked' ? '#FFFFFF14' : '#83F34E14'}
          >
            {state}
          </P>
        </Div>
        <Div display="flex" alignItems="center" gap="1rem">
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
      </Div>
    </Div>
  );
});

NFTAssetsItem.displayName = NFTAssetsItem.name;

export default NFTAssetsItem;
