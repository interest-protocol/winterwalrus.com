import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Div, Img, P, Span } from '@stylin.js/elements';
import BigNumber from 'bignumber.js';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { InfoSVG } from '@/components/svg';
import TooltipIcon from '@/components/svg/tipicon';
import { useModal } from '@/hooks/use-modal';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { formatMoney } from '@/utils';

import { usePreviewUnstake } from './use-preview-unstake';

const UnstakeFormButtonPreview: FC<{ onProceed: () => void }> = ({
  onProceed,
}) => {
  const { handleClose } = useModal();
  const { control } = useFormContext();

  const [coinIn, valueIn, valueOut] = useWatch({
    control,
    name: ['in.type', 'in.valueBN', 'out.valueBN'],
  });

  const { data, isLoading, error } = usePreviewUnstake({
    coinIn,
    coinInValue: BigInt(String(valueIn)),
    coinOutValue: BigInt(String(valueOut)),
  });

  const walAmount = BigNumber(
    data?.balanceChanges.find(({ coinType }) => coinType === TYPES.WAL)
      ?.amount ?? 0
  );

  const stakedWalAmount = valueOut.minus(walAmount);

  return (
    <>
      <Div
        py="1rem"
        gap="1rem"
        px="0.5rem"
        display="flex"
        justifyContent="center"
      >
        <Div
          gap="0.5rem"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Img
            width="7rem"
            height="7rem"
            alt="Staked Wal"
            borderRadius="50%"
            src="https://cdn.prod.website-files.com/66a8b39f3ac043de2548ab05/67a0d056287d0398a93668ee_logo_icon_w%20(1).svg"
          />
          <P>WAL</P>
          <P fontFamily="JetBrains Mono" fontWeight="700">
            {isLoading ? (
              <Skeleton width="4rem" />
            ) : (
              formatMoney(FixedPointMath.toNumber(walAmount))
            )}
          </P>
        </Div>
        <Span mt="2rem" fontSize="3rem">
          +
        </Span>
        <Div
          gap="0.5rem"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Img
            width="7rem"
            height="7rem"
            alt="Staked Wal"
            borderRadius="1rem"
            src="https://www.walrus.xyz/walrus-stakedwal"
          />
          <Div display="flex" alignItems="center" gap="0.25rem">
            <P>StakedWAL</P>
            <TooltipIcon
              icon={InfoSVG}
              text="StakedWal refers to natively staked $WAL, which can be unstaked through the Walrus Protocol Staking website"
            />
          </Div>
          <P fontFamily="JetBrains Mono" fontWeight="700">
            {isLoading ? (
              <Skeleton width="4rem" />
            ) : (
              formatMoney(FixedPointMath.toNumber(stakedWalAmount))
            )}
          </P>
        </Div>
      </Div>
      <Button
        all="unset"
        py="1rem"
        bg="#99EFE4"
        color="#000000"
        textAlign="center"
        borderRadius="0.5rem"
        disabled={isLoading || error}
        opacity={isLoading || error ? 0.5 : 1}
        cursor={isLoading || error ? 'not-allowed' : 'pointer'}
        onClick={() => {
          handleClose();
          if (!(isLoading || error)) onProceed();
        }}
      >
        {isLoading
          ? 'Loading...'
          : error
            ? 'Something went wrong'
            : 'Proceed Unstake'}
      </Button>
    </>
  );
};

export default UnstakeFormButtonPreview;
