import { formatAddress } from '@mysten/sui/utils';
import { Button, Div, Img, P, Span } from '@stylin.js/elements';
import Link from 'next/link';
import { FC } from 'react';
import unikey from 'unikey';

import { ChevronDownSVG, ExternalLinkSVG } from '@/components/svg';
import { NFT_IMAGE } from '@/constants';
import { useStakingObjects } from '@/hooks/use-staking-objects';

const StakingAssets: FC = () => {
  const { stakingObjects } = useStakingObjects();

  if (!stakingObjects?.length)
    return (
      <Div
        p="1rem"
        gap="1rem"
        display="flex"
        color="#ffffff"
        flexDirection="column"
        borderRadius="0.625rem"
        border="1px solid #FFFFFF1A"
      >
        <P textAlign="center" fontSize="0.875rem">
          You are not staking any WAL!
        </P>
      </Div>
    );

  return (
    <Div display="flex" gap="0.5rem" flexDirection="column">
      {stakingObjects.map(({ objectId, nodeId, state, display, type }) => (
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
          <Div
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
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
                    {formatAddress(nodeId)}
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
              >
                Unstake
              </Button>
              <Span>
                <ChevronDownSVG maxWidth="1rem" width="100%" />
              </Span>
            </Div>
          </Div>
        </Div>
      ))}
    </Div>
  );
};

export default StakingAssets;
