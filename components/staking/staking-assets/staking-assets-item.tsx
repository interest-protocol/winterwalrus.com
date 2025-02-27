import { TYPES } from '@interest-protocol/blizzard-sdk';
import { formatAddress } from '@mysten/sui/utils';
import { A, Button, Div, Img, P } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { not } from 'ramda';
import { memo, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import unikey from 'unikey';

import Motion from '@/components/motion';
import { ChevronDownSVG, ExternalLinkSVG } from '@/components/svg';
import { ExplorerMode, NFT_IMAGE } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { useGetExplorerUrl } from '@/hooks/use-get-explorer-url';
import { useModal } from '@/hooks/use-modal';
import { useNetwork } from '@/hooks/use-network';
import { useNodeName } from '@/hooks/use-node';
import { useStakingObject } from '@/hooks/use-staking-object';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';

import { StakingAssetsItemProps } from '../staking.types';
import { useUnstake } from './staking-assets-item.hook';
import {
  StakingAssetsItemUnstakeModal,
  StakingAssetsItemWithdrawModal,
} from './staking-assets-item-modals';

const StakingAssetsItem = memo<StakingAssetsItemProps>(({ id }) => {
  const unstake = useUnstake();
  const network = useNetwork();
  const { data } = useEpochData();
  const { setContent } = useModal();
  const getExplorerUrl = useGetExplorerUrl();
  const [isOpen, setIsOpen] = useState(false);
  const { stakingObject } = useStakingObject(id);
  const { nodeName } = useNodeName(stakingObject?.nodeId);

  const isActivated = useCallback(
    (activationEpoch: number) =>
      !!(data?.currentEpoch && activationEpoch <= data.currentEpoch),
    [data?.currentEpoch]
  );

  if (!stakingObject) return null;

  const { type, display, objectId, activationEpoch, state, principal } =
    stakingObject;

  const onSuccess = (toastId: string) => () => {
    toast.dismiss(toastId);
    toast.success('Unstaked successfully');
  };

  const onFailure = (toastId: string) => (error?: string) => {
    toast.dismiss(toastId);
    toast.error(error ?? 'Error executing transaction');
  };

  const handleUnstake = async () => {
    if (!isActivated(activationEpoch)) return;

    if (type === TYPES[network].STAKED_WAL) {
      if (state === 'Staked') setContent(<StakingAssetsItemUnstakeModal />);
      else setContent(<StakingAssetsItemWithdrawModal />);
      return;
    }

    const id = toast.loading('Unstaking...');

    try {
      const { digest, time } = await unstake({
        objectId,
        onSuccess: onSuccess(id),
        onFailure: onFailure(id),
      });

      toast(
        <A
          target="_blank"
          href={getExplorerUrl(digest, ExplorerMode.Transaction)}
        >
          <P>Transaction executed in {time / 1000}s</P>
          <P fontSize="0.875rem" opacity="0.75">
            See on Explorer
          </P>
        </A>
      );
    } catch (e) {
      onFailure(id)((e as Error).message);
    }
  };

  return (
    <Div
      p="1rem"
      gap="1rem"
      display="flex"
      key={unikey()}
      color="#ffffff"
      border="1px solid"
      flexDirection="column"
      borderColor="#FFFFFF1A"
      borderRadius="0.625rem"
      transition="all 300ms linear"
      nHover={{ borderColor: '#99EFE44D' }}
    >
      <Div display="flex" alignItems="center" justifyContent="space-between">
        <Div display="flex" alignItems="center" gap="0.5rem">
          <Div display="flex" gap="0.5rem">
            <Img
              alt={type}
              width="2.5rem"
              height="2.5rem"
              borderRadius="0.5rem"
              src={display ?? NFT_IMAGE[type]}
            />
            <Div>
              <Link href={getExplorerUrl(objectId, ExplorerMode.Object)}>
                <Div
                  gap="0.5rem"
                  display="flex"
                  fontSize="0.875rem"
                  nHover={{ color: '#99EFE4' }}
                >
                  <P fontFamily="JetBrains Mono">{formatAddress(objectId)}</P>
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
            color={state === 'Staked' ? '#FFFFFF' : '#83F34E'}
            bg={state === 'Staked' ? '#FFFFFF14' : '#83F34E14'}
          >
            {state}
          </P>
        </Div>
        <Div display="flex" alignItems="center" gap="1rem">
          <Button
            all="unset"
            px="1rem"
            py="0.5rem"
            color="#000000"
            borderRadius="0.5rem"
            onClick={handleUnstake}
            disabled={!isActivated(activationEpoch)}
            opacity={isActivated(activationEpoch) ? 1 : 0.5}
            bg={type === TYPES[network].STAKED_WAL ? '#99EFE4' : '#C484F6'}
            cursor={isActivated(activationEpoch) ? 'pointer' : 'not-allowed'}
          >
            {type === TYPES[network].STAKED_WAL
              ? state === 'Staked'
                ? 'Unstake'
                : 'Withdraw'
              : 'Burn'}
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
              <P fontFamily="JetBrains Mono">{activationEpoch}</P>
              <P gap="0.25rem" display="flex" color="#727272" fontWeight="500">
                Activation Epoch
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
