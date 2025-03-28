import { TYPES } from '@interest-protocol/blizzard-sdk';
import { Button, Span } from '@stylin.js/elements';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { WalletSVG } from '@/components/svg';
import { useAppState } from '@/hooks/use-app-state';
import useEpochData from '@/hooks/use-epoch-data';
import { FixedPointMath } from '@/lib/entities/fixed-point-math';
import { ZERO_BIG_NUMBER } from '@/utils';

import { InputFieldGenericProps } from './input-field.types';

const InputFieldBalance: FC<InputFieldGenericProps> = ({ name }) => {
  const { data: epoch } = useEpochData();
  const { control, setValue } = useFormContext();
  const { balances, loadingCoins, loadingObjects } = useAppState();

  const type = useWatch({ control, name: `${name}.type` }) as string;

  const isSnowOutAfterVote =
    name === 'out' &&
    epoch &&
    epoch.msUntilNextEpoch / epoch.epochDurationMs < 0.5 &&
    type === TYPES.WWAL;

  const balance =
    balances[isSnowOutAfterVote ? TYPES.BLIZZARD_STAKE_NFT : type];

  return (
    <Button
      all="unset"
      gap="0.5rem"
      display="flex"
      cursor="pointer"
      {...(name === 'in' && {
        nHover: { color: '#99EFE4' },
        onClick: () =>
          setValue(
            `${name}.value`,
            FixedPointMath.toNumber(balance ?? ZERO_BIG_NUMBER)
          ),
      })}
    >
      <WalletSVG maxWidth="1rem" width="100%" />
      <Span fontFamily="JetBrains Mono">
        {loadingCoins || loadingObjects ? (
          <Skeleton width="2rem" />
        ) : (
          FixedPointMath.toNumber(balance ?? ZERO_BIG_NUMBER, 9, 4)
        )}
      </Span>
    </Button>
  );
};

export default InputFieldBalance;
