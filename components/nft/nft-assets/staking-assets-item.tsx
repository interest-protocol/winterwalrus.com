import { TYPES } from '@interest-protocol/blizzard-sdk';
import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, Img, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { not } from 'ramda';
import { memo, useCallback, useState } from 'react';
import unikey from 'unikey';

import Motion from '@/components/motion';
import { ChevronDownSVG, ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode, NFT_IMAGE } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useNetwork } from '@/hooks/use-network';
import { useNodeName } from '@/hooks/use-node';
import { useStakingObject } from '@/hooks/use-staking-object';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { StakingAssetsItemProps } from '../nft.types';
import { useStakingAction } from './staking-assets-item.hooks';
import StakingAssetsItemLoading from './staking-assets-item-loading';

const StakingAssetsItem = memo<StakingAssetsItemProps>(({ id }) => {
  const network = useNetwork();
  const { data } = useEpochData();
  const getExplorerUrl = useGetExplorerUrl();
  const [isOpen, setIsOpen] = useState(false);
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

  const {
    type,
    state,
    display,
    objectId,
    principal,
    withdrawEpoch,
    activationEpoch,
  } = stakingObject;

  return (
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
            <Img
              alt={type}
              width="2.5rem"
              height="2.5rem"
              borderRadius="0.5rem"
              src={display ?? NFT_IMAGE[type]}
            />
            <Div>
              <Link
                target="_blank"
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
            width="5.5rem"
            color="#000000"
            onClick={onBurn}
            textAlign="center"
            borderRadius="0.5rem"
            bg={type === TYPES[network].STAKED_WAL ? '#99EFE4' : '#C484F6'}
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
            {type === TYPES[network].STAKED_WAL
              ? state === 'Staked'
                ? 'Unstake'
                : 'Withdraw'
              : loading
                ? 'Getting...'
                : 'Get SNOW'}
          </Button>
          <Motion
            cursor="pointer"
            onClick={() => setIsOpen(not)}
            initial={{ rotate: isOpen ? '180deg' : '0deg' }}
            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
          >
            <ChevronDownSVG maxWidth="0.7rem" width="100%" />
          </Motion>
        </Div>
      </Div>
      <AnimatePresence>
        {isOpen && (
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
                {FixedPointMath.toNumber(BigNumber(principal), 9, 2)} WAL
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
              <P fontFamily="JetBrains Mono">
                {withdrawEpoch ?? activationEpoch}
              </P>
              <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
                {state === 'Staked' ? 'Activation' : 'Withdraw'} Epoch
              </P>
            </Div>
          </Div>
        )}
      </AnimatePresence>
    </Div>
  );
});

StakingAssetsItem.displayName = StakingAssetsItem.name;

export default StakingAssetsItem;
