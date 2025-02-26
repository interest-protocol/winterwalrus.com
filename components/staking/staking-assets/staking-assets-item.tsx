import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, H4, Img, P } from '@stylin.js/elements';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { not } from 'ramda';
import { memo, useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import unikey from 'unikey';

import Motion from '@/components/motion';
import { ChevronDownSVG, ExternalLinkSVG } from '@/components/svg';
import { NFT_IMAGE } from '@/constants';
import useEpochData from '@/hooks/use-epoch-data';
import { useNodeName } from '@/hooks/use-node';
import { useStakingObject } from '@/hooks/use-staking-object';

import { StakingAssetsItemProps } from '../staking.types';

const StakingAssetsItem = memo<StakingAssetsItemProps>(({ id }) => {
  const { data } = useEpochData();
  const [isOpen, setIsOpen] = useState(false);
  const { stakingObject } = useStakingObject(id);
  const { nodeName } = useNodeName(stakingObject?.nodeId);

  const isActivated = useCallback(
    (activationEpoch: number) =>
      !!(data?.currentEpoch && activationEpoch <= data.currentEpoch),
    [data?.currentEpoch]
  );

  if (!stakingObject) return null;

  const { type, display, objectId, activationEpoch, state } = stakingObject;

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
              <Div display="flex" gap="0.5rem" fontSize="0.875rem">
                <P fontFamily="JetBrains Mono">{formatAddress(objectId)}</P>
                <Link href="/">
                  <ExternalLinkSVG maxWidth="0.85rem" width="100%" />
                </Link>
              </Div>
              <P fontSize="0.75rem" color="#FFFFFF80">
                {nodeName}
              </P>
            </Div>
          </Div>
          <P
            alignSelf="flex-start"
            px="0.5rem"
            py="0.25rem"
            bg="#FFFFFF14"
            color="#FFFFFF"
            fontSize="0.75rem"
            borderRadius="1.7rem"
          >
            {state}
          </P>
        </Div>
        <Div display="flex" alignItems="center" gap="1rem">
          <Button
            all="unset"
            py="0.5rem"
            px="1.5rem"
            bg="#99EFE4"
            color="#000000"
            cursor="pointer"
            borderRadius="0.5rem"
            onClick={() =>
              toast.success(
                <Div>
                  <H4>Ok Marco</H4>
                  <P>Auxiliar text</P>
                </Div>
              )
            }
            disabled={!isActivated(activationEpoch)}
            opacity={isActivated(activationEpoch) ? 1 : 0.5}
          >
            Unstake
          </Button>
          <Motion
            cursor="pointer"
            onClick={() => setIsOpen(not)}
            initial={{ rotate: isOpen ? '180deg' : '0deg' }}
            animate={{ rotate: isOpen ? '180deg' : '0deg' }}
          >
            <ChevronDownSVG maxWidth="1rem" width="100%" />
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
              <P fontFamily="JetBrains Mono">1 WAL</P>
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
